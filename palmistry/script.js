console.log('Script.js loaded successfully!');

// Функция для начала квиза
function startQuiz() {
    console.log('startQuiz function called!');
    
    // Переходим к разделу с вопросом о поле
    showSection('gender-section');
    
    // Обновляем URL с якорем
    window.history.pushState({}, '', '#gender');
    
    console.log('Starting palmistry quiz!');
}

// Функция выбора пола
function selectGender(gender) {
    console.log('Selected gender:', gender);
    
    // Отправляем события в Facebook Pixel и Mixpanel
    if (typeof fbq !== 'undefined') {
        fbq('track', 'question_answered', {
            question_number: 1,
            question_type: 'gender',
            answer: gender
        });
    }
    
    if (typeof mixpanel !== 'undefined') {
        mixpanel.track('question_answered', {
            question_number: 1,
            question_type: 'gender',
            answer: gender
        });
    }
    
    // Переходим к следующему вопросу о дате рождения
    showSection('birthdate-section');
    
    // Обновляем URL с якорем
    window.history.pushState({}, '', '#birthdate');
    
    // Сохраняем выбранный пол
    localStorage.setItem('selectedGender', gender);
}

// Функция продолжения к следующему разделу
function continueToNext() {
    console.log('Continuing to next section...');
    
    // Переходим к следующему вопросу о жизненных аспектах
    showSection('aspects-section');
    window.history.pushState({}, '', '#aspects');
}

// Функция выбора жизненного аспекта
function selectAspect(aspect) {
    console.log('Selected aspect:', aspect);
    
    // Отправляем события в Facebook Pixel и Mixpanel
    if (typeof fbq !== 'undefined') {
        fbq('track', 'question_answered', {
            question_number: 3,
            question_type: 'aspects',
            answer: aspect
        });
    }
    
    if (typeof mixpanel !== 'undefined') {
        mixpanel.track('question_answered', {
            question_number: 3,
            question_type: 'aspects',
            answer: aspect
        });
    }
    
    // Сохраняем выбранный аспект
    localStorage.setItem('selectedAspect', aspect);
    
    // Переходим к следующему вопросу о статусе отношений
    showSection('relationship-section');
    window.history.pushState({}, '', '#relationship');
}

// Функция выбора статуса отношений
function selectRelationship(status) {
    console.log('Selected relationship status:', status);
    
    // Отправляем события в Facebook Pixel и Mixpanel
    if (typeof fbq !== 'undefined') {
        fbq('track', 'question_answered', {
            question_number: 4,
            question_type: 'relationship',
            answer: status
        });
    }
    
    if (typeof mixpanel !== 'undefined') {
        mixpanel.track('question_answered', {
            question_number: 4,
            question_type: 'relationship',
            answer: status
        });
    }
    
    localStorage.setItem('selectedRelationship', status);
    
    // Переходим к следующему вопросу о стихиях
    showSection('element-section');
    window.history.pushState({}, '', '#element');
}

// Функция выбора стихии
function selectElement(element) {
    console.log('Selected element:', element);
    
    // Отправляем события в Facebook Pixel и Mixpanel
    if (typeof fbq !== 'undefined') {
        fbq('track', 'question_answered', {
            question_number: 5,
            question_type: 'element',
            answer: element
        });
    }
    
    if (typeof mixpanel !== 'undefined') {
        mixpanel.track('question_answered', {
            question_number: 5,
            question_type: 'element',
            answer: element
        });
    }
    
    localStorage.setItem('selectedElement', element);
    
    // Переходим к следующему вопросу о цветах
    showSection('color-section');
    window.history.pushState({}, '', '#color');
}

// Функция выбора цвета
function selectColor(color) {
    console.log('Selected color:', color);
    
    // Отправляем события в Facebook Pixel и Mixpanel
    if (typeof fbq !== 'undefined') {
        fbq('track', 'question_answered', {
            question_number: 6,
            question_type: 'color',
            answer: color
        });
    }
    
    if (typeof mixpanel !== 'undefined') {
        mixpanel.track('question_answered', {
            question_number: 6,
            question_type: 'color',
            answer: color
        });
    }
    
    localStorage.setItem('selectedColor', color);
    
    // Переходим к следующему вопросу о принятии решений
    showSection('decision-section');
    window.history.pushState({}, '', '#decision');
}

// Функция выбора способа принятия решений
function selectDecision(decision) {
    console.log('Selected decision making:', decision);
    
    // Отправляем события в Facebook Pixel и Mixpanel
    if (typeof fbq !== 'undefined') {
        fbq('track', 'question_answered', {
            question_number: 7,
            question_type: 'decision',
            answer: decision
        });
    }
    
    if (typeof mixpanel !== 'undefined') {
        mixpanel.track('question_answered', {
            question_number: 7,
            question_type: 'decision',
            answer: decision
        });
    }
    
    localStorage.setItem('selectedDecision', decision);
    
    // Все вопросы завершены
    console.log('All questions completed!');
    console.log('Gender:', localStorage.getItem('selectedGender'));
    console.log('Birthdate:', localStorage.getItem('selectedBirthdate'));
    console.log('Aspect:', localStorage.getItem('selectedAspect'));
    console.log('Relationship:', localStorage.getItem('selectedRelationship'));
    console.log('Element:', localStorage.getItem('selectedElement'));
    console.log('Color:', localStorage.getItem('selectedColor'));
    console.log('Decision:', localStorage.getItem('selectedDecision'));
    
    // Переходим к информационному разделу о хиромантии
    showSection('palmistry-info-section');
    window.history.pushState({}, '', '#palmistry-info');
}

// Функция перехода к результатам
function continueToResults() {
    console.log('Continuing to results...');
    
    // Переходим к разделу сканирования руки
    showSection('scanning-section');
    window.history.pushState({}, '', '#scanning');
    
    // Запускаем анимацию прогресса
    startScanningProgress();
}

// Функция анимации прогресса сканирования
function startScanningProgress() {
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    let progress = 0;
    
    const interval = setInterval(() => {
        progress += 1;
        progressFill.style.width = progress + '%';
        progressText.textContent = progress + '%';
        
        if (progress >= 100) {
            clearInterval(interval);
            
            // Переходим к разделу начала сканирования
            setTimeout(() => {
                showSection('start-scanning-section');
                window.history.pushState({}, '', '#start-scanning');
            }, 500);
        }
    }, 40); // 4000ms / 100 = 40ms для 4 секунд
}

// Функция начала реального сканирования
function startActualScanning() {
    console.log('Starting actual scanning...');
    
    // Переходим к подписочному экрану
    showSection('subscription-section');
    window.history.pushState({}, '', '#subscription');
    
    // Запускаем таймер на 5 минут
    startSubscriptionTimer();
}

// Функция запуска таймера подписки (5 минут)
function startSubscriptionTimer() {
    let timeLeft = 5 * 60; // 5 минут в секундах
    const timerElement = document.getElementById('subscriptionTimer');
    
    const interval = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        
        timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        if (timeLeft <= 0) {
            clearInterval(interval);
            timerElement.textContent = "00:00";
            // Здесь можно добавить логику по истечении времени
        }
        
        timeLeft--;
    }, 1000);
}

// Функция выбора плана подписки
function selectPlan(plan) {
    console.log('Selected plan:', plan);
    
    // Убираем выделение со всех планов
    document.querySelectorAll('.plan-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // Добавляем выделение выбранному плану
    event.target.closest('.plan-option').classList.add('selected');
    
    // Сохраняем выбранный план
    localStorage.setItem('selectedPlan', plan);
}

// Функция подписки на план
function subscribeToPlan() {
    console.log('subscribeToPlan function called!');
    
    let selectedPlan = localStorage.getItem('selectedPlan');
    console.log('Selected plan:', selectedPlan);
    
    // Если план не выбран, автоматически устанавливаем месячный
    if (!selectedPlan) {
        selectedPlan = 'monthly';
        localStorage.setItem('selectedPlan', selectedPlan);
        console.log('Auto-selected monthly plan');
    }
    
    console.log('Subscribing to plan:', selectedPlan);
    
    // Отправляем события в Facebook Pixel и Mixpanel
    if (typeof fbq !== 'undefined') {
        fbq('track', 'subscription_complete', {
            plan: selectedPlan,
            plan_price: getPlanPrice(selectedPlan)
        });
    }
    
    if (typeof mixpanel !== 'undefined') {
        mixpanel.track('subscription_complete', {
            plan: selectedPlan,
            plan_price: getPlanPrice(selectedPlan)
        });
    }
    
    // Показываем модальное окно для ввода email
    showEmailModal();
}

// Функция получения цены плана
function getPlanPrice(plan) {
    const prices = {
        'weekly': 5,
        'monthly': 15,
        'yearly': 50
    };
    return prices[plan] || 0;
}

// Функция показа модального окна email
function showEmailModal() {
    console.log('showEmailModal function called!');
    
    const modal = document.getElementById('emailModal');
    console.log('Modal element:', modal);
    
    if (!modal) {
        console.error('Modal element not found!');
        return;
    }
    
    modal.style.display = 'flex';
    console.log('Modal display set to flex');
    
    // Фокусируемся на поле email
    setTimeout(() => {
        const emailInput = document.getElementById('emailInput');
        if (emailInput) {
            emailInput.focus();
            console.log('Email input focused');
        } else {
            console.error('Email input not found!');
        }
    }, 100);
}

// Функция закрытия модального окна email
function closeEmailModal() {
    const modal = document.getElementById('emailModal');
    modal.style.display = 'none';
    
    // Очищаем поле email
    document.getElementById('emailInput').value = '';
}

// Функция отправки email
function sendEmail() {
    const emailInput = document.getElementById('emailInput');
    const email = emailInput.value.trim();
    
    if (!email) {
        alert('Please enter your email address');
        return;
    }
    
    if (!isValidEmail(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    console.log('Email submitted:', email);
    console.log('Selected plan:', localStorage.getItem('selectedPlan'));
    
    // Получаем план (если не выбран, будет месячный)
    const plan = localStorage.getItem('selectedPlan') || 'monthly';
    
    // Отправляем события в Facebook Pixel и Mixpanel
    if (typeof fbq !== 'undefined') {
        fbq('track', 'email_submitted', {
            email: email,
            plan: plan,
            plan_price: getPlanPrice(plan)
        });
        
        // Отправляем событие purchase для Facebook Pixel
        fbq('track', 'Purchase', {
            value: getPlanPrice(plan),
            currency: 'USD',
            content_name: plan + ' plan',
            content_category: 'palmistry_subscription'
        });
    }
    
    if (typeof mixpanel !== 'undefined') {
        mixpanel.track('email_submitted', {
            email: email,
            plan: plan,
            plan_price: getPlanPrice(plan)
        });
    }
    
    // Здесь можно добавить логику отправки email
    // Например, API вызов или переход к результатам
    
    // Закрываем модальное окно
    closeEmailModal();
    
    // Показываем сообщение об успехе
    alert('Thank you! Your palmistry reading is being prepared.');
}

// Функция валидации email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Функция фокусировки на поле даты
function selectBirthdate() {
    const dateInput = document.getElementById('birthdateInput');
    const selectedDateDiv = document.getElementById('selectedDate');
    const dateValueSpan = document.getElementById('dateValue');
    
    if (dateInput.value) {
        const selectedDate = new Date(dateInput.value);
        const formattedDate = selectedDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        dateValueSpan.textContent = formattedDate;
        selectedDateDiv.style.display = 'flex';
        
        // Сохраняем выбранную дату
        localStorage.setItem('selectedBirthdate', dateInput.value);
        
        console.log('Selected birthdate:', formattedDate);
        
        // Отправляем события в Facebook Pixel и Mixpanel
        if (typeof fbq !== 'undefined') {
            fbq('track', 'question_answered', {
                question_number: 2,
                question_type: 'birthdate',
                answer: dateInput.value
            });
        }
        
        if (typeof mixpanel !== 'undefined') {
            mixpanel.track('question_answered', {
                question_number: 2,
                question_type: 'birthdate',
                answer: dateInput.value
            });
        }
        
        // Переходим к следующему вопросу о ладонях
        showSection('palms-section');
        window.history.pushState({}, '', '#palms');
    }
}

// Функция для обработки изменения даты (без перехода)
function handleDateChange() {
    const dateInput = document.getElementById('birthdateInput');
    const selectedDateDiv = document.getElementById('selectedDate');
    const dateValueSpan = document.getElementById('dateValue');
    const continueBtn = document.getElementById('birthdateContinueBtn');
    const inputContainer = document.getElementById('birthdateInputContainer');
    
    if (dateInput.value) {
        const selectedDate = new Date(dateInput.value);
        const formattedDate = selectedDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        dateValueSpan.textContent = formattedDate;
        selectedDateDiv.style.display = 'flex';
        continueBtn.style.display = 'block';
        
        // Скрываем поле ввода даты
        inputContainer.style.display = 'none';
        
        // Сохраняем выбранную дату
        localStorage.setItem('selectedBirthdate', dateInput.value);
        
        console.log('Date changed to:', formattedDate);
    }
}

// Функция показа определенного раздела
function showSection(sectionId) {
    // Скрываем все разделы
    const sections = ['welcome-section', 'gender-section', 'birthdate-section', 'palms-section', 'aspects-section', 'relationship-section', 'element-section', 'color-section', 'decision-section', 'palmistry-info-section', 'scanning-section', 'start-scanning-section', 'subscription-section'];
    sections.forEach(id => {
        const section = document.getElementById(id);
        if (section) {
            section.style.display = 'none';
            section.style.opacity = '0';
        }
    });
    
    // Показываем нужный раздел
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.style.display = 'block';
        setTimeout(() => {
            targetSection.style.opacity = '1';
        }, 100);
    }
}

// Функция для навигации по якорям
function navigateToAnchor(anchor) {
    switch(anchor) {
        case 'welcome':
        case '':
            showSection('welcome-section');
            break;
        case 'gender':
            showSection('gender-section');
            break;
        case 'birthdate':
            showSection('birthdate-section');
            break;
        case 'palms':
            showSection('palms-section');
            break;
        case 'aspects':
            showSection('aspects-section');
            break;
        case 'relationship':
            showSection('relationship-section');
            break;
        case 'element':
            showSection('element-section');
            break;
        case 'color':
            showSection('color-section');
            break;
        case 'decision':
            showSection('decision-section');
            break;
        case 'palmistry-info':
            showSection('palmistry-info-section');
            break;
        case 'scanning':
            showSection('scanning-section');
            break;
        case 'start-scanning':
            showSection('start-scanning-section');
            break;
        case 'subscription':
            showSection('subscription-section');
            break;
        default:
            showSection('welcome-section');
    }
}

// Обработчик изменения URL
window.addEventListener('popstate', function() {
    const anchor = window.location.hash.slice(1);
    navigateToAnchor(anchor);
});

// Обработчик загрузки страницы
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, JavaScript is working!');
    
    // Проверяем якорь в URL при загрузке
    const anchor = window.location.hash.slice(1);
    if (anchor) {
        navigateToAnchor(anchor);
    }
    
    // Плавное появление элементов при загрузке
    const elements = document.querySelectorAll('.quiz-card > *');
    
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
    
    // Предотвращаем скролл при открытии календаря на iOS
    const dateInput = document.getElementById('birthdateInput');
    if (dateInput && /iPad|iPhone|iPod/.test(navigator.userAgent)) {
        let savedScrollPosition = 0;
        
        dateInput.addEventListener('focus', function() {
            // Сохраняем текущую позицию скролла
            savedScrollPosition = window.scrollY;
            
            // Предотвращаем автоматический скролл
            setTimeout(() => {
                window.scrollTo(0, savedScrollPosition);
            }, 10);
        });
        
        dateInput.addEventListener('blur', function() {
            // Восстанавливаем позицию после закрытия календаря
            setTimeout(() => {
                window.scrollTo(0, savedScrollPosition);
            }, 100);
        });
        
        // Предотвращаем скролл при изменении даты
        dateInput.addEventListener('change', function() {
            setTimeout(() => {
                window.scrollTo(0, savedScrollPosition);
            }, 50);
        });
    }
});

// Функция создания эффекта частиц
function createParticles(button) {
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = centerX + 'px';
        particle.style.top = centerY + 'px';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = '#ff77c6';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1000';
        
        document.body.appendChild(particle);
        
        // Анимация частицы
        const angle = (i / 8) * Math.PI * 2;
        const velocity = 100;
        const startX = centerX;
        const startY = centerY;
        const endX = startX + Math.cos(angle) * velocity;
        const endY = startY + Math.sin(angle) * velocity;
        
        let progress = 0;
        const animate = () => {
            progress += 0.05;
            if (progress <= 1) {
                const x = startX + (endX - startX) * progress;
                const y = startY + (endY - startY) * progress;
                const opacity = 1 - progress;
                const scale = 1 - progress * 0.5;
                
                particle.style.left = x + 'px';
                particle.style.top = y + 'px';
                particle.style.opacity = opacity;
                particle.style.transform = `scale(${scale})`;
                
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        };
        
        animate();
    }
}

// Добавляем эффект параллакса для фона
document.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
    
    document.body.style.setProperty('--move-x', moveX + 'px');
    document.body.style.setProperty('--move-y', moveY + 'px');
});

// Функция фокуса на поле даты с предотвращением скролла на iOS
function focusDateInput() {
    const dateInput = document.getElementById('birthdateInput');
    if (dateInput) {
        // Предотвращаем скролл на iOS
        if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
            // Сохраняем текущую позицию скролла
            const scrollY = window.scrollY;
            
            // Фокусируемся на поле
            dateInput.focus();
            
            // Восстанавливаем позицию скролла
            setTimeout(() => {
                window.scrollTo(0, scrollY);
            }, 100);
        } else {
            dateInput.focus();
        }
    }
}


