// Wallpaper Style Quiz Application
class WallpaperStyleQuiz {
    constructor() {
        this.currentQuestion = 1;
        this.totalQuestions = 8;
        this.answers = {};
        this.score = 0;
        this.timer = null;
        this.startTime = null;
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.setupURLHandling();
        this.updateProgress();
        this.startTimer();
        this.addModernEffects();
    }

    bindEvents() {
        // Start quiz button
        document.getElementById('start-quiz').addEventListener('click', () => {
            this.showScreen('quiz-screen');
            this.updateURL();
        });

        // Navigation buttons
        document.getElementById('next-btn').addEventListener('click', () => {
            this.nextQuestion();
        });

        document.getElementById('prev-btn').addEventListener('click', () => {
            this.previousQuestion();
        });

        // Option selection
        document.querySelectorAll('.option').forEach(option => {
            option.addEventListener('click', (e) => {
                this.selectOption(e.currentTarget);
            });
        });

        // Results screen buttons
        document.getElementById('download-app').addEventListener('click', () => {
            this.downloadApp();
        });

        document.getElementById('retake-quiz').addEventListener('click', () => {
            this.retakeQuiz();
        });

        // Social share buttons
        document.querySelectorAll('.share-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.shareResults(e.currentTarget.dataset.platform);
            });
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            this.handleKeyboard(e);
        });
    }

    setupURLHandling() {
        // Check if there's a question number in the URL
        const urlParams = new URLSearchParams(window.location.search);
        const questionParam = urlParams.get('q');
        
        if (questionParam && !isNaN(questionParam)) {
            const questionNum = parseInt(questionParam);
            if (questionNum >= 1 && questionNum <= this.totalQuestions) {
                this.currentQuestion = questionNum;
                this.showScreen('quiz-screen');
                this.showQuestion(this.currentQuestion);
                this.updateProgress();
            }
        }

        // Handle browser back/forward buttons
        window.addEventListener('popstate', (e) => {
            if (e.state && e.state.question) {
                this.currentQuestion = e.state.question;
                this.showQuestion(this.currentQuestion);
                this.updateProgress();
            }
        });
    }

    updateURL() {
        const url = new URL(window.location);
        url.searchParams.set('q', this.currentQuestion);
        window.history.pushState({ question: this.currentQuestion }, '', url);
    }

    showScreen(screenId) {
        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });

        // Show target screen
        document.getElementById(screenId).classList.add('active');

        // Update URL if showing quiz
        if (screenId === 'quiz-screen') {
            this.updateURL();
        }
    }

    showQuestion(questionNumber) {
        // Hide all questions
        document.querySelectorAll('.question').forEach(question => {
            question.classList.remove('active');
        });

        // Show current question
        document.getElementById(`question-${questionNumber}`).classList.add('active');

        // Update navigation buttons
        this.updateNavigationButtons();
        
        // Update progress
        this.updateProgress();

        // Scroll to top of question container
        document.querySelector('.question-container').scrollTop = 0;
    }

    selectOption(optionElement) {
        const questionId = optionElement.closest('.question').dataset.question;
        const value = optionElement.dataset.value;

        // Remove selection from other options in this question
        optionElement.closest('.question').querySelectorAll('.option').forEach(opt => {
            opt.classList.remove('selected');
        });

        // Select this option
        optionElement.classList.add('selected');

        // Store answer
        this.answers[questionId] = value;

        // Enable next button if this is the last question
        if (this.currentQuestion === this.totalQuestions) {
            document.getElementById('next-btn').innerHTML = '<span>See Results</span><i class="fas fa-trophy"></i>';
        }

        // Auto-advance after a short delay
        setTimeout(() => {
            if (this.currentQuestion < this.totalQuestions) {
                this.nextQuestion();
            }
        }, 1000);
    }

    nextQuestion() {
        if (this.currentQuestion < this.totalQuestions) {
            this.currentQuestion++;
            this.showQuestion(this.currentQuestion);
            this.updateURL();
        } else {
            this.calculateResults();
        }
    }

    previousQuestion() {
        if (this.currentQuestion > 1) {
            this.currentQuestion--;
            this.showQuestion(this.currentQuestion);
            this.updateURL();
        }
    }

    updateNavigationButtons() {
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');

        // Show/hide previous button
        if (this.currentQuestion > 1) {
            prevBtn.style.display = 'inline-flex';
        } else {
            prevBtn.style.display = 'none';
        }

        // Update next button text
        if (this.currentQuestion === this.totalQuestions) {
            nextBtn.innerHTML = '<span>See Results</span><i class="fas fa-trophy"></i>';
        } else {
            nextBtn.innerHTML = '<span>Next</span><i class="fas fa-arrow-right"></i>';
        }

        // Disable next button if no option is selected
        const currentQuestionElement = document.getElementById(`question-${this.currentQuestion}`);
        const selectedOption = currentQuestionElement.querySelector('.option.selected');
        nextBtn.disabled = !selectedOption;
    }

    updateProgress() {
        const progressFill = document.querySelector('.progress-fill');
        const currentQuestionSpan = document.getElementById('current-question');
        const totalQuestionsSpan = document.getElementById('total-questions');

        const progress = (this.currentQuestion / this.totalQuestions) * 100;
        progressFill.style.width = `${progress}%`;

        currentQuestionSpan.textContent = this.currentQuestion;
        totalQuestionsSpan.textContent = this.totalQuestions;
    }

    startTimer() {
        this.startTime = Date.now();
        this.timer = setInterval(() => {
            const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
            // Timer display can be added here if needed
        }, 1000);
    }

    calculateResults() {
        // Calculate score based on answers
        this.score = this.calculateScore();
        
        // Show results screen
        this.showScreen('results-screen');
        
        // Animate score
        this.animateScore();
        
        // Generate personalized results
        this.generateResults();
        
        // Stop timer
        if (this.timer) {
            clearInterval(this.timer);
        }
    }

    calculateScore() {
        let score = 0;
        const maxScore = this.totalQuestions * 10;
        
        // Base points for each answer
        Object.values(this.answers).forEach(answer => {
            score += 10;
        });

        // Bonus points for style consistency
        if (this.hasStyleConsistency()) {
            score += 25;
        }

        return Math.min(score, maxScore);
    }

    hasStyleConsistency() {
        // Check if user has consistent style preferences
        const colorPref = this.answers['1'];
        const stylePref = this.answers['2'];
        const moodPref = this.answers['3'];

        // Style consistency logic
        if (colorPref === 'warm' && stylePref === 'retro') return true;
        if (colorPref === 'cool' && stylePref === 'minimalist') return true;
        if (colorPref === 'vibrant' && stylePref === 'modern') return true;
        if (colorPref === 'neutral' && stylePref === 'minimalist') return true;

        return false;
    }

    animateScore() {
        const scoreElement = document.getElementById('score-percentage');
        const targetScore = Math.round((this.score / (this.totalQuestions * 10)) * 100);
        let currentScore = 0;

        const animation = setInterval(() => {
            currentScore += 2;
            if (currentScore >= targetScore) {
                currentScore = targetScore;
                clearInterval(animation);
            }
            scoreElement.textContent = currentScore;
        }, 50);
    }

    generateResults() {
        // Generate personalized traits based on answers
        const traits = this.generateTraits();
        
        // Update trait elements
        document.getElementById('trait-1').innerHTML = `<i class="fas fa-palette"></i><span>${traits[0]}</span>`;
        document.getElementById('trait-2').innerHTML = `<i class="fas fa-heart"></i><span>${traits[1]}</span>`;
        document.getElementById('trait-3').innerHTML = `<i class="fas fa-star"></i><span>${traits[2]}</span>`;

        // Update score label
        const percentage = Math.round((this.score / (this.totalQuestions * 10)) * 100);
        const scoreLabel = this.getScoreLabel(percentage);
        document.getElementById('score-label').textContent = scoreLabel;

        // Generate wallpaper previews based on style
        this.generateWallpaperPreviews();
    }

    generateTraits() {
        const traits = [];
        const answers = this.answers;

        // Trait 1: Color personality
        if (answers['1'] === 'warm') traits.push('Warm & Passionate');
        else if (answers['1'] === 'cool') traits.push('Calm & Analytical');
        else if (answers['1'] === 'neutral') traits.push('Balanced & Sophisticated');
        else traits.push('Bold & Energetic');

        // Trait 2: Style preference
        if (answers['2'] === 'minimalist') traits.push('Minimalist & Focused');
        else if (answers['2'] === 'retro') traits.push('Nostalgic & Classic');
        else if (answers['2'] === 'modern') traits.push('Contemporary & Innovative');
        else traits.push('Natural & Peaceful');

        // Trait 3: Mood preference
        if (answers['3'] === 'inspired') traits.push('Creative & Motivated');
        else if (answers['3'] === 'relaxed') traits.push('Peaceful & Calm');
        else if (answers['3'] === 'energized') traits.push('Dynamic & Powerful');
        else traits.push('Focused & Clear');

        return traits;
    }

    getScoreLabel(percentage) {
        if (percentage >= 90) return "You're a Style Master! 🎨";
        if (percentage >= 80) return "You're an Aesthetic Expert! ✨";
        if (percentage >= 70) return "You have Great Taste! 🌟";
        if (percentage >= 60) return "You're Style-Conscious! 💫";
        return "You're Discovering Your Style! 🌱";
    }

    generateWallpaperPreviews() {
        const previews = document.querySelectorAll('.preview-item');
        const answers = this.answers;

        // Generate different preview styles based on user preferences
        previews.forEach((preview, index) => {
            let gradient = '';
            
            if (answers['1'] === 'warm') {
                gradient = 'linear-gradient(45deg, #FF6B6B, #FF8E53)';
            } else if (answers['1'] === 'cool') {
                gradient = 'linear-gradient(45deg, #4ECDC4, #45B7D1)';
            } else if (answers['1'] === 'neutral') {
                gradient = 'linear-gradient(45deg, #F7F7F7, #E8E8E8)';
            } else {
                gradient = 'linear-gradient(45deg, #FF1744, #00E676)';
            }

            preview.style.background = gradient;
        });
    }

    downloadApp() {
        // Simulate app download
        const button = document.getElementById('download-app');
        const originalText = button.innerHTML;
        
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Downloading...</span>';
        button.disabled = true;

        // Simulate download process
        setTimeout(() => {
            button.innerHTML = '<i class="fas fa-check"></i><span>Download Complete!</span>';
            button.style.background = 'linear-gradient(45deg, #00E676, #00C853)';
            
            // Show success message
            this.showNotification('App downloaded successfully! Check your exclusive wallpaper pack! 🎉');
            
            setTimeout(() => {
                button.innerHTML = originalText;
                button.disabled = false;
                button.style.background = '';
            }, 3000);
        }, 2000);
    }

    retakeQuiz() {
        // Reset quiz state
        this.currentQuestion = 1;
        this.answers = {};
        this.score = 0;
        
        // Clear selections
        document.querySelectorAll('.option').forEach(option => {
            option.classList.remove('selected');
        });
        
        // Reset navigation
        document.getElementById('next-btn').innerHTML = '<span>Next</span><i class="fas fa-arrow-right"></i>';
        
        // Show first question
        this.showQuestion(1);
        this.updateProgress();
        
        // Show quiz screen
        this.showScreen('quiz-screen');
        
        // Restart timer
        this.startTimer();
    }

    shareResults(platform) {
        const percentage = Math.round((this.score / (this.totalQuestions * 10)) * 100);
        const scoreLabel = this.getScoreLabel(percentage);
        const text = `I just discovered my wallpaper style! ${scoreLabel} Take the quiz: ${window.location.origin}${window.location.pathname}`;
        
        let shareUrl = '';
        
        switch (platform) {
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
                break;
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
                break;
            case 'instagram':
                // Instagram doesn't support direct sharing via URL
                this.showNotification('Copy the link and share it on Instagram! 📱');
                return;
        }
        
        if (shareUrl) {
            window.open(shareUrl, '_blank', 'width=600,height=400');
        }
    }

    handleKeyboard(e) {
        switch (e.key) {
            case 'ArrowRight':
            case ' ':
                if (this.currentQuestion < this.totalQuestions) {
                    e.preventDefault();
                    this.nextQuestion();
                }
                break;
            case 'ArrowLeft':
                if (this.currentQuestion > 1) {
                    e.preventDefault();
                    this.previousQuestion();
                }
                break;
            case 'Enter':
                if (document.getElementById('quiz-screen').classList.contains('active')) {
                    e.preventDefault();
                    if (this.currentQuestion < this.totalQuestions) {
                        this.nextQuestion();
                    } else {
                        this.calculateResults();
                    }
                }
                break;
        }
    }

    showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
            z-index: 1000;
            animation: slideInRight 0.3s ease-out;
            font-family: 'Inter', sans-serif;
            font-weight: 600;
            max-width: 300px;
        `;

        document.body.appendChild(notification);

        // Remove notification after 4 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 4000);
    }

    addModernEffects() {
        // Add hover effects for options
        document.querySelectorAll('.option').forEach(option => {
            option.addEventListener('mouseenter', () => {
                option.style.transform = 'translateY(-3px) scale(1.02)';
            });
            
            option.addEventListener('mouseleave', () => {
                option.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Add click ripple effect
        document.querySelectorAll('button').forEach(button => {
            button.addEventListener('click', (e) => {
                this.createRippleEffect(e, button);
            });
        });
    }

    createRippleEffect(e, button) {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(102, 126, 234, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: modernRipple 0.6s linear;
            pointer-events: none;
            z-index: 1;
        `;
        
        button.style.position = 'relative';
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
}

// Add CSS animations for notifications and ripple effects
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }

    @keyframes modernRipple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize quiz when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new WallpaperStyleQuiz();
});
