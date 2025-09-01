let stripeInstance = null;
let stripeElements = null;
let cardElement = null;
let serverPublishableKey = null;
let serverPlans = null;

// API base URL - change this when deploying to different servers
const API_BASE_URL = 'https://ydtsxivmnq.us-east-1.awsapprunner.com';

async function initStripeElements() {
    if (stripeInstance) return;
    try {
        const configRes = await fetch(`${API_BASE_URL}/api/config`);
        const config = await configRes.json();
        serverPublishableKey = config.publishableKey;
        if (!serverPublishableKey) throw new Error('Нет публичного ключа Stripe');
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
        return serverPlans;
    } catch (e) {
        // Фолбэк если сервер недоступен
        serverPlans = {
            weekly: { id: null, productName: 'Weekly', unitAmount: 499, recurring: { interval: 'week' } },
            monthly: { id: null, productName: 'Monthly', unitAmount: 999, recurring: { interval: 'month' } },
            yearly: { id: null, productName: 'Yearly', unitAmount: 1999, recurring: { interval: 'year' } }
        };
        return serverPlans;
    }
}

function getSelectedPlanKey() {
    return localStorage.getItem('selectedPlan') || 'monthly';
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
        if (!plan?.priceId) throw new Error('Plan is unavailable');

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
        // Optionally redirect or show success
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

// expose
window.openCheckoutSection = openCheckoutSection;


