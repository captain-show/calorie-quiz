// Quiz data and state
let currentQuestion = 0;
let answers = {};
const totalQuestions = 15;
let selectedPlan = 'weekly';
let countdownTimer = null;

// Question data with anchors
const questions = [
    { id: 'question-1', anchor: 'style-preference' },
    { id: 'question-2', anchor: 'color-palette' },
    { id: 'question-3', anchor: 'room-function' },
    { id: 'question-4', anchor: 'lighting-preference' },
    { id: 'question-5', anchor: 'furniture-style' },
    { id: 'question-6', anchor: 'space-size' },
    { id: 'question-7', anchor: 'budget-range' },
    { id: 'question-8', anchor: 'lifestyle' },
    { id: 'question-9', anchor: 'storage-needs' },
    { id: 'question-10', anchor: 'decor-preference' },
    { id: 'question-11', anchor: 'technology-integration' },
    { id: 'question-12', anchor: 'privacy-level' },
    { id: 'question-13', anchor: 'maintenance-level' },
    { id: 'question-14', anchor: 'inspiration-source' },
    { id: 'question-15', anchor: 'final-preference' }
];

// Start the quiz
function startQuiz() {
    console.log('Starting AI Room Design Quiz');
    currentQuestion = 1;
    showQuestion(1);
    updateURL('style-preference');
}

// Show specific question
function showQuestion(questionNumber) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.display = 'none';
    });
    
    // Show current question
    const currentSection = document.getElementById(`question-${questionNumber}`);
    if (currentSection) {
        currentSection.style.display = 'block';
        currentSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Update progress bar
    updateProgressBar(questionNumber);
}

// Update progress bar
function updateProgressBar(questionNumber) {
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
        const progress = (questionNumber / totalQuestions) * 100;
        progressFill.style.width = `${progress}%`;
    }
}

// Select option and move to next question
function selectOption(option, questionNumber) {
    console.log(`Question ${questionNumber}: Selected ${option}`);
    
    // Store answer
    answers[questionNumber] = option;
    
    // Track question answered event in Mixpanel
    if (typeof mixpanel !== 'undefined') {
        mixpanel.track('question_answered', {
            question_number: questionNumber,
            answer: option,
            question_type: getQuestionType(questionNumber)
        });
    }
    
    // Add visual feedback
    const optionCards = document.querySelectorAll(`#question-${questionNumber} .option-card`);
    optionCards.forEach(card => {
        card.classList.remove('selected');
    });
    
    // Find and highlight selected option
    const selectedCard = event.currentTarget;
    selectedCard.classList.add('selected');
    
    // Move to next question after a short delay
    setTimeout(() => {
        if (questionNumber < totalQuestions) {
            currentQuestion = questionNumber + 1;
            showQuestion(currentQuestion);
            updateURL(questions[questionNumber].anchor);
        } else {
            // Quiz completed, show processing
            showProcessing();
        }
    }, 500);
}

// Get question type for analytics
function getQuestionType(questionNumber) {
    const questionTypes = [
        'style_preference',
        'color_palette', 
        'room_function',
        'lighting_preference',
        'furniture_style',
        'space_size',
        'budget_range',
        'lifestyle',
        'storage_needs',
        'decor_preference',
        'technology_integration',
        'privacy_level',
        'maintenance_level',
        'inspiration_source',
        'final_preference'
    ];
    return questionTypes[questionNumber - 1] || 'unknown';
}

// Show processing section
function showProcessing() {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.display = 'none';
    });
    
    // Show processing section
    const processingSection = document.getElementById('processing-section');
    if (processingSection) {
        processingSection.style.display = 'block';
        processingSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Start processing animation
    startProcessingAnimation();
}

// Start processing animation
function startProcessingAnimation() {
    const progressFill = document.getElementById('processing-progress');
    const progressText = document.getElementById('progress-text');
    const steps = document.querySelectorAll('.step');
    
    let progress = 0;
    let currentStep = 0;
    
    const interval = setInterval(() => {
        progress += 2;
        progressFill.style.width = `${progress}%`;
        progressText.textContent = `${progress}%`;
        
        // Update steps
        if (progress >= 25 && currentStep === 0) {
            steps[0].classList.add('completed');
            steps[1].classList.add('active');
            currentStep = 1;
        } else if (progress >= 50 && currentStep === 1) {
            steps[1].classList.add('completed');
            steps[2].classList.add('active');
            currentStep = 2;
        } else if (progress >= 75 && currentStep === 2) {
            steps[2].classList.add('completed');
            steps[3].classList.add('active');
            currentStep = 3;
        }
        
        if (progress >= 100) {
            clearInterval(interval);
            steps[3].classList.add('completed');
            progressText.textContent = '100%';
            
            // Show completion message after delay
            setTimeout(() => {
                showCompletionMessage();
            }, 1000);
        }
    }, 50);
}

// Show completion message
function showCompletionMessage() {
    const processingTitle = document.querySelector('.processing-title');
    const processingDescription = document.querySelector('.processing-description');
    
    processingTitle.textContent = 'Your AI Room Design is Ready!';
    processingDescription.innerHTML = `
        We've created a personalized room design based on your preferences.<br>
        <br>
        <em>Our AI is now creating your custom room design application...</em>
    `;
    
    // Show subscription section immediately
    showSubscriptionSection();
}

// Show subscription section
function showSubscriptionSection() {
    // Hide processing section
    const processingSection = document.getElementById('processing-section');
    if (processingSection) {
        processingSection.style.display = 'none';
    }
    
    // Show subscription section
    const subscriptionSection = document.getElementById('subscription-section');
    if (subscriptionSection) {
        subscriptionSection.style.display = 'block';
        subscriptionSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Start countdown timer
    startCountdownTimer();
}

// Start countdown timer
function startCountdownTimer() {
    let timeLeft = 5 * 60; // 5 minutes in seconds
    const timerElement = document.getElementById('countdown-timer');
    
    countdownTimer = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        
        timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        if (timeLeft <= 0) {
            clearInterval(countdownTimer);
            timerElement.textContent = '00:00';
        }
        
        timeLeft--;
    }, 1000);
}

// Select plan
function selectPlan(plan) {
    selectedPlan = plan;
    
    // Remove selected class from all plans
    const planOptions = document.querySelectorAll('.plan-option');
    planOptions.forEach(option => {
        option.classList.remove('selected');
    });
    
    // Add selected class to chosen plan
    const selectedOption = document.querySelector(`[data-plan="${plan}"]`);
    if (selectedOption) {
        selectedOption.classList.add('selected');
    }
    
    console.log(`Selected plan: ${plan}`);
}

// Show email modal
function showEmailModal() {
    // Track subscribe complete event in Mixpanel
    if (typeof mixpanel !== 'undefined') {
        mixpanel.track('subscribe_complete', {
            selected_plan: selectedPlan,
            plan_price: getPlanPrice(selectedPlan)
        });
    }
    
    const modal = document.getElementById('email-modal');
    if (modal) {
        modal.style.display = 'flex';
        // Focus on email input
        setTimeout(() => {
            const emailInput = document.getElementById('email-input');
            if (emailInput) {
                emailInput.focus();
            }
        }, 100);
    }
}

// Get plan price for analytics
function getPlanPrice(plan) {
    const prices = {
        'weekly': 4.99,
        'monthly': 9.99,
        'yearly': 19.99
    };
    return prices[plan] || 0;
}

// Close email modal
function closeEmailModal() {
    const modal = document.getElementById('email-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Submit email
function submitEmail() {
    const emailInput = document.getElementById('email-input');
    const email = emailInput.value.trim();
    
    if (!email) {
        alert('Please enter your email address');
        return;
    }
    
    if (!isValidEmail(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    console.log(`Email submitted: ${email} for plan: ${selectedPlan}`);
    
    // Track email submitted event in Mixpanel
    if (typeof mixpanel !== 'undefined') {
        mixpanel.track('email_submitted', {
            email: email,
            selected_plan: selectedPlan,
            plan_price: getPlanPrice(selectedPlan),
            quiz_answers: answers
        });
    }
    
    // Track purchase event in Facebook Pixel
    if (typeof fbq !== 'undefined') {
        fbq('track', 'Purchase', {
            value: getPlanPrice(selectedPlan),
            currency: 'USD',
            content_type: 'subscription',
            content_name: `${selectedPlan}_plan`
        });
    }
    
    // Here you would typically send the data to your backend
    alert(`Thank you! Your ${selectedPlan} plan will be sent to ${email}`);
    
    // Close modal
    closeEmailModal();
    
    // Clear form
    emailInput.value = '';
}

// Validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Update URL with anchor
function updateURL(anchor) {
    const url = new URL(window.location);
    url.hash = anchor;
    window.history.pushState({}, '', url);
}

// Handle browser back/forward navigation
window.addEventListener('popstate', function() {
    const hash = window.location.hash.slice(1);
    if (hash) {
        const questionIndex = questions.findIndex(q => q.anchor === hash);
        if (questionIndex !== -1) {
            currentQuestion = questionIndex + 1;
            showQuestion(currentQuestion);
        }
    } else {
        // Show welcome section
        showWelcome();
    }
});

// Show welcome section
function showWelcome() {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.display = 'none';
    });
    
    const welcomeSection = document.getElementById('welcome-section');
    if (welcomeSection) {
        welcomeSection.style.display = 'block';
    }
    
    currentQuestion = 0;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('AI Room Design Quiz loaded');
    
    // Check if there's a hash in the URL
    const hash = window.location.hash.slice(1);
    if (hash) {
        const questionIndex = questions.findIndex(q => q.anchor === hash);
        if (questionIndex !== -1) {
            currentQuestion = questionIndex + 1;
            showQuestion(currentQuestion);
        } else {
            showWelcome();
        }
    } else {
        showWelcome();
    }
    
    // Add smooth scrolling for better UX
    document.documentElement.style.scrollBehavior = 'smooth';
});

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    // Handle modal keyboard events
    const modal = document.getElementById('email-modal');
    if (modal && modal.style.display === 'flex') {
        if (e.key === 'Escape') {
            closeEmailModal();
        } else if (e.key === 'Enter') {
            submitEmail();
        }
        return;
    }
    
    if (currentQuestion > 0 && currentQuestion <= totalQuestions) {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            // Go to previous question
            if (currentQuestion > 1) {
                currentQuestion--;
                showQuestion(currentQuestion);
                updateURL(questions[currentQuestion - 1].anchor);
            }
        } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === 'Enter') {
            // Go to next question (if an option is selected)
            if (answers[currentQuestion] && currentQuestion < totalQuestions) {
                currentQuestion++;
                showQuestion(currentQuestion);
                updateURL(questions[currentQuestion - 1].anchor);
            }
        }
    }
});

// Add touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - next question
            if (answers[currentQuestion] && currentQuestion < totalQuestions) {
                currentQuestion++;
                showQuestion(currentQuestion);
                updateURL(questions[currentQuestion - 1].anchor);
            }
        } else {
            // Swipe right - previous question
            if (currentQuestion > 1) {
                currentQuestion--;
                showQuestion(currentQuestion);
                updateURL(questions[currentQuestion - 1].anchor);
            }
        }
    }
}
