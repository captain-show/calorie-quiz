let stripeInstance = null;
let stripeElements = null;
let cardElement = null;
let serverPublishableKey = null;
let serverPlans = null;

// Очищаем выбор плана при загрузке stripe.js
localStorage.removeItem('selectedPlan');

// API base URL - change this when deploying to different servers
const API_BASE_URL = 'https://ydtsxivmnq.us-east-1.awsapprunner.com';

async function initStripeElements() {
    if (stripeInstance) return;
    try {
        const configRes = await fetch(`${API_BASE_URL}/api/config`);
        const config = await configRes.json();
        serverPublishableKey = config.publishableKey;
        if (!serverPublishableKey) throw new Error('Нет публичного ключа Stripe');
        
        console.log('Stripe config loaded:', {
            publishableKey: serverPublishableKey ? 'Present' : 'Missing',
            applePayEnabled: config.applePayEnabled
        });
        
        stripeInstance = Stripe(serverPublishableKey);
        stripeElements = stripeInstance.elements({
            appearance: {
                theme: 'night',
                variables: {
                    colorPrimary: '#ff77c6',
                    colorBackground: '#2a2a3e',
                    colorText: '#f0f0f0',
                    colorDanger: '#ff6b6b',
                    fontFamily: 'Crimson Text, serif',
                    spacingUnit: '12px',
                    borderRadius: '10px'
                }
            }
        });
        cardElement = stripeElements.create('card', { 
            hidePostalCode: true,
            style: {
                base: {
                    fontSize: '16px',
                    color: '#f0f0f0',
                    fontFamily: 'Crimson Text, serif',
                    '::placeholder': {
                        color: '#a0a0a0',
                    },
                },
                invalid: {
                    color: '#ff6b6b',
                },
            }
        });
        cardElement.mount('#card-element');
        
        // Initialize Apple Pay if available
        initApplePay();
    } catch (e) {
        // Показываем секцию чек-аута без Stripe, чтобы пользователь видел форму
        const errorsEl = document.getElementById('card-errors');
        if (errorsEl) errorsEl.textContent = 'Failed to load payment. Please check the server.';
    }

    cardElement.on('change', (event) => {
        const displayError = document.getElementById('card-errors');
        displayError.textContent = event.error ? event.error.message : '';
    });
}

async function loadPlansFromServer() {
    try {
        const productIds = {
            weekly: 'prod_SyP5N4rFJXv4cL',
            monthly: 'prod_SyP7WEDLWzxLUj',
            yearly: 'prod_SyP9pQnkLFXYw6'
        };
        
        const queryParams = new URLSearchParams({
            weekly: productIds.weekly,
            monthly: productIds.monthly,
            yearly: productIds.yearly
        });
        
        const res = await fetch(`${API_BASE_URL}/api/products?${queryParams}`);
        if (!res.ok) throw new Error('Ошибка загрузки планов');
        const data = await res.json();
        serverPlans = data.plans || {};
        
        console.log('Plans loaded from server:', serverPlans);
        return serverPlans;
    } catch (e) {
        // Фолбэк если сервер недоступен
        serverPlans = {
            weekly: { id: null, priceId: null, productName: 'Weekly', unitAmount: 499, recurring: { interval: 'week' } },
            monthly: { id: null, priceId: null, productName: 'Monthly', unitAmount: 999, recurring: { interval: 'month' } },
            yearly: { id: null, priceId: null, productName: 'Yearly', unitAmount: 1999, recurring: { interval: 'year' } }
        };
        return serverPlans;
    }
}

function getSelectedPlanKey() {
    return localStorage.getItem('selectedPlan') || 'weekly';
}

function selectCheckoutPlanUI() {
    const planKey = getSelectedPlanKey();
    const planInfo = serverPlans?.[planKey];
    const nameEl = document.getElementById('checkoutPlanName');
    const priceEl = document.getElementById('checkoutPlanPrice');
    
    // Get plan names from subscription page
    const planNames = {
        weekly: 'Weekly Plan',
        monthly: 'Monthly Plan', 
        yearly: 'Yearly Plan'
    };
    
    // Fallback prices if server doesn't provide them
    const fallbackPrices = {
        weekly: { price: 4.99, interval: 'week' },
        monthly: { price: 9.99, interval: 'month' },
        yearly: { price: 19.99, interval: 'year' }
    };
    
    if (planInfo && planInfo.unitAmount) {
        const price = planInfo.unitAmount / 100;
        const cadence = planInfo.recurring?.interval || '';
        const planName = planNames[planKey] || planKey;
        nameEl.textContent = `${planName} (${cadence})`;
        priceEl.textContent = `$${price.toFixed(2)}`;
    } else {
        // Use fallback prices
        const fallback = fallbackPrices[planKey] || fallbackPrices.monthly;
        const planName = planNames[planKey] || planKey;
        nameEl.textContent = `${planName} (${fallback.interval})`;
        priceEl.textContent = `$${fallback.price.toFixed(2)}`;
    }
}

async function handleSubmitPayment(e) {
    e.preventDefault();
    const submitBtn = document.getElementById('submit-payment');
    const statusEl = document.getElementById('payment-status');
    submitBtn.disabled = true;
    statusEl.textContent = 'Processing...';

    try {
        const email = document.getElementById('checkoutEmail').value.trim() || 'noemail@example.com';
        const planKey = getSelectedPlanKey();
        const plan = serverPlans?.[planKey];
        if (!plan) throw new Error('Plan is unavailable');
        
        // Если нет priceId (сервер недоступен), показываем ошибку
        if (!plan.priceId) {
            throw new Error('Payment service is temporarily unavailable. Please try again later.');
        }

        // Create a PaymentMethod from card
        if (!stripeInstance || !cardElement) throw new Error('Payment form is not initialized');
        const { paymentMethod, error: pmError } = await stripeInstance.createPaymentMethod({
            type: 'card',
            card: cardElement,
            billing_details: { email }
        });
        if (pmError) throw pmError;

        if (!plan.priceId) throw new Error('Plan unavailable. Check the server.');
        const resp = await fetch(`${API_BASE_URL}/api/create-subscription`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, priceId: plan.priceId, paymentMethodId: paymentMethod.id })
        });
        const data = await resp.json();
        if (!resp.ok) throw new Error(data?.error?.message || 'Payment error');

        if (data.clientSecret) {
            const { error: confirmError } = await stripeInstance.confirmCardPayment(data.clientSecret);
            if (confirmError) throw confirmError;
        }
        statusEl.textContent = 'Payment successful!';
        
        // Отправляем события при успешной покупке
        const selectedPlanKey = getSelectedPlanKey();
        const selectedPlan = serverPlans?.[selectedPlanKey];
        const price = selectedPlan?.unitAmount ? selectedPlan.unitAmount / 100 : 0;
        
        // Mixpanel purchase event
        if (typeof mixpanel !== 'undefined') {
            mixpanel.track('purchase', {
                plan: selectedPlanKey,
                plan_price: price,
                currency: 'USD'
            });
        }
        
        // Facebook Pixel purchase event
        if (typeof fbq !== 'undefined') {
            fbq('track', 'Purchase', {
                value: price,
                currency: 'USD',
                content_name: selectedPlanKey + ' plan',
                content_category: 'palmistry_subscription'
            });
        }
        
        // Show success screen
        setTimeout(() => {
            if (typeof showSection === 'function') {
                showSection('success-section');
                window.history.pushState({}, '', '#success');
            } else {
                document.getElementById('success-section').style.display = 'block';
            }
        }, 1500);
    } catch (err) {
        document.getElementById('card-errors').textContent = err.message || String(err);
        document.getElementById('payment-status').textContent = '';
    } finally {
        document.getElementById('submit-payment').disabled = false;
    }
}

async function openCheckoutSection() {
    await Promise.all([initStripeElements(), loadPlansFromServer()]);
    selectCheckoutPlanUI();
    if (typeof showSection === 'function') {
        showSection('checkout-section');
    } else {
        document.getElementById('checkout-section').style.display = 'block';
    }
    const form = document.getElementById('payment-form');
    if (form && !form.dataset.bound) {
        form.addEventListener('submit', handleSubmitPayment);
        form.dataset.bound = 'true';
    }
}

// Download app function
function downloadApp() {
    // Отправляем событие в Mixpanel
    if (typeof mixpanel !== 'undefined') {
        mixpanel.track('download_click', {
            app_url: 'https://orion.onelink.me/ZozM/32ygh72r'
        });
    }
    
    window.open('https://orion.onelink.me/ZozM/32ygh72r', '_blank');
}

// Apple Pay functions
function isAppleDevice() {
    return /iPad|iPhone|iPod|Macintosh|MacIntel/.test(navigator.userAgent) && !window.MSStream;
}

function isApplePayAvailable() {
    const hasApplePaySession = !!window.ApplePaySession;
    const canMakePayments = hasApplePaySession && ApplePaySession.canMakePayments();
    const isHTTPS = location.protocol === 'https:';
    const domain = location.hostname;
    
    // Check if we're on a supported domain
    const supportedDomains = ['webpall.com', 'localhost', '127.0.0.1'];
    const isSupportedDomain = supportedDomains.some(supportedDomain => domain.includes(supportedDomain));
    
    // More detailed diagnostics
    const diagnostics = {
        hasApplePaySession,
        canMakePayments,
        ApplePaySession: window.ApplePaySession,
        userAgent: navigator.userAgent,
        isHTTPS,
        domain,
        protocol: location.protocol,
        hostname: location.hostname,
        port: location.port,
        isSupportedDomain,
        isAppleDevice: isAppleDevice()
    };
    
    console.log('Apple Pay availability check:', diagnostics);
    
    // Apple Pay requires HTTPS and supported domain
    return hasApplePaySession && canMakePayments && isHTTPS && isSupportedDomain;
}

async function initApplePay() {
    const applePayButton = document.getElementById('apple-pay-button');
    
    console.log('Apple Pay initialization:');
    console.log('- User Agent:', navigator.userAgent);
    console.log('- Is Apple Device:', isAppleDevice());
    console.log('- Apple Pay Available:', isApplePayAvailable());
    console.log('- ApplePaySession exists:', !!window.ApplePaySession);
    console.log('- Current domain:', location.hostname);
    console.log('- Current protocol:', location.protocol);
    console.log('- Current port:', location.port);
    
    if (!isAppleDevice() || !isApplePayAvailable()) {
        // For testing on macOS - show button even if Apple Pay is not available
        const isMac = /Macintosh|MacIntel/.test(navigator.userAgent);
        if (isMac) {
            console.log('macOS detected - showing Apple Pay button for testing');
            if (applePayButton) {
                applePayButton.style.display = 'block';
                const applePayBtn = document.getElementById('apple-pay-btn');
                if (applePayBtn) {
                    applePayBtn.addEventListener('click', handleApplePayPayment);
                }
            }
            return;
        }
        
        // Hide Apple Pay button on non-Apple devices
        if (applePayButton) {
            applePayButton.style.display = 'none';
        }
        return;
    }
    
    // Show Apple Pay button on Apple devices
    if (applePayButton) {
        applePayButton.style.display = 'block';
        
        const applePayBtn = document.getElementById('apple-pay-btn');
        if (applePayBtn) {
            applePayBtn.addEventListener('click', handleApplePayPayment);
        }
    }
}

async function handleApplePayPayment() {
    if (!stripeInstance || !serverPlans) {
        console.error('Stripe not initialized or plans not loaded');
        return;
    }
    
    const planKey = getSelectedPlanKey();
    const plan = serverPlans[planKey];
    
    console.log('Apple Pay payment attempt:', {
        planKey: planKey,
        plan: plan,
        serverPlans: serverPlans
    });
    
    if (!plan || !plan.priceId) {
        alert('Payment service temporarily unavailable. Please try again later.');
        return;
    }
    
    try {
        const email = document.getElementById('checkoutEmail').value || 'noemail@example.com';
        
        // Create payment request
        const planNames = {
            weekly: 'Weekly Plan',
            monthly: 'Monthly Plan', 
            yearly: 'Yearly Plan'
        };
        
        const planName = planNames[planKey] || planKey;
        const price = plan.unitAmount ? plan.unitAmount : 499; // Fallback to 499 cents ($4.99)
        
        console.log('Apple Pay price calculation:', {
            planName: planName,
            unitAmount: plan.unitAmount,
            finalPrice: price
        });
        
        // Check if Apple Pay is available BEFORE creating paymentRequest
        const paymentRequest = stripeInstance.paymentRequest({
            country: 'US',
            currency: 'usd',
            total: {
                label: planName,
                amount: price,
            },
            requestPayerName: true,
            requestPayerEmail: true,
        });
        
        // Check if Apple Pay is available
        const canMakePayment = await paymentRequest.canMakePayment();
        if (!canMakePayment || !canMakePayment.applePay) {
            console.log('Apple Pay not available - canMakePayment result:', canMakePayment);
            alert('Apple Pay is not available. Please use card payment.');
            return;
        }
        
        // Handle payment method
        paymentRequest.on('paymentmethod', async (ev) => {
            try {
                // Create subscription on server
                const response = await fetch(`${API_BASE_URL}/api/create-subscription`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        priceId: plan.priceId,
                        email: email,
                        paymentMethodId: ev.paymentMethod.id,
                    }),
                });
                
                const result = await response.json();
                
                if (result.error) {
                    ev.complete('fail');
                    throw new Error(result.error);
                }
                
                // Confirm payment
                ev.complete('success');
                
                // Track analytics
                const priceInDollars = plan.unitAmount ? plan.unitAmount / 100 : 4.99;
                
                if (typeof mixpanel !== 'undefined') {
                    mixpanel.track('purchase', {
                        plan: planKey,
                        plan_price: priceInDollars,
                        currency: 'USD',
                        payment_method: 'apple_pay'
                    });
                }
                
                if (typeof fbq !== 'undefined') {
                    fbq('track', 'Purchase', {
                        value: priceInDollars,
                        currency: 'USD',
                        content_name: planKey + ' plan',
                        content_category: 'palmistry_subscription'
                    });
                }
                
                // Show success screen
                showSection('success-section');
                window.history.pushState({}, '', '#success');
                
            } catch (error) {
                console.error('Apple Pay payment failed:', error);
                ev.complete('fail');
                alert('Payment failed. Please try again.');
            }
        });
        
        // Show Apple Pay sheet
        paymentRequest.show();
        
    } catch (error) {
        console.error('Apple Pay error:', error);
        alert('Apple Pay is not available. Please use card payment.');
    }
}

// expose
window.openCheckoutSection = openCheckoutSection;
window.downloadApp = downloadApp;


