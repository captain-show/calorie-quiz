console.log('Script.js loaded successfully!');

// Функция для начала квиза
function startQuiz() {
    console.log('startQuiz function called!');
    
    // Переходим к разделу с вопросом о стиле
    showSection('gender-section');
    
    // Обновляем URL с якорем
    window.history.pushState({}, '', '#style');
    
    console.log('Starting room design quiz!');
}

// Функция выбора стиля
function selectGender(style) {
    console.log('Selected style:', style);
    
    // Отправляем событие в Mixpanel
    if (typeof mixpanel !== 'undefined') {
        mixpanel.track('question_answered', {
            question_number: 1,
            question_type: 'style',
            answer: style
        });
    }
    
    // Переходим к следующему вопросу о цветах
    showSection('birthdate-section');
    
    // Обновляем URL с якорем
    window.history.pushState({}, '', '#colors');
    
    // Сохраняем выбранный стиль
    localStorage.setItem('selectedStyle', style);
}

// Функция продолжения к следующему разделу
function continueToNext() {
    console.log('Continuing to next section...');
    
    // Переходим к следующему вопросу о функциях комнаты
    showSection('aspects-section');
    window.history.pushState({}, '', '#function');
}

// Функция выбора функции комнаты
function selectAspect(function_type) {
    console.log('Selected function:', function_type);
    
    // Отправляем событие в Mixpanel
    if (typeof mixpanel !== 'undefined') {
        mixpanel.track('question_answered', {
            question_number: 3,
            question_type: 'function',
            answer: function_type
        });
    }
    
    // Сохраняем выбранную функцию
    localStorage.setItem('selectedFunction', function_type);
    
    // Переходим к следующему вопросу об освещении
    showSection('relationship-section');
    window.history.pushState({}, '', '#lighting');
}

// Функция выбора освещения
function selectRelationship(lighting) {
    console.log('Selected lighting:', lighting);
    
    // Отправляем событие в Mixpanel
    if (typeof mixpanel !== 'undefined') {
        mixpanel.track('question_answered', {
            question_number: 4,
            question_type: 'lighting',
            answer: lighting
        });
    }
    
    localStorage.setItem('selectedLighting', lighting);
    
    // Переходим к следующему вопросу о мебели
    showSection('element-section');
    window.history.pushState({}, '', '#furniture');
}

// Функция выбора приоритета мебели
function selectElement(priority) {
    console.log('Selected furniture priority:', priority);
    
    // Отправляем событие в Mixpanel
    if (typeof mixpanel !== 'undefined') {
        mixpanel.track('question_answered', {
            question_number: 5,
            question_type: 'furniture_priority',
            answer: priority
        });
    }
    
    localStorage.setItem('selectedFurniturePriority', priority);
    
    // Переходим к следующему вопросу о декоре
    showSection('color-section');
    window.history.pushState({}, '', '#decor');
}

// Функция выбора декора
function selectColor(decor) {
    console.log('Selected decor:', decor);
    
    // Отправляем событие в Mixpanel
    if (typeof mixpanel !== 'undefined') {
        mixpanel.track('question_answered', {
            question_number: 6,
            question_type: 'decor',
            answer: decor
        });
    }
    
    localStorage.setItem('selectedDecor', decor);
    
    // Переходим к следующему вопросу о черном цвете
    showSection('decision-section');
    window.history.pushState({}, '', '#black_color');
}

// Функция выбора отношения к черному цвету
function selectDecision(black_preference) {
    console.log('Selected black color preference:', black_preference);
    
    // Отправляем событие в Mixpanel
    if (typeof mixpanel !== 'undefined') {
        mixpanel.track('question_answered', {
            question_number: 7,
            question_type: 'black_color',
            answer: black_preference
        });
    }
    
    localStorage.setItem('selectedBlackPreference', black_preference);
    
    // Все вопросы завершены
    console.log('All questions completed!');
    console.log('Style:', localStorage.getItem('selectedStyle'));
    console.log('Function:', localStorage.getItem('selectedFunction'));
    console.log('Lighting:', localStorage.getItem('selectedLighting'));
    console.log('Furniture Priority:', localStorage.getItem('selectedFurniturePriority'));
    console.log('Decor:', localStorage.getItem('selectedDecor'));
    console.log('Black Preference:', localStorage.getItem('selectedBlackPreference'));
    
    // Переходим к информационному разделу о дизайне
    showSection('palmistry-info-section');
    window.history.pushState({}, '', '#design-info');
}

// Функция перехода к результатам
function continueToResults() {
    console.log('Continuing to results...');
    
    // Переходим к разделу анализа комнаты
    showSection('scanning-section');
    window.history.pushState({}, '', '#analysis');
    
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
            
            // Переходим к разделу готовности дизайна
            setTimeout(() => {
                showSection('start-scanning-section');
                window.history.pushState({}, '', '#design-ready');
            }, 500);
        }
    }, 40); // 4000ms / 100 = 40ms для 4 секунд
}

// Функция начала создания дизайна
function startActualScanning() {
    console.log('Starting design creation...');
    
    // Очищаем предыдущий выбор плана подписки
    localStorage.removeItem('selectedPlan');
    
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
function selectPlan(plan, el) {
    console.log('Selected plan:', plan);
    
    // Убираем выделение со всех планов
    document.querySelectorAll('.plan-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // Добавляем выделение выбранному плану
    if (el && el.classList) {
        el.classList.add('selected');
    }
    
    // Сохраняем выбранный план
    localStorage.setItem('selectedPlan', plan);
}

// Функция подписки на план
function subscribeToPlan() {
    console.log('subscribeToPlan function called!');
    
    let selectedPlan = localStorage.getItem('selectedPlan');
    console.log('Selected plan:', selectedPlan);
    
    // Если план не выбран, автоматически устанавливаем годовой
    if (!selectedPlan) {
        selectedPlan = 'yearly';
        localStorage.setItem('selectedPlan', selectedPlan);
        console.log('Auto-selected yearly plan');
    }
    
    console.log('Subscribing to plan:', selectedPlan);
    
    // Отправляем событие в Mixpanel
    if (typeof mixpanel !== 'undefined') {
        mixpanel.track('subscription_click', {
            plan: selectedPlan,
            plan_price: getPlanPrice(selectedPlan)
        });
    }
    
    // Открываем раздел оплаты (email + карта)
    if (typeof openCheckoutSection === 'function') {
        try {
            const maybePromise = openCheckoutSection();
            if (maybePromise && typeof maybePromise.then === 'function') {
                maybePromise.catch(() => {
                    showSection('checkout-section');
                });
            }
        } catch (e) {
            showSection('checkout-section');
        }
    } else {
        showSection('checkout-section');
    }
}

// Функция получения цены плана
function getPlanPrice(plan) {
    const prices = {
        'weekly': 4.99,
        'monthly': 9.99,
        'yearly': 19.99
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
    
    // Отправляем событие в Mixpanel
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
    alert('Thank you! Your room design guide is being prepared.');
}

// Функция валидации email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Функция для перехода после выбора возраста
function selectAge() {
    const ageInput = document.getElementById('ageInput');
    
    if (ageInput.value && ageInput.value >= 1 && ageInput.value <= 120) {
        const age = parseInt(ageInput.value);
        
        console.log('Selected age:', age);
        
        // Сохраняем выбранный возраст
        localStorage.setItem('selectedAge', age);
        
        // Отправляем событие в Mixpanel
        if (typeof mixpanel !== 'undefined') {
            mixpanel.track('question_answered', {
                question_number: 2,
                question_type: 'age',
                answer: age
            });
        }
        
        // Переходим к следующему вопросу о ладонях
        showSection('palms-section');
        window.history.pushState({}, '', '#palms');
    } else {
        // Показываем сообщение об ошибке если возраст не введен
        alert('Please enter a valid age between 1 and 120 years.');
    }
}

// Функция для обработки изменения возраста (без перехода)
function handleAgeChange() {
    const ageInput = document.getElementById('ageInput');
    const continueBtn = document.getElementById('ageContinueBtn');
    
    if (ageInput.value && ageInput.value >= 1 && ageInput.value <= 120) {
        const age = parseInt(ageInput.value);
        
        // Активируем кнопку
        continueBtn.disabled = false;
        continueBtn.style.opacity = '1';
        continueBtn.style.cursor = 'pointer';
        
        console.log('Valid age entered:', age);
    } else {
        // Деактивируем кнопку если возраст невалидный
        continueBtn.disabled = true;
        continueBtn.style.opacity = '0.5';
        continueBtn.style.cursor = 'not-allowed';
    }
}

// Функция показа определенного раздела
function showSection(sectionId) {
    // Скрываем все разделы
    const sections = ['welcome-section', 'gender-section', 'birthdate-section', 'palms-section', 'aspects-section', 'relationship-section', 'element-section', 'color-section', 'decision-section', 'palmistry-info-section', 'scanning-section', 'start-scanning-section', 'subscription-section', 'checkout-section', 'success-section'];
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
        case 'style':
            showSection('gender-section');
            break;
        case 'colors':
            showSection('birthdate-section');
            break;
        case 'atmosphere':
            showSection('palms-section');
            break;
        case 'function':
            showSection('aspects-section');
            break;
        case 'lighting':
            showSection('relationship-section');
            break;
        case 'furniture':
            showSection('element-section');
            break;
        case 'decor':
            showSection('color-section');
            break;
        case 'black_color':
            showSection('decision-section');
            break;
        case 'design-info':
            showSection('palmistry-info-section');
            break;
        case 'analysis':
            showSection('scanning-section');
            break;
        case 'design-ready':
            showSection('start-scanning-section');
            break;
        case 'subscription':
            // Очищаем предыдущий выбор плана подписки
            localStorage.removeItem('selectedPlan');
            showSection('subscription-section');
            break;
        case 'success':
            showSection('success-section');
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
    
    // Код для работы с возрастом (убрали старый код для даты)
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




