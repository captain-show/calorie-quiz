// Global variables
let currentStep = 1;
let totalSteps = 16;
let userAnswers = {};
let selectedPlan = null;
let countdownInterval;

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Mixpanel
    if (typeof mixpanel !== 'undefined') {
        mixpanel.init('449da7823fb746d1ffde83c500e6d2ce', {
            debug: false,
            track_pageview: true,
            persistence: 'localStorage'
        });
    }
    
    // Initialize Facebook Pixel
    if (typeof fbq !== 'undefined') {
        // Facebook Pixel is already initialized in HTML with PageView tracking
        console.log('Facebook Pixel initialized');
    }
    
    initializeApp();
});

function initializeApp() {
    // Set up unit toggle functionality
    setupUnitToggles();
    
    // Set up input validation
    setupInputValidation();
    
    // Initialize progress bar
    updateProgress();
    
    // Show first question
    showQuestion(1);
    
    // Initialize default plan selection
    selectedPlan = 'monthly';
}

// Screen navigation functions
function showScreen(screenId) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Show target screen
    document.getElementById(screenId).classList.add('active');
    
    // Scroll to top
    window.scrollTo(0, 0);
}

function nextQuestion() {
    // Track input field answers before moving to next question
    trackInputAnswers();
    
    if (currentStep < totalSteps) {
        currentStep++;
        showQuestion(currentStep);
        updateProgress();
    } else {
        showSummary();
    }
}

function showQuestion(step) {
    // Hide all questions
    document.querySelectorAll('.question, .info-section').forEach(q => {
        q.classList.remove('active');
    });
    
    // Show current question
    const currentQuestion = document.querySelector(`[data-step="${step}"]`);
    if (currentQuestion) {
        currentQuestion.classList.add('active');
    }
}

function updateProgress() {
    const progress = (currentStep / totalSteps) * 100;
    document.getElementById('progressFill').style.width = `${progress}%`;
}

// Choice selection functions
function selectChoice(questionType, value) {
    userAnswers[questionType] = value;
    
    // Update build images based on gender selection
    if (questionType === 'gender') {
        updateBuildImages(value);
    }
    
    // Track question answered event
    trackQuestionAnswered(questionType, value, currentStep);
    
    // Remove selection from all cards
    const cards = document.querySelectorAll(`[onclick*="${questionType}"]`);
    cards.forEach(card => {
        card.classList.remove('selected');
    });
    
    // Add selection to clicked card
    event.currentTarget.classList.add('selected');
    
    // Automatically go to next question after a short delay
    setTimeout(() => {
        nextQuestion();
    }, 300);
}

// Checkbox selection function
function selectCheckboxes(questionType) {
    const checkboxes = document.querySelectorAll(`input[type="checkbox"]`);
    const selectedValues = [];
    
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            selectedValues.push(checkbox.value);
        }
    });
    
    userAnswers[questionType] = selectedValues;
}

// Unit toggle functionality
function setupUnitToggles() {
    document.querySelectorAll('.unit-toggle').forEach(toggle => {
        const buttons = toggle.querySelectorAll('.unit-btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', function() {
                buttons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            });
        });
    });
}

// Input validation
function setupInputValidation() {
    // Age validation
    const ageInput = document.getElementById('age');
    if (ageInput) {
        ageInput.addEventListener('input', function() {
            const value = parseInt(this.value);
            if (value < 13 || value > 100) {
                this.style.borderColor = '#ef4444';
            } else {
                this.style.borderColor = '#2563eb';
            }
        });
    }
    
    // Height validation
    const heightInput = document.getElementById('height');
    if (heightInput) {
        heightInput.addEventListener('input', function() {
            const value = parseInt(this.value);
            if (value < 100 || value > 250) {
                this.style.borderColor = '#ef4444';
            } else {
                this.style.borderColor = '#2563eb';
            }
        });
    }
    
    // Weight validation
    const weightInput = document.getElementById('weight');
    if (weightInput) {
        weightInput.addEventListener('input', function() {
            const value = parseFloat(this.value);
            if (value < 30 || value > 300) {
                this.style.borderColor = '#ef4444';
            } else {
                this.style.borderColor = '#2563eb';
            }
        });
    }
}

// Summary generation
function showSummary() {
    generateProfileSummary();
    showScreen('summary');
}

function generateProfileSummary() {
    // Calculate BMI
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const heightUnit = document.querySelector('.unit-toggle .unit-btn.active[data-unit="cm"]') ? 'cm' : 'in';
    const weightUnit = document.querySelector('.unit-toggle .unit-btn.active[data-unit="kg"]') ? 'kg' : 'lbs';
    
    let bmi = 0;
    if (heightUnit === 'cm' && weightUnit === 'kg') {
        bmi = weight / Math.pow(height / 100, 2);
    } else if (heightUnit === 'in' && weightUnit === 'lbs') {
        bmi = (weight / Math.pow(height, 2)) * 703;
    }
    
    // Determine BMI category
    let bmiCategory = '';
    let healthRisk = '';
    if (bmi < 18.5) {
        bmiCategory = 'Underweight';
        healthRisk = 'Low';
    } else if (bmi >= 18.5 && bmi < 25) {
        bmiCategory = 'Normal';
        healthRisk = 'Low';
    } else if (bmi >= 25 && bmi < 30) {
        bmiCategory = 'Overweight';
        healthRisk = 'Moderate';
    } else {
        bmiCategory = 'Obese';
        healthRisk = 'High';
    }
    
    // Generate recommendations
    const nutritionStrategy = generateNutritionStrategy();
    const fitnessApproach = generateFitnessApproach();
    const weeklyGoals = generateWeeklyGoals();
    
    // Generate detailed risk assessment
    const riskDetails = generateRiskAssessment(bmi, bmiCategory, healthRisk);
    
    // Update UI
    document.getElementById('profileName').textContent = 'Your Health Profile';
    document.getElementById('profileAge').textContent = `Age: ${userAnswers.age || '--'}`;
    document.getElementById('bmiValue').textContent = bmi.toFixed(1);
    document.getElementById('bmiCategory').textContent = bmiCategory;
    document.getElementById('healthRisk').textContent = healthRisk;
    document.getElementById('nutritionStrategy').textContent = nutritionStrategy;
    document.getElementById('fitnessApproach').textContent = fitnessApproach;
    document.getElementById('weeklyGoals').textContent = weeklyGoals;
    
    // Update risk assessment details
    document.getElementById('riskAssessment').textContent = riskDetails.assessment;
    document.getElementById('potentialRisks').textContent = riskDetails.risks;
}

function generateNutritionStrategy() {
    const goals = userAnswers.goals;
    const diet = userAnswers.diet;
    
    if (goals === 'lose') {
        return 'Calorie deficit with balanced macronutrients';
    } else if (goals === 'gain') {
        return 'Calorie surplus with protein focus';
    } else if (goals === 'maintain') {
        return 'Maintenance calories with nutrient timing';
    } else {
        return 'Strength-focused nutrition plan';
    }
}

function generateFitnessApproach() {
    const activity = userAnswers.activity;
    const goals = userAnswers.goals;
    
    if (activity === 'sedentary') {
        return 'Gradual introduction to exercise';
    } else if (activity === 'light') {
        return 'Moderate intensity training';
    } else if (activity === 'moderate') {
        return 'Progressive overload training';
    } else {
        return 'High-intensity interval training';
    }
}

function generateWeeklyGoals() {
    const goals = userAnswers.goals;
    
    if (goals === 'lose') {
        return '0.5-1 kg weight loss, 3-4 workouts';
    } else if (goals === 'gain') {
        return '0.25-0.5 kg weight gain, 4-5 workouts';
    } else if (goals === 'maintain') {
        return 'Maintain current weight, 3-4 workouts';
    } else {
        return 'Build muscle, 4-5 strength sessions';
    }
}

function generateRiskAssessment(bmi, bmiCategory, healthRisk) {
    const mainGoal = userAnswers.mainGoal;
    const build = userAnswers.build;
    const bodyGoal = userAnswers.bodyGoal;
    const targetZones = userAnswers.targetZones;
    const muscleExperience = userAnswers.muscleExperience;
    const activity = userAnswers.activity;
    const stress = userAnswers.stress;
    const sleep = userAnswers.sleep;
    const medical = userAnswers.medical;
    
    let assessment = '';
    let risks = '';
    
    // Assessment based on BMI
    if (bmi < 18.5) {
        assessment = 'Your BMI indicates underweight status, which may affect immune function and bone health.';
        risks = 'Increased risk of osteoporosis, weakened immune system, fertility issues, and slower wound healing.';
    } else if (bmi >= 18.5 && bmi < 25) {
        assessment = 'Your BMI is in the healthy range, which is associated with lower disease risk.';
        risks = 'Minimal weight-related health risks. Focus on maintaining current healthy habits.';
    } else if (bmi >= 25 && bmi < 30) {
        assessment = 'Your BMI indicates overweight status, which increases risk for several health conditions.';
        risks = 'Elevated risk of type 2 diabetes, high blood pressure, heart disease, and sleep apnea.';
    } else {
        assessment = 'Your BMI indicates obesity, significantly increasing risk for multiple chronic diseases.';
        risks = 'High risk of cardiovascular disease, type 2 diabetes, stroke, certain cancers, and metabolic syndrome.';
    }
    
    // Add lifestyle factors
    if (activity === 'sedentary') {
        risks += ' Sedentary lifestyle increases cardiovascular risks.';
    }
    
    if (stress === 'high') {
        risks += ' High stress levels can affect weight management.';
    }
    
    if (sleep === 'less6') {
        risks += ' Poor sleep increases obesity and diabetes risk.';
    }
    
    if (medical !== 'none') {
        risks += ' Existing conditions may increase health risks.';
    }
    
    return {
        assessment: assessment,
        risks: risks
    };
}

// Plans screen
function showPlans() {
    showScreen('plans');
    startCountdown();
}

function selectPlan(planType) {
    selectedPlan = planType;
    
    // Track get plan event
    trackGetPlan(planType);
    
    // Remove selection from all plans
    document.querySelectorAll('.plan-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Add selection to chosen plan
    document.querySelector(`[data-plan="${planType}"]`).classList.add('selected');
    
    // Update button text
    document.querySelectorAll('.btn-plan').forEach(btn => {
        if (btn.parentElement.dataset.plan === planType) {
            btn.textContent = 'Selected';
            btn.classList.add('selected');
        } else {
            btn.textContent = btn.textContent.replace('Selected', 'Choose ' + btn.textContent.split(' ')[1]);
            btn.classList.remove('selected');
        }
    });
}

function startCountdown() {
    let minutes = 5;
    let seconds = 0;
    
    countdownInterval = setInterval(() => {
        if (seconds === 0) {
            if (minutes === 0) {
                clearInterval(countdownInterval);
                // Offer expired
                document.querySelector('.countdown-timer').innerHTML = `
                    <div class="timer-label">Special Offer Expired</div>
                    <div class="timer">00:00</div>
                    <div class="offer-badge">Expired</div>
                `;
                return;
            }
            minutes--;
            seconds = 59;
        } else {
            seconds--;
        }
        
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }, 1000);
}

// Email capture
function showEmailCapture() {
    if (!selectedPlan) {
        alert('Please select a plan first');
        return;
    }
    
    // Track subscribe complete event
    trackSubscribeComplete(selectedPlan);
    
    showScreen('emailCapture');
    clearInterval(countdownInterval);
}

function submitEmail(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    if (!email) {
        alert('Please enter your email address');
        return;
    }
    
    // Track email submitted event
    trackEmailSubmitted(email, selectedPlan);
    
    // Simulate form submission
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Success message
        document.getElementById('emailCapture').innerHTML = `
            <div class="success-message">
                <i class="fas fa-check-circle"></i>
                <h2>Thank You!</h2>
                <p>Your personalized fitness and nutrition plan has been sent to <strong>${email}</strong></p>
                <p>Check your inbox and spam folder. You'll also receive a free 7-day meal plan to get started immediately.</p>
            </div>
            <div class="bonus-offer">
                <h4>🎁 What's Next?</h4>
                <p>Download the Calorie Counter app to start tracking your progress and access your personalized plan on the go.</p>
                <button class="btn-primary" onclick="downloadApp()">Download App</button>
            </div>
        `;
    }, 2000);
}

function downloadApp() {
    // Simulate app download
    alert('Redirecting to app store...');
}

// Utility functions
function validateInput(input, min, max) {
    const value = parseFloat(input.value);
    return value >= min && value <= max;
}

function formatNumber(num) {
    return num.toLocaleString();
}

// Keyboard navigation
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && currentStep <= totalSteps) {
        const currentQuestion = document.querySelector(`[data-step="${currentStep}"]`);
        const continueBtn = currentQuestion.querySelector('.btn-primary');
        
        if (continueBtn && !continueBtn.disabled) {
            nextQuestion();
        }
    }
});

// Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(event) {
    touchStartX = event.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(event) {
    touchEndX = event.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0 && currentStep < totalSteps) {
            // Swipe left - next question
            nextQuestion();
        } else if (diff < 0 && currentStep > 1) {
            // Swipe right - previous question
            currentStep--;
            showQuestion(currentStep);
            updateProgress();
        }
    }
}

// Analytics tracking (placeholder)
function trackEvent(eventName, data) {
    // In a real app, this would send data to analytics service
    console.log('Event tracked:', eventName, data);
}

// Performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Lazy loading for images (if any are added later)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Update build images based on selected gender
function updateBuildImages(gender) {
    const slimImage = document.getElementById('slim-image');
    const athleticImage = document.getElementById('athletic-image');
    const largeImage = document.getElementById('large-image');
    const profileImage = document.getElementById('profile-image');
    
    if (gender === 'male') {
        // Update to male images
        if (slimImage) slimImage.src = 'img/fit-man.png';
        if (athleticImage) athleticImage.src = 'img/fit-man.png';
        if (largeImage) largeImage.src = 'img/fat-man.png';
        if (profileImage) profileImage.src = 'img/fit-man.png';
    } else {
        // Update to female images (default)
        if (slimImage) slimImage.src = 'img/fit-girl.png';
        if (athleticImage) athleticImage.src = 'img/fit-girl.png';
        if (largeImage) largeImage.src = 'img/fat-girl.png';
        if (profileImage) profileImage.src = 'img/fit-girl.png';
    }
}

// Analytics tracking functions
function trackQuestionAnswered(questionType, value, stepNumber) {
    // Mixpanel tracking
    if (typeof mixpanel !== 'undefined') {
        mixpanel.track('question_answered', {
            question_type: questionType,
            answer: value,
            step_number: stepNumber
        });
    }
    
    // Facebook Pixel tracking
    if (typeof fbq !== 'undefined') {
        fbq('track', 'question_answered', {
            question_type: questionType,
            answer: value,
            step_number: stepNumber
        });
    }
}

function trackGetPlan(planType) {
    // Mixpanel tracking
    if (typeof mixpanel !== 'undefined') {
        mixpanel.track('get_plan', {
            plan_type: planType
        });
    }
    
    // Facebook Pixel tracking
    if (typeof fbq !== 'undefined') {
        fbq('track', 'get_plan', {
            plan_type: planType
        });
    }
}

function trackSubscribeComplete(planType) {
    // Mixpanel tracking
    if (typeof mixpanel !== 'undefined') {
        mixpanel.track('subscribe_complete', {
            plan_type: planType
        });
    }
    
    // Facebook Pixel tracking
    if (typeof fbq !== 'undefined') {
        fbq('track', 'subscribe_complete', {
            plan_type: planType
        });
    }
}

function trackEmailSubmitted(email, planType) {
    // Mixpanel tracking
    if (typeof mixpanel !== 'undefined') {
        mixpanel.track('email_submitted', {
            email: email,
            plan_type: planType
        });
    }
    
    // Facebook Pixel tracking
    if (typeof fbq !== 'undefined') {
        fbq('track', 'email_submitted', {
            email: email,
            plan_type: planType
        });
        
        // Also track purchase event for Facebook Pixel
        fbq('track', 'Purchase', {
            content_type: 'subscription',
            content_name: planType,
            value: getPlanValue(planType),
            currency: 'USD'
        });
    }
}

function getPlanValue(planType) {
    const planValues = {
        'weekly': 2.99,
        'monthly': 9.99,
        'yearly': 59.99
    };
    return planValues[planType] || 0;
}

function trackInputAnswers() {
    // Track age input
    const ageInput = document.getElementById('age');
    if (ageInput && ageInput.value && !userAnswers.age) {
        userAnswers.age = ageInput.value;
        trackQuestionAnswered('age', ageInput.value, currentStep);
    }
    
    // Track height input
    const heightInput = document.getElementById('height');
    if (heightInput && heightInput.value && !userAnswers.height) {
        userAnswers.height = heightInput.value;
        trackQuestionAnswered('height', heightInput.value, currentStep);
    }
    
    // Track weight input
    const weightInput = document.getElementById('weight');
    if (weightInput && weightInput.value && !userAnswers.weight) {
        userAnswers.weight = weightInput.value;
        trackQuestionAnswered('weight', weightInput.value, currentStep);
    }
}
