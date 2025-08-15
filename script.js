class QuizApp {
    constructor() {
        this.currentQuestion = 1;
        this.totalQuestions = 10;
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
                if (this.currentQuestion < this.totalQuestions) {
                    this.nextQuestion();
                } else {
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
        this.showQuestion(11, 'right');
    }
    
    // Simple event tracking for question number
    trackQuestionAnswered(questionNumber) {
        // Send event to Mixpanel
        if (typeof mixpanel !== 'undefined') {
            mixpanel.track('Question Answered', { 
                question_number: questionNumber 
            });
        }
        console.log(`Question ${questionNumber} answered`);
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