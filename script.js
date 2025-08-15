class QuizApp {
    constructor() {
        this.currentQuestion = 1;
        this.totalQuestions = 15;
        this.answers = {};
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateProgress();
        this.updateNavigation();
    }

    bindEvents() {
        // Navigation buttons
        document.getElementById('prevBtn').addEventListener('click', () => this.previousQuestion());

        // Radio button changes - auto-advance to next question
        document.querySelectorAll('input[type="radio"]').forEach(radio => {
            radio.addEventListener('change', () => this.onAnswerChange());
        });
    }

    onAnswerChange() {
        // Auto-advance to next question after a short delay
        const currentQuestionEl = document.querySelector(`[data-question="${this.currentQuestion}"]`);
        const hasAnswer = currentQuestionEl.querySelector('input[type="radio"]:checked');
        
        if (hasAnswer) {
            // Track question answered
            this.trackQuestionAnswered(this.currentQuestion);
            
            // Add a small delay for better UX
            setTimeout(() => {
                // Check if we're still on the same question (user hasn't navigated away)
                if (this.currentQuestion < this.totalQuestions && 
                    document.querySelector(`[data-question="${this.currentQuestion}"]`).classList.contains('active')) {
                    this.nextQuestion();
                } else if (this.currentQuestion === this.totalQuestions && 
                           document.querySelector(`[data-question="${this.currentQuestion}"]`).classList.contains('active')) {
                    // Show download section immediately on last question
                    this.showDownloadSection();
                }
            }, 300);
        }
    }

    showQuestion(questionNumber, direction = 'right') {
        // Hide all questions
        document.querySelectorAll('.question').forEach(q => {
            q.classList.remove('active', 'slide-left', 'slide-right');
        });

        // Show target question with animation
        const targetQuestion = document.querySelector(`[data-question="${questionNumber}"]`);
        targetQuestion.classList.add('active', `slide-${direction}`);

        // Update current question
        this.currentQuestion = questionNumber;
        
        // Update progress
        this.updateProgress();
        
        // Update navigation
        this.updateNavigation();
    }

    nextQuestion() {
        if (this.currentQuestion < this.totalQuestions) {
            this.showQuestion(this.currentQuestion + 1, 'right');
        }
    }

    previousQuestion() {
        if (this.currentQuestion > 1) {
            this.showQuestion(this.currentQuestion - 1, 'left');
        }
    }

    updateProgress() {
        const progress = (this.currentQuestion / this.totalQuestions) * 100;
        document.querySelector('.progress-fill').style.width = `${progress}%`;
    }

    updateNavigation() {
        const prevBtn = document.getElementById('prevBtn');

        // Previous button
        prevBtn.disabled = this.currentQuestion === 1;
    }

    showDownloadSection() {
        // Show download section page
        this.showQuestion(16, 'right');
    }
    
    // Simple event tracking for question number
    trackQuestionAnswered(questionNumber) {
        // Send event to Mixpanel
        if (typeof mixpanel !== 'undefined') {
            mixpanel.track('question_answered', { 
                question_number: questionNumber 
            });
        }
        
        // Send event to Facebook Pixel
        if (typeof fbq !== 'undefined') {
            fbq('track', 'CustomEvent', {
                event_name: 'question_answered',
                question_number: questionNumber
            });
        }
        
        console.log(`Question ${questionNumber} answered`);
    }
}

// Global variables
let selectedPlan = null;

// Function to select a plan
function selectPlan(planType) {
    // Remove previous selection
    document.querySelectorAll('.plan-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Select new plan
    const selectedCard = document.querySelector(`[data-plan="${planType}"]`);
    selectedCard.classList.add('selected');
    selectedPlan = planType;
    
    // Enable subscribe button
    document.querySelector('.subscribe-btn-main').disabled = false;
    
    // Track plan selection
    if (typeof mixpanel !== 'undefined') {
        mixpanel.track('plan_selected', {
            plan_type: planType,
            timestamp: new Date().toISOString()
        });
    }
    
    // Track plan selection in Facebook Pixel
    if (typeof fbq !== 'undefined') {
        fbq('track', 'CustomEvent', {
            event_name: 'plan_selected',
            plan_type: planType
        });
    }
}

// Function to open email modal
function openEmailModal(event) {
    // Prevent form submission and auto-advance
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    
    // Use selected plan or default to monthly
    const planToUse = selectedPlan || 'monthly';
    
    // Track subscribe button click
    if (typeof mixpanel !== 'undefined') {
        mixpanel.track('subscribe_complete', {
            plan_type: planToUse,
            timestamp: new Date().toISOString()
        });
    }
    
    // Track subscribe button click in Facebook Pixel
    if (typeof fbq !== 'undefined') {
        fbq('track', 'CustomEvent', {
            event_name: 'subscribe_complete',
            plan_type: planToUse
        });
    }
    
    // Update plan name in modal
    const planNames = {
        'annual': 'Premium Annual',
        'monthly': 'Premium Monthly'
    };
    document.getElementById('selectedPlanName').textContent = planNames[planToUse];
    
    // Show modal
    document.getElementById('emailModal').style.display = 'block';
    
    // Focus on email input
    document.getElementById('emailInput').focus();
}

// Function to close email modal
function closeEmailModal() {
    document.getElementById('emailModal').style.display = 'none';
    document.getElementById('emailInput').value = '';
    document.getElementById('emailError').textContent = '';
}

// Function to submit email
function submitEmail() {
    const email = document.getElementById('emailInput').value.trim();
    const emailError = document.getElementById('emailError');
    
    // Validate email
    if (!email) {
        emailError.textContent = 'Please enter your email address';
        return;
    }
    
    if (!isValidEmail(email)) {
        emailError.textContent = 'Please enter a valid email address';
        return;
    }
    
    // Use selected plan or default to monthly
    const planToUse = selectedPlan || 'monthly';
    
    // Track email submission
    if (typeof mixpanel !== 'undefined') {
        mixpanel.track('email_submitted', {
            plan_type: planToUse,
            email: email,
            timestamp: new Date().toISOString()
        });
    }
    
    // Track email submission in Facebook Pixel
    if (typeof fbq !== 'undefined') {
        fbq('track', 'CustomEvent', {
            event_name: 'email_submitted',
            plan_type: planToUse
        });
        
        // Track Lead event for Facebook Ads
        fbq('track', 'Lead');
        
        // Track Purchase event with subscription price
        const planPrices = {
            'annual': 29.99,
            'monthly': 4.99
        };
        
        fbq('track', 'Purchase', {
            value: planPrices[planToUse],
            currency: 'USD',
            content_type: 'subscription',
            content_name: planToUse === 'annual' ? 'Premium Annual Plan' : 'Premium Monthly Plan'
        });
    }
    
    // Close email modal
    closeEmailModal();
    
    // Show thank you modal
    const planNames = {
        'annual': 'Premium Annual',
        'monthly': 'Premium Monthly'
    };
    document.getElementById('finalPlanName').textContent = planNames[planToUse];
    document.getElementById('thankYouModal').style.display = 'block';
}

// Function to close thank you modal
function closeThankYouModal() {
    document.getElementById('thankYouModal').style.display = 'none';
}

// Function to validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Close modals when clicking outside
window.onclick = function(event) {
    const emailModal = document.getElementById('emailModal');
    const thankYouModal = document.getElementById('thankYouModal');
    
    if (event.target === emailModal) {
        closeEmailModal();
    }
    
    if (event.target === thankYouModal) {
        closeThankYouModal();
    }
}

// Initialize the quiz when the page loads
let quizApp;
document.addEventListener('DOMContentLoaded', () => {
    quizApp = new QuizApp();
});

// Add smooth scrolling for better UX
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll to top when changing questions
    const questions = document.querySelectorAll('.question');
    questions.forEach(question => {
        question.addEventListener('animationend', () => {
            if (question.classList.contains('active')) {
                question.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'Enter') {
        // Auto-advance to next question if current question is answered
        const currentQuestionEl = document.querySelector(`[data-question="${quizApp.currentQuestion}"]`);
        const hasAnswer = currentQuestionEl.querySelector('input[type="radio"]:checked');
        
        if (hasAnswer && quizApp.currentQuestion < quizApp.totalQuestions) {
            quizApp.nextQuestion();
        }
    } else if (e.key === 'ArrowLeft') {
        const prevBtn = document.getElementById('prevBtn');
        if (!prevBtn.disabled) {
            prevBtn.click();
        }
    }
});



// Add touch gestures for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - next question if answered
            const currentQuestionEl = document.querySelector(`[data-question="${quizApp.currentQuestion}"]`);
            const hasAnswer = currentQuestionEl.querySelector('input[type="radio"]:checked');
            
            if (hasAnswer && quizApp.currentQuestion < quizApp.totalQuestions) {
                quizApp.nextQuestion();
            }
        } else {
            // Swipe right - previous question
            const prevBtn = document.getElementById('prevBtn');
            if (!prevBtn.disabled) {
                prevBtn.click();
            }
        }
    }
} 