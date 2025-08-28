document.addEventListener('DOMContentLoaded', function() {
    const question1 = document.getElementById('question1');
    const question2 = document.getElementById('question2');
    const question3 = document.getElementById('question3');
    const question4 = document.getElementById('question4');
    const question5 = document.getElementById('question5');
    const question6 = document.getElementById('question6');
    const question7 = document.getElementById('question7');
    const question8 = document.getElementById('question8');
    const question9 = document.getElementById('question9');
    const question10 = document.getElementById('question10');
    const question11 = document.getElementById('question11');
    const question12 = document.getElementById('question12');
    const question13 = document.getElementById('question13');
    const question14 = document.getElementById('question14');
    const question15 = document.getElementById('question15');
    const question16 = document.getElementById('question16');
    const question17 = document.getElementById('question17');
    const question18 = document.getElementById('question18');
    const question19 = document.getElementById('question19');
    const question20 = document.getElementById('question20');
    const question21 = document.getElementById('question21');
    const question22 = document.getElementById('question22');
    const question23 = document.getElementById('question23');
    const question24 = document.getElementById('question24');
    const question25 = document.getElementById('question25');
    const question26 = document.getElementById('question26');
    const question27 = document.getElementById('question27');
    const question28 = document.getElementById('question28');
    const question29 = document.getElementById('question29');
    const question30 = document.getElementById('question30');
    const question31 = document.getElementById('question31');
    const question32 = document.getElementById('question32');
    const profileScreen = document.getElementById('profile-screen');
    const paymentScreen = document.getElementById('payment-screen');
    
    const options1 = question1.querySelectorAll('.option');
    const backBtn1 = document.getElementById('backBtn1');
    const progressFill1 = document.getElementById('progressFill1');
    
    const images2 = document.querySelectorAll('#question2 .person-image');
    const backBtn2 = document.getElementById('backBtn2');
    const progressFill2 = document.getElementById('progressFill2');
    
    const backBtn3 = document.getElementById('backBtn3');
    const continueBtn3 = document.getElementById('continueBtn3');
    const progressFill3 = document.getElementById('progressFill3');
    
    const backBtn4 = document.getElementById('backBtn4');
    const progressFill4 = document.getElementById('progressFill4');
    
    const backBtn5 = document.getElementById('backBtn5');
    const backBtn6 = document.getElementById('backBtn6');
    const backBtn7 = document.getElementById('backBtn7');
    const backBtn8 = document.getElementById('backBtn8');
    const backBtn9 = document.getElementById('backBtn9');
    const backBtn10 = document.getElementById('backBtn10');
    const backBtn11 = document.getElementById('backBtn11');
    const backBtn12 = document.getElementById('backBtn12');
    const backBtn13 = document.getElementById('backBtn13');
    const backBtn14 = document.getElementById('backBtn14');
    const backBtn15 = document.getElementById('backBtn15');
    const backBtn16 = document.getElementById('backBtn16');
    const backBtn17 = document.getElementById('backBtn17');
    const backBtn18 = document.getElementById('backBtn18');
    const backBtn19 = document.getElementById('backBtn19');
    const backBtn20 = document.getElementById('backBtn20');
    const backBtn21 = document.getElementById('backBtn21');
    const backBtn22 = document.getElementById('backBtn22');
    const backBtn23 = document.getElementById('backBtn23');
    const backBtn24 = document.getElementById('backBtn24');
    const backBtn25 = document.getElementById('backBtn25');
    const backBtn26 = document.getElementById('backBtn26');
    const backBtn27 = document.getElementById('backBtn27');
    const backBtn28 = document.getElementById('backBtn28');
    const backBtn29 = document.getElementById('backBtn29');
    const backBtn30 = document.getElementById('backBtn30');
    const backBtn31 = document.getElementById('backBtn31');
    
    const continueBtn7 = document.getElementById('continueBtn7');
    const continueBtn21 = document.getElementById('continueBtn21');
    const continueBtn22 = document.getElementById('continueBtn22');
    const continueBtn23 = document.getElementById('continueBtn23');
    const continueBtn24 = document.getElementById('continueBtn24');
    const continueBtn25 = document.getElementById('continueBtn25');
    const continueBtn29 = document.getElementById('continueBtn29');
    const continueProfileBtn = document.getElementById('continueProfileBtn');
    
    // Элементы экрана оплаты
    const backBtnPayment = document.getElementById('backBtnPayment');
    const selectedPlanName = document.getElementById('selectedPlanName');
    const selectedPlanPrice = document.getElementById('selectedPlanPrice');
    const planCost = document.getElementById('planCost');
    const taxAmount = document.getElementById('taxAmount');
    const totalAmount = document.getElementById('totalAmount');
    const payBtn = document.getElementById('payBtn');
    const payBtnAmount = document.getElementById('payBtnAmount');
    
    const loadingFill = document.getElementById('loadingFill');
    const loadingFill15 = document.getElementById('loadingFill15');
    
    const progressFill5 = document.getElementById('progressFill5');
    const progressFill6 = document.getElementById('progressFill6');
    const progressFill7 = document.getElementById('progressFill7');
    const progressFill8 = document.getElementById('progressFill8');
    const progressFill9 = document.getElementById('progressFill9');
    const progressFill10 = document.getElementById('progressFill10');
    const progressFill11 = document.getElementById('progressFill11');
    const progressFill12 = document.getElementById('progressFill12');
    const progressFill13 = document.getElementById('progressFill13');
    const progressFill14 = document.getElementById('progressFill14');
    const progressFill15 = document.getElementById('progressFill15');
    const progressFill16 = document.getElementById('progressFill16');
    const progressFill17 = document.getElementById('progressFill17');
    const progressFill18 = document.getElementById('progressFill18');
    const progressFill19 = document.getElementById('progressFill19');
    const progressFill20 = document.getElementById('progressFill20');
    const progressFill21 = document.getElementById('progressFill21');
    const progressFill22 = document.getElementById('progressFill22');
    const progressFill23 = document.getElementById('progressFill23');
    const progressFill24 = document.getElementById('progressFill24');
    const progressFill25 = document.getElementById('progressFill25');
    const progressFill26 = document.getElementById('progressFill26');
    const progressFill27 = document.getElementById('progressFill27');
    const progressFill28 = document.getElementById('progressFill28');
    const progressFill29 = document.getElementById('progressFill29');
    const progressFill30 = document.getElementById('progressFill30');
    const progressFill31 = document.getElementById('progressFill31');
    
    const options4 = question4.querySelectorAll('.option');
    const options5 = document.querySelectorAll('#question5 .option');
    const options6 = document.querySelectorAll('#question6 .option');
    const options7 = document.querySelectorAll('#question7 .option');
    const options8 = document.querySelectorAll('#question8 .option');
    const options10 = document.querySelectorAll('#question10 .option');
    const options11 = document.querySelectorAll('#question11 .option');
    const options12 = document.querySelectorAll('#question12 .option');
    const options13 = document.querySelectorAll('#question13 .option');
    const options14 = document.querySelectorAll('#question14 .option');
    const options16 = document.querySelectorAll('#question16 .option');
    const options17 = document.querySelectorAll('#question17 .option');
    const options18 = document.querySelectorAll('#question18 .option');
    const options19 = document.querySelectorAll('#question19 .option');
    const options20 = document.querySelectorAll('#question20 .option');
    const options26 = document.querySelectorAll('#question26 .option');
    const options27 = document.querySelectorAll('#question27 .option');
    const options28 = document.querySelectorAll('#question28 .option');
    
    // Поля ввода
    const ageInput = document.getElementById('ageInput');
    const heightInput = document.getElementById('heightInput');
    const currentWeightInput = document.getElementById('currentWeightInput');
    const weightInput = document.getElementById('weightInput');
    const nameInput = document.getElementById('nameInput');
    
    // Элементы профиля
    const bmiValue = document.getElementById('bmiValue');
    const bmiMarker = document.getElementById('bmiMarker');
    const lifestyleText = document.getElementById('lifestyleText');
    const fitnessText = document.getElementById('fitnessText');
    const goalText = document.getElementById('goalText');
    
    let selectedOption1 = null;
    let selectedImage2 = null;
    let selectedOption4 = null;
    let selectedOption5 = null;
    let selectedOption6 = null;
    let selectedOption7 = null;
    let selectedOption8 = null;
    let selectedOption10 = null;
    let selectedOption11 = null;
    let selectedOption12 = null;
    let selectedOption13 = null;
    let selectedOption14 = null;
    let selectedOption16 = null;
    let selectedOption17 = null;
    let selectedOption18 = null;
    let selectedOption19 = null;
    let selectedOption20 = null;
    let selectedOption26 = null;
    let selectedOption27 = null;
    let selectedOption28 = null;
    
    // Значения полей ввода
    let userAge = null;
    let userHeight = null;
    let userCurrentWeight = null;
    let userTargetWeight = null;
    let userName = null;
    
    // Переменные для оплаты
    let stripe = null;
    let cardElement = null;
    
    // Карта соответствия вопросов и якорей
    const questionAnchors = {
        question1: 'goal',
        question2: 'sex',
        question3: 'info-1',
        question4: 'focus',
        question5: 'build',
        question6: 'body-goal',
        question7: 'target-zones',
        question8: 'experience',
        question9: 'info-2',
        question10: 'best-shape',
        question11: 'food-preferences',
        question12: 'cooking-style',
        question13: 'water-intake',
        question14: 'walking-frequency',
        question15: 'info-3',
        question16: 'work-schedule',
        question17: 'workout-frequency',
        question18: 'sleep-hours',
        question19: 'habits',
        question20: 'weight-gain-events',
        question21: 'age',
        question22: 'height',
        question23: 'current-weight',
        question24: 'target-weight',
        question25: 'name',
        question26: 'activity-level',
        question27: 'goal-speed',
        question28: 'additional-goals',
        question29: 'calorie-scanner-info',
        question30: 'chart-loading',
        question31: 'congratulations',
        question32: 'subscribe',
        'profile-screen': 'profile',
        'payment-screen': 'payment'
    };
    
    // Карта последовательности вопросов
    const questionSequence = [
        'goal', 'sex', 'info-1', 'focus', 'build', 'body-goal', 'target-zones',
        'experience', 'info-2', 'best-shape', 'food-preferences', 'cooking-style',
        'water-intake', 'walking-frequency', 'info-3', 'work-schedule',
        'workout-frequency', 'sleep-hours', 'habits', 'weight-gain-events',
        'age', 'height', 'current-weight', 'target-weight', 'name', 'profile',
        'activity-level', 'goal-speed', 'additional-goals', 'calorie-scanner-info',
        'chart-loading', 'congratulations', 'subscribe', 'payment'
    ];
    
    // Инициализация прогресс-бара
    progressFill1.style.width = '3.57%';
    progressFill2.style.width = '7.14%';
    progressFill3.style.width = '10.71%';
    progressFill4.style.width = '14.29%';
    progressFill5.style.width = '17.86%';
    progressFill6.style.width = '21.43%';
    progressFill7.style.width = '25%';
    progressFill8.style.width = '28.57%';
    progressFill9.style.width = '32.14%';
    progressFill10.style.width = '35.71%';
    progressFill11.style.width = '39.29%';
    progressFill12.style.width = '42.86%';
    progressFill13.style.width = '46.43%';
    progressFill14.style.width = '50%';
    progressFill15.style.width = '53.57%';
    progressFill16.style.width = '57.14%';
    progressFill17.style.width = '60.71%';
    progressFill18.style.width = '64.29%';
    progressFill19.style.width = '67.86%';
    progressFill20.style.width = '71.43%';
    progressFill21.style.width = '75%';
    progressFill22.style.width = '78.57%';
    progressFill23.style.width = '82.14%';
    progressFill24.style.width = '85.71%';
    progressFill25.style.width = '89.29%';
    progressFill26.style.width = '92.86%';
    progressFill27.style.width = '96.43%';
    progressFill28.style.width = '100%';
    
    // Обработчики для первого вопроса
    options1.forEach(option => {
        option.addEventListener('click', function() {
            // Убираем выделение со всех опций
            options1.forEach(opt => opt.classList.remove('selected'));
            
            // Выделяем выбранную опцию
            this.classList.add('selected');
            selectedOption1 = this.dataset.value;
            
            // Небольшая задержка для визуального эффекта, затем переход
            setTimeout(() => {
                console.log('Selected goal:', selectedOption1);
                
                // Отправляем событие в Mixpanel
                if (window.mixpanel) {
                    mixpanel.track('question_answered', {
                        question: 'goal',
                        answer: selectedOption1,
                        question_number: 1
                    });
                }
                
                // Переход ко второму вопросу
                goToNextQuestion(question1, question2, 'sex');
            }, 300);
        });
    });
    
    backBtn1.addEventListener('click', function() {
        console.log('Going back to previous question');
        alert('This is the first question');
    });
    
    // Обработчики для второго вопроса (картинки)
    images2.forEach(image => {
        image.addEventListener('click', function() {
            // Убираем выделение со всех картинок
            images2.forEach(img => img.classList.remove('selected'));
            
            // Выделяем выбранную картинку
            this.classList.add('selected');
            selectedImage2 = this.dataset.value;
            
            // Небольшая задержка для визуального эффекта, затем переход
            setTimeout(() => {
                console.log('Selected sex:', selectedImage2);
                
                // Отправляем событие в Mixpanel
                if (window.mixpanel) {
                    mixpanel.track('question_answered', {
                        question: 'sex',
                        answer: selectedImage2,
                        question_number: 2
                    });
                }
                
                // Переход к третьему вопросу
                goToNextQuestion(question2, question3, 'info-1');
            }, 300);
        });
    });
    
    backBtn2.addEventListener('click', function() {
        console.log('Going back to first question');
        // Возврат к первому вопросу
        goToPreviousQuestion(question2, question1, 'goal');
        
        // Сброс выбора во втором вопросе
        images2.forEach(img => img.classList.remove('selected'));
        selectedImage2 = null;
    });
    
    // Обработчики для третьего экрана
    continueBtn3.addEventListener('click', function() {
        console.log('Continuing from question 3');
        
        // Отправляем событие в Mixpanel
        if (window.mixpanel) {
            mixpanel.track('question_answered', {
                question: 'continue_3',
                answer: 'continue_clicked',
                question_number: 3
            });
        }
        
        // Переход к четвертому вопросу
        goToNextQuestion(question3, question4, 'focus');
    });
    
    backBtn3.addEventListener('click', function() {
        console.log('Going back to second question');
        // Возврат ко второму вопросу
        question3.style.display = 'none';
        question2.style.display = 'block';
    });
    
    // Обработчики для четвертого вопроса
    options4.forEach(option => {
        option.addEventListener('click', function() {
            // Убираем выделение со всех опций
            options4.forEach(opt => opt.classList.remove('selected'));
            
            // Выделяем выбранную опцию
            this.classList.add('selected');
            selectedOption4 = this.dataset.value;
            
            // Отправляем событие в Mixpanel
            if (window.mixpanel) {
                mixpanel.track('question_answered', {
                    question: 'workout_frequency',
                    answer: selectedOption4,
                    question_number: 4
                });
            }
            
            // Небольшая задержка для визуального эффекта, затем переход
            setTimeout(() => {
                console.log('Selected workout frequency:', selectedOption4);
                // Переход к пятому вопросу
                goToNextQuestion(question4, question5, 'build');
            }, 300);
        });
    });
    
    backBtn4.addEventListener('click', function() {
        console.log('Going back to third question');
        // Возврат к третьему вопросу
        goToPreviousQuestion(question4, question3, 'info-1');
        
        // Сброс выбора в четвертом вопросе
        options4.forEach(opt => opt.classList.remove('selected'));
        selectedOption4 = null;
    });
    
    // Обработчики для пятого вопроса
    options5.forEach(option => {
        option.addEventListener('click', function() {
            // Убираем выделение со всех опций
            options5.forEach(opt => opt.classList.remove('selected'));
            
            // Выделяем выбранную опцию
            this.classList.add('selected');
            selectedOption5 = this.dataset.value;
            
            // Отправляем событие в Mixpanel
            if (window.mixpanel) {
                mixpanel.track('question_answered', {
                    question: 'diet_preference',
                    answer: selectedOption5,
                    question_number: 5
                });
            }
            
            // Небольшая задержка для визуального эффекта, затем переход
            setTimeout(() => {
                console.log('Selected diet preference:', selectedOption5);
                // Переход к шестому вопросу
                goToNextQuestion(question5, question6, 'body-goal');
            }, 300);
        });
    });
    
    backBtn5.addEventListener('click', function() {
        console.log('Going back to fourth question');
        // Возврат к четвертому вопросу
        goToPreviousQuestion(question5, question4, 'focus');
        
        // Сброс выбора в пятом вопросе
        options5.forEach(opt => opt.classList.remove('selected'));
        selectedOption5 = null;
    });
    
    // Обработчики для шестого вопроса
    options6.forEach(option => {
        option.addEventListener('click', function() {
            // Убираем выделение со всех опций
            options6.forEach(opt => opt.classList.remove('selected'));
            
            // Выделяем выбранную опцию
            this.classList.add('selected');
            selectedOption6 = this.dataset.value;
            
            // Отправляем событие в Mixpanel
            if (window.mixpanel) {
                mixpanel.track('question_answered', {
                    question: 'cooking_skill',
                    answer: selectedOption6,
                    question_number: 6
                });
            }
            
            // Небольшая задержка для визуального эффекта, затем переход
            setTimeout(() => {
                console.log('Selected cooking skill:', selectedOption6);
                // Переход к седьмому вопросу
                goToNextQuestion(question6, question7, 'target-zones');
            }, 300);
        });
    });
    
    backBtn6.addEventListener('click', function() {
        console.log('Going back to fifth question');
        // Возврат к пятому вопросу
        question6.style.display = 'none';
        question5.style.display = 'block';
        
        // Сброс выбора в шестом вопросе
        options6.forEach(opt => opt.classList.remove('selected'));
        selectedOption6 = null;
    });
    
    // Обработчики для седьмого вопроса (множественный выбор)
    options7.forEach(option => {
        const checkbox = option.querySelector('input[type="checkbox"]');
        
        // Обработчик клика по чекбоксу
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                option.classList.add('selected');
            } else {
                option.classList.remove('selected');
            }
            
            // Обновляем выбранные опции
            const selectedOptions7 = Array.from(options7)
                .filter(opt => opt.classList.contains('selected'))
                .map(opt => opt.dataset.value);
            
            selectedOption7 = selectedOptions7;
            
            // Показываем/скрываем кнопку Continue в зависимости от выбора
            if (selectedOptions7.length > 0) {
                continueBtn7.style.display = 'block';
            } else {
                continueBtn7.style.display = 'none';
            }
            
            console.log('Selected options 7:', selectedOptions7);
        });
        
        // Обработчик клика по всей ячейке (опционально)
        option.addEventListener('click', function(e) {
            // Если клик не по чекбоксу, переключаем его
            if (e.target !== checkbox && e.target !== checkbox.nextElementSibling) {
                checkbox.checked = !checkbox.checked;
                checkbox.dispatchEvent(new Event('change'));
            }
        });
    });
    
    // Обработчик для кнопки Continue в седьмом вопросе
    continueBtn7.addEventListener('click', function() {
        if (selectedOption7 && selectedOption7.length > 0) {
            console.log('Continuing to eighth question');
            
            // Отправляем событие в Mixpanel
            if (window.mixpanel) {
                mixpanel.track('question_answered', {
                    question: 'meal_preferences',
                    answer: selectedOption7,
                    question_number: 7
                });
            }
            
            // Переход к восьмому вопросу
            question7.style.display = 'none';
            question8.style.display = 'block';
        }
    });
    
    backBtn7.addEventListener('click', function() {
        console.log('Going back to sixth question');
        // Возврат к шестому вопросу
        question7.style.display = 'none';
        question6.style.display = 'block';
        
        // Сброс выбора в седьмом вопросе
        options7.forEach(opt => {
            opt.classList.remove('selected');
            const checkbox = opt.querySelector('input[type="checkbox"]');
            if (checkbox) {
                checkbox.checked = false;
            }
        });
        selectedOption7 = null;
        continueBtn7.style.display = 'none';
    });
    
    // Обработчики для восьмого вопроса
    options8.forEach(option => {
        option.addEventListener('click', function() {
            // Убираем выделение со всех опций
            options8.forEach(opt => opt.classList.remove('selected'));
            
            // Выделяем выбранную опцию
            this.classList.add('selected');
            selectedOption8 = this.dataset.value;
            
            // Отправляем событие в Mixpanel
            if (window.mixpanel) {
                mixpanel.track('question_answered', {
                    question: 'time_availability',
                    answer: selectedOption8,
                    question_number: 8
                });
            }
            
            // Небольшая задержка для визуального эффекта
            setTimeout(() => {
                console.log('Selected option 8:', selectedOption8);
                // Переход к девятому экрану
                question8.style.display = 'none';
                question9.style.display = 'block';
                
                // Запускаем автоматическую загрузку
                startLoading();
            }, 300);
        });
    });
    
    // Функция автоматической загрузки
    function startLoading() {
        // Сбрасываем полосу загрузки
        loadingFill.style.width = '0%';
        
        // Запускаем анимацию загрузки
        setTimeout(() => {
            loadingFill.style.width = '100%';
        }, 100);
        
        // Через 3 секунды переходим к следующему вопросу
        setTimeout(() => {
            console.log('Loading completed, moving to next question');
            // Переход к десятому вопросу
            question9.style.display = 'none';
            question10.style.display = 'block';
        }, 3000);
    }
    
    backBtn8.addEventListener('click', function() {
        console.log('Going back to seventh question');
        // Возврат к седьмому вопросу
        question8.style.display = 'none';
        question7.style.display = 'block';
        
        // Сброс выбора в восьмом вопросе
        options8.forEach(opt => opt.classList.remove('selected'));
        selectedOption8 = null;
    });
    
    // Обработчик для девятого экрана (только кнопка назад)
    backBtn9.addEventListener('click', function() {
        console.log('Going back to eighth question');
        // Возврат к восьмому вопросу
        question9.style.display = 'none';
        question8.style.display = 'block';
    });
    
    // Обработчики для десятого вопроса
    options10.forEach(option => {
        option.addEventListener('click', function() {
            // Убираем выделение со всех опций
            options10.forEach(opt => opt.classList.remove('selected'));
            
            // Выделяем выбранную опцию
            this.classList.add('selected');
            selectedOption10 = this.dataset.value;
            
            // Отправляем событие в Mixpanel
            if (window.mixpanel) {
                mixpanel.track('question_answered', {
                    question: 'health_conditions',
                    answer: selectedOption10,
                    question_number: 10
                });
            }
            
            // Небольшая задержка для визуального эффекта, затем переход
            setTimeout(() => {
                console.log('Selected health condition:', selectedOption10);
                // Переход к одиннадцатому вопросу
                question10.style.display = 'none';
                question11.style.display = 'block';
            }, 300);
        });
    });
    
    backBtn10.addEventListener('click', function() {
        console.log('Going back to ninth question');
        // Возврат к девятому экрану
        question10.style.display = 'none';
        question9.style.display = 'block';
        
        // Сброс выбора в десятом вопросе
        options10.forEach(opt => opt.classList.remove('selected'));
        selectedOption10 = null;
    });
    
    // Обработчики для одиннадцатого вопроса
    options11.forEach(option => {
        option.addEventListener('click', function() {
            // Убираем выделение со всех опций
            options11.forEach(opt => opt.classList.remove('selected'));
            
            // Выделяем выбранную опцию
            this.classList.add('selected');
            selectedOption11 = this.dataset.value;
            
            // Отправляем событие в Mixpanel
            if (window.mixpanel) {
                mixpanel.track('question_answered', {
                    question: 'allergies',
                    answer: selectedOption11,
                    question_number: 11
                });
            }
            
            // Небольшая задержка для визуального эффекта, затем переход
            setTimeout(() => {
                console.log('Selected allergy:', selectedOption11);
                // Переход к двенадцатому вопросу
                question11.style.display = 'none';
                question12.style.display = 'block';
            }, 300);
        });
    });
    
    backBtn11.addEventListener('click', function() {
        console.log('Going back to tenth question');
        // Возврат к десятому вопросу
        question11.style.display = 'none';
        question10.style.display = 'block';
        
        // Сброс выбора в одиннадцатом вопросе
        options11.forEach(opt => opt.classList.remove('selected'));
        selectedOption11 = null;
    });
    
    // Обработчики для двенадцатого вопроса
    options12.forEach(option => {
        option.addEventListener('click', function() {
            // Убираем выделение со всех опций
            options12.forEach(opt => opt.classList.remove('selected'));
            
            // Выделяем выбранную опцию
            this.classList.add('selected');
            selectedOption12 = this.dataset.value;
            
            // Отправляем событие в Mixpanel
            if (window.mixpanel) {
                mixpanel.track('question_answered', {
                    question: 'supplements',
                    answer: selectedOption12,
                    question_number: 12
                });
            }
            
            // Небольшая задержка для визуального эффекта, затем переход
            setTimeout(() => {
                console.log('Selected supplement:', selectedOption12);
                // Переход к тринадцатому вопросу
                question12.style.display = 'none';
                question13.style.display = 'block';
            }, 300);
        });
    });
    
    backBtn12.addEventListener('click', function() {
        console.log('Going back to eleventh question');
        // Возврат к одиннадцатому вопросу
        question12.style.display = 'none';
        question11.style.display = 'block';
        
        // Сброс выбора в двенадцатом вопросе
        options12.forEach(opt => opt.classList.remove('selected'));
        selectedOption12 = null;
    });
    
    // Обработчики для тринадцатого вопроса
    options13.forEach(option => {
        option.addEventListener('click', function() {
            // Убираем выделение со всех опций
            options13.forEach(opt => opt.classList.remove('selected'));
            
            // Выделяем выбранную опцию
            this.classList.add('selected');
            selectedOption13 = this.dataset.value;
            
            // Отправляем событие в Mixpanel
            if (window.mixpanel) {
                mixpanel.track('question_answered', {
                    question: 'sleep_quality',
                    answer: selectedOption13,
                    question_number: 13
                });
            }
            
            // Небольшая задержка для визуального эффекта, затем переход
            setTimeout(() => {
                console.log('Selected sleep quality:', selectedOption13);
                // Переход к четырнадцатому вопросу
                question13.style.display = 'none';
                question14.style.display = 'block';
            }, 300);
        });
    });
    
    backBtn13.addEventListener('click', function() {
        console.log('Going back to twelfth question');
        // Возврат к двенадцатому вопросу
        question13.style.display = 'none';
        question12.style.display = 'block';
        
        // Сброс выбора в тринадцатом вопросе
        options13.forEach(opt => opt.classList.remove('selected'));
        selectedOption13 = null;
    });
    
    // Обработчики для четырнадцатого вопроса
    options14.forEach(option => {
        option.addEventListener('click', function() {
            // Убираем выделение со всех опций
            options14.forEach(opt => opt.classList.remove('selected'));
            
            // Выделяем выбранную опцию
            this.classList.add('selected');
            selectedOption14 = this.dataset.value;
            
            // Отправляем событие в Mixpanel
            if (window.mixpanel) {
                mixpanel.track('question_answered', {
                    question: 'stress_level',
                    answer: selectedOption14,
                    question_number: 14
                });
            }
            
            // Небольшая задержка для визуального эффекта, затем переход
            setTimeout(() => {
                console.log('Selected stress level:', selectedOption14);
                // Переход к пятнадцатому вопросу
                question14.style.display = 'none';
                question15.style.display = 'block';
                
                // Запускаем автоматическую загрузку
                startLoading15();
            }, 300);
        });
    });
    
    backBtn14.addEventListener('click', function() {
        console.log('Going back to thirteenth question');
        // Возврат к четырнадцатому вопросу
        question14.style.display = 'none';
        question13.style.display = 'block';
        
        // Сброс выбора в четырнадцатом вопросе
        options14.forEach(opt => opt.classList.remove('selected'));
        selectedOption14 = null;
    });
    
    // Обработчики для шестнадцатого вопроса
    options16.forEach(option => {
        option.addEventListener('click', function() {
            // Убираем выделение со всех опций
            options16.forEach(opt => opt.classList.remove('selected'));
            
            // Выделяем выбранную опцию
            this.classList.add('selected');
            selectedOption16 = this.dataset.value;
            
            // Отправляем событие в Mixpanel
            if (window.mixpanel) {
                mixpanel.track('question_answered', {
                    question: 'motivation',
                    answer: selectedOption16,
                    question_number: 16
                });
            }
            
            // Небольшая задержка для визуального эффекта, затем переход
            setTimeout(() => {
                console.log('Selected motivation:', selectedOption16);
                // Переход к семнадцатому вопросу
                question16.style.display = 'none';
                question17.style.display = 'block';
            }, 300);
        });
    });
    
    backBtn16.addEventListener('click', function() {
        console.log('Going back to fifteenth question');
        // Возврат к пятнадцатому экрану
        question16.style.display = 'none';
        question15.style.display = 'block';
        
        // Сброс выбора в шестнадцатом вопросе
        options16.forEach(opt => opt.classList.remove('selected'));
        selectedOption16 = null;
    });
    
    // Обработчики для семнадцатого вопроса
    options17.forEach(option => {
        option.addEventListener('click', function() {
            // Убираем выделение со всех опций
            options17.forEach(opt => opt.classList.remove('selected'));
            
            // Выделяем выбранную опцию
            this.classList.add('selected');
            selectedOption17 = this.dataset.value;
            
            // Отправляем событие в Mixpanel
            if (window.mixpanel) {
                mixpanel.track('question_answered', {
                    question: 'workout_frequency',
                    answer: selectedOption17,
                    question_number: 17
                });
            }
            
            // Небольшая задержка для визуального эффекта, затем переход
            setTimeout(() => {
                console.log('Selected workout frequency:', selectedOption17);
                // Переход к восемнадцатому вопросу
                question17.style.display = 'none';
                question18.style.display = 'block';
            }, 300);
        });
    });
    
    // Обработчики для восемнадцатого вопроса
    options18.forEach(option => {
        option.addEventListener('click', function() {
            // Убираем выделение со всех опций
            options18.forEach(opt => opt.classList.remove('selected'));
            
            // Выделяем выбранную опцию
            this.classList.add('selected');
            selectedOption18 = this.dataset.value;
            
            // Отправляем событие в Mixpanel
            if (window.mixpanel) {
                mixpanel.track('question_answered', {
                    question: 'workout_duration',
                    answer: selectedOption18,
                    question_number: 18
                });
            }
            
            // Небольшая задержка для визуального эффекта, затем переход
            setTimeout(() => {
                console.log('Selected workout duration:', selectedOption18);
                // Переход к девятнадцатому вопросу
                question18.style.display = 'none';
                question19.style.display = 'block';
            }, 300);
        });
    });
    
    // Обработчики для девятнадцатого вопроса
    options19.forEach(option => {
        option.addEventListener('click', function() {
            // Убираем выделение со всех опций
            options19.forEach(opt => opt.classList.remove('selected'));
            
            // Выделяем выбранную опцию
            this.classList.add('selected');
            selectedOption19 = this.dataset.value;
            
            // Отправляем событие в Mixpanel
            if (window.mixpanel) {
                mixpanel.track('question_answered', {
                    question: 'habits',
                    answer: selectedOption19,
                    question_number: 19
                });
            }
            
            // Небольшая задержка для визуального эффекта, затем переход
            setTimeout(() => {
                console.log('Selected habit:', selectedOption19);
                // Переход к двадцатому вопросу
                question19.style.display = 'none';
                question20.style.display = 'block';
            }, 300);
        });
    });
    
    // Обработчики для двадцатого вопроса
    options20.forEach(option => {
        option.addEventListener('click', function() {
            // Убираем выделение со всех опций
            options20.forEach(opt => opt.classList.remove('selected'));
            
            // Выделяем выбранную опцию
            this.classList.add('selected');
            selectedOption20 = this.dataset.value;
            
            // Отправляем событие в Mixpanel
            if (window.mixpanel) {
                mixpanel.track('question_answered', {
                    question: 'preferences',
                    answer: selectedOption20,
                    question_number: 20
                });
            }
            
            // Небольшая задержка для визуального эффекта, затем переход
            setTimeout(() => {
                console.log('Selected preference:', selectedOption20);
                // Переход к двадцать первому вопросу
                question20.style.display = 'none';
                question21.style.display = 'block';
            }, 300);
        });
    });
    
    // Обработчики для двадцать первого экрана (только кнопка назад)
    backBtn15.addEventListener('click', function() {
        console.log('Going back to fourteenth question');
        // Возврат к четырнадцатому вопросу
        question15.style.display = 'none';
        question14.style.display = 'block';
    });
    
    // Обработчики для шестнадцатого экрана (только кнопка назад)
    backBtn16.addEventListener('click', function() {
        console.log('Going back to fifteenth question');
        // Возврат к пятнадцатому экрану
        question16.style.display = 'none';
        question15.style.display = 'block';
    });
    
    // Обработчики для семнадцатого экрана (только кнопка назад)
    backBtn17.addEventListener('click', function() {
        console.log('Going back to sixteenth question');
        // Возврат к шестнадцатому экрану
        question17.style.display = 'none';
        question16.style.display = 'block';
    });
    
    // Обработчики для восемнадцатого экрана (только кнопка назад)
    backBtn18.addEventListener('click', function() {
        console.log('Going back to seventeenth question');
        // Возврат к семнадцатому экрану
        question18.style.display = 'none';
        question17.style.display = 'block';
    });
    
    // Обработчики для девятнадцатого экрана (только кнопка назад)
    backBtn19.addEventListener('click', function() {
        console.log('Going back to eighteenth question');
        // Возврат к восемнадцатому экрану
        question19.style.display = 'none';
        question18.style.display = 'block';
    });
    
    // Обработчики для двадцатого экрана (только кнопка назад)
    backBtn20.addEventListener('click', function() {
        console.log('Going back to nineteenth question');
        // Возврат к девятнадцатому экрану
        question20.style.display = 'none';
        question19.style.display = 'block';
    });
    
    // Обработчики для двадцать первого экрана (только кнопка назад)
    backBtn21.addEventListener('click', function() {
        console.log('Going back to twentieth question');
        // Возврат к двадцатому экрану
        question21.style.display = 'none';
        question20.style.display = 'block';
    });
    
    // Обработчики для двадцать второго экрана (только кнопка назад)
    backBtn22.addEventListener('click', function() {
        console.log('Going back to twenty-first question');
        // Возврат к двадцать первому экрану
        question22.style.display = 'none';
        question21.style.display = 'block';
    });
    
    // Обработчики для двадцать третьего экрана (только кнопка назад)
    backBtn23.addEventListener('click', function() {
        console.log('Going back to twenty-second question');
        // Возврат к двадцать второму экрану
        question23.style.display = 'none';
        question22.style.display = 'block';
    });
    
    // Обработчики для двадцать четвертого экрана (только кнопка назад)
    backBtn24.addEventListener('click', function() {
        console.log('Going back to twenty-third question');
        // Возврат к двадцать третьему экрану
        question24.style.display = 'none';
        question23.style.display = 'block';
    });
    
    // Функции для получения текста вариантов
    function getOptionText1(value) {
        const optionTexts = {
            'lose-1-10': 'Lose 1-10 kg',
            'lose-11-20': 'Lose 11-20 kg',
            'lose-20-plus': 'Lose 20+ kg',
            'gain-muscle': 'Gain muscle',
            'maintain': 'Maintain current weight',
            'undecided': 'I haven\'t decided yet'
        };
        return optionTexts[value] || 'Unknown';
    }
    
    function getOptionText2(value) {
        const optionTexts = {
            'female': 'Female',
            'male': 'Male'
        };
        return optionTexts[value] || 'Unknown';
    }

    // Функция автоматической загрузки для пятнадцатого экрана
    function startLoading15() {
        // Сбрасываем полосу загрузки
        loadingFill15.style.width = '0%';
        
        // Запускаем анимацию загрузки с небольшой задержкой для плавности
        setTimeout(() => {
            loadingFill15.style.width = '100%';
        }, 200);
        
        // Через 3 секунды переходим к следующему экрану
        setTimeout(() => {
            console.log('Loading 15 completed, moving to next screen');
            // Переход к шестнадцатому экрану
            question15.style.display = 'none';
            question16.style.display = 'block';
        }, 3000);
    }
    


    // Обработчики для двадцать первого вопроса (возраст)
    continueBtn21.addEventListener('click', function() {
        const age = ageInput.value.trim();
        if (age && age >= 13 && age <= 120) {
            userAge = parseInt(age);
            console.log('User age:', userAge);
            // Переход к двадцать второму вопросу (рост)
            question21.style.display = 'none';
            question22.style.display = 'block';
        } else {
            alert('Please enter a valid age between 13 and 120');
        }
    });
    
    // Обработчики для двадцать второго вопроса (возраст)
    continueBtn22.addEventListener('click', function() {
        const age = ageInput.value.trim();
        if (age && age >= 13 && age <= 100) {
            userAge = parseInt(age);
            console.log('User age:', userAge);
            
            // Отправляем событие в Mixpanel
            if (window.mixpanel) {
                mixpanel.track('question_answered', {
                    question: 'age',
                    answer: userAge,
                    question_number: 22
                });
            }
            
            // Переход к вопросу о росте
            question22.style.display = 'none';
            question23.style.display = 'block';
        } else {
            alert('Please enter a valid age between 13 and 100');
        }
    });
    
    // Обработчики для двадцать второго вопроса (рост)
    continueBtn22.addEventListener('click', function() {
        const height = heightInput.value.trim();
        if (height && height >= 140 && height <= 220) {
            userHeight = parseInt(height);
            console.log('User height:', userHeight);
            // Переход к двадцать третьему вопросу (текущий вес)
            question22.style.display = 'none';
            question23.style.display = 'block';
        } else {
            alert('Please enter a valid height between 140 cm and 220 cm');
        }
    });
    
    // Обработчики для двадцать третьего вопроса (текущий вес)
    continueBtn23.addEventListener('click', function() {
        const currentWeight = currentWeightInput.value.trim();
        if (currentWeight && currentWeight >= 35 && currentWeight <= 190) {
            userCurrentWeight = parseInt(currentWeight);
            console.log('User current weight:', userCurrentWeight);
            
            // Отправляем событие в Mixpanel
            if (window.mixpanel) {
                mixpanel.track('question_answered', {
                    question: 'current_weight',
                    answer: userCurrentWeight,
                    question_number: 23
                });
            }
            
            // Переход к двадцать четвертому вопросу (целевой вес)
            question23.style.display = 'none';
            question24.style.display = 'block';
        } else {
            alert('Please enter a valid current weight between 35 kg and 190 kg');
        }
    });
    
    // Обработчики для двадцать четвертого вопроса (целевой вес)
    continueBtn24.addEventListener('click', function() {
        const weight = weightInput.value.trim();
        if (weight && weight >= 35 && weight <= 190) {
            userTargetWeight = parseInt(weight);
            console.log('User target weight:', userTargetWeight);
            
            // Отправляем событие в Mixpanel
            if (window.mixpanel) {
                mixpanel.track('question_answered', {
                    question: 'target_weight',
                    answer: userTargetWeight,
                    question_number: 24
                });
            }
            
            // Переход к двадцать пятому вопросу (имя)
            question24.style.display = 'none';
            question25.style.display = 'block';
        } else {
            alert('Please enter a valid weight between 35 kg and 190 kg');
        }
    });
    
    // Обработчики для двадцать пятого вопроса (имя)
    continueBtn25.addEventListener('click', function() {
        const name = nameInput.value.trim();
        console.log('continueBtn25 clicked, name:', name);
        
        if (name && name.length >= 2) {
            userName = name;
            console.log('User name set:', userName);
            console.log('Current user data:', {
                age: userAge,
                height: userHeight,
                currentWeight: userCurrentWeight,
                targetWeight: userTargetWeight,
                sex: selectedImage2
            });
            
            // Отправляем событие в Mixpanel
            if (window.mixpanel) {
                mixpanel.track('question_answered', {
                    question: 'name',
                    answer: userName,
                    question_number: 25
                });
            }
            
            // Переход к экрану профиля
            question25.style.display = 'none';
            profileScreen.style.display = 'block';
            
            // Показываем профиль пользователя
            showUserProfile();
        } else {
            alert('Please enter your first name (at least 2 characters)');
        }
    });
    
    // Обработчики кнопок назад для новых вопросов
    backBtn22.addEventListener('click', function() {
        console.log('Going back to age question');
        question22.style.display = 'none';
        question21.style.display = 'block';
        heightInput.value = '';
        userHeight = null;
    });
    
    backBtn23.addEventListener('click', function() {
        console.log('Going back to height question');
        question23.style.display = 'none';
        question22.style.display = 'block';
        currentWeightInput.value = '';
        userCurrentWeight = null;
    });
    
    backBtn24.addEventListener('click', function() {
        console.log('Going back to current weight question');
        question24.style.display = 'none';
        question23.style.display = 'block';
        weightInput.value = '';
        userTargetWeight = null;
    });
    
    backBtn25.addEventListener('click', function() {
        console.log('Going back to target weight question');
        question25.style.display = 'none';
        question24.style.display = 'block';
        nameInput.value = '';
        userName = null;
    });
    
    // Обработчик для кнопки Continue на экране профиля
    continueProfileBtn.addEventListener('click', function() {
        console.log('Continuing from profile to activity level question');
        profileScreen.style.display = 'none';
        question26.style.display = 'block';
    });
    
    // Обработчики для двадцать шестого вопроса (уровень активности)
    options26.forEach(option => {
        option.addEventListener('click', function() {
            // Убираем выделение со всех опций
            options26.forEach(opt => opt.classList.remove('selected'));
            
            // Выделяем выбранную опцию
            this.classList.add('selected');
            selectedOption26 = this.dataset.value;
            
            // Отправляем событие в Mixpanel
            if (window.mixpanel) {
                mixpanel.track('question_answered', {
                    question: 'activity_level',
                    answer: selectedOption26,
                    question_number: 26
                });
            }
            
            // Небольшая задержка для визуального эффекта
            setTimeout(() => {
                console.log('Selected activity level:', selectedOption26);
                // Переход к двадцать седьмому вопросу
                question26.style.display = 'none';
                question27.style.display = 'block';
            }, 300);
        });
    });
    
    backBtn26.addEventListener('click', function() {
        console.log('Going back to profile screen');
        question26.style.display = 'none';
        profileScreen.style.display = 'block';
    });
    
    // Обработчики для двадцать седьмого вопроса (скорость достижения цели)
    options27.forEach(option => {
        option.addEventListener('click', function() {
            // Убираем выделение со всех опций
            options27.forEach(opt => opt.classList.remove('selected'));
            
            // Выделяем выбранную опцию
            this.classList.add('selected');
            selectedOption27 = this.dataset.value;
            
            // Отправляем событие в Mixpanel
            if (window.mixpanel) {
                mixpanel.track('question_answered', {
                    question: 'goal_speed',
                    answer: selectedOption27,
                    question_number: 27
                });
            }
            
            // Небольшая задержка для визуального эффекта
            setTimeout(() => {
                console.log('Selected goal speed:', selectedOption27);
                // Переход к двадцать восьмому вопросу
                question27.style.display = 'none';
                question28.style.display = 'block';
            }, 300);
        });
    });
    
    backBtn27.addEventListener('click', function() {
        console.log('Going back to activity level question');
        question27.style.display = 'none';
        question26.style.display = 'block';
        options27.forEach(opt => opt.classList.remove('selected'));
        selectedOption27 = null;
    });
    
    // Обработчики для двадцать восьмого вопроса (дополнительные цели)
    options28.forEach(option => {
        option.addEventListener('click', function() {
            // Убираем выделение со всех опций
            options28.forEach(opt => opt.classList.remove('selected'));
            
            // Выделяем выбранную опцию
            this.classList.add('selected');
            selectedOption28 = this.dataset.value;
            
            // Отправляем событие в Mixpanel
            if (window.mixpanel) {
                mixpanel.track('question_answered', {
                    question: 'additional_goals',
                    answer: selectedOption28,
                    question_number: 28
                });
            }
            
            // Небольшая задержка для визуального эффекта
            setTimeout(() => {
                console.log('Selected additional goal:', selectedOption28);
                // Переход к вопросу о Calorie Scanner AI
                question28.style.display = 'none';
                question29.style.display = 'block';
            }, 300);
        });
    });
    
    backBtn28.addEventListener('click', function() {
        console.log('Going back to goal speed question');
        question28.style.display = 'none';
        question27.style.display = 'block';
        options28.forEach(opt => opt.classList.remove('selected'));
        selectedOption28 = null;
    });
    
    // Обработчики для двадцать девятого вопроса (Calorie Scanner AI)
    continueBtn29.addEventListener('click', function() {
        console.log('Continuing from Calorie Scanner AI question');
        // Переход к экрану загрузки диаграммы
        question29.style.display = 'none';
        question30.style.display = 'block';
        
        // Запускаем загрузку диаграммы
        startChartLoading();
    });
    
    backBtn29.addEventListener('click', function() {
        console.log('Going back to additional goals question');
        question29.style.display = 'none';
        question28.style.display = 'block';
    });
    
    // Функция загрузки диаграммы
    function startChartLoading() {
        const chartLoadingFill = document.getElementById('chartLoadingFill');
        const chartLoadingPercentage = document.getElementById('chartLoadingPercentage');
        
        // Сбрасываем полосу загрузки
        chartLoadingFill.style.width = '0%';
        chartLoadingPercentage.textContent = '0%';
        
        let progress = 0;
        const interval = setInterval(() => {
            progress += 2.5; // 4 секунды = 100% / 40 интервалов
            chartLoadingFill.style.width = progress + '%';
            chartLoadingPercentage.textContent = Math.round(progress) + '%';
            
            if (progress >= 100) {
                clearInterval(interval);
                // Через небольшую задержку переходим к экрану поздравления
                setTimeout(() => {
                    question30.style.display = 'none';
                    question31.style.display = 'block';
                }, 1000);
            }
        }, 100); // Обновляем каждые 100мс для плавности
    }
    
    // Обработчики для экрана загрузки диаграммы (только кнопка назад)
    backBtn30.addEventListener('click', function() {
        console.log('Going back to Calorie Scanner AI question');
        question30.style.display = 'none';
        question29.style.display = 'block';
    });
    
    // Обработчики для экрана поздравления (только кнопка назад)
    backBtn31.addEventListener('click', function() {
        console.log('Going back to chart loading screen');
        question31.style.display = 'none';
        question30.style.display = 'block';
    });
    
    // Обработчик для кнопки Continue на экране поздравления
    const continueBtn31 = document.getElementById('continueBtn31');
    continueBtn31.addEventListener('click', function() {
        console.log('Continuing to nutrition plans screen');
        question31.style.display = 'none';
        question32.style.display = 'block';
        
        // Отображаем информацию о пользователе
        displayUserInfoOnSubscription();
    });
    
    // Функция отображения информации о пользователе на экране подписки
    function displayUserInfoOnSubscription() {
        // Отображаем возраст
        const userAgeDisplay = document.getElementById('userAgeDisplay');
        if (userAgeDisplay) {
            userAgeDisplay.textContent = userAge ? `${userAge} years` : 'Not specified';
        }
        
        // Отображаем рост
        const userHeightDisplay = document.getElementById('userHeightDisplay');
        if (userHeightDisplay) {
            userHeightDisplay.textContent = userHeight ? `${userHeight} cm` : 'Not specified';
        }
        
        // Отображаем целевой вес
        const userTargetWeightDisplay = document.getElementById('userTargetWeightDisplay');
        if (userTargetWeightDisplay) {
            userTargetWeightDisplay.textContent = userTargetWeight ? `${userTargetWeight} kg` : 'Not specified';
        }
        
        // Отображаем ИМТ
        const userBMIDisplay = document.getElementById('userBMIDisplay');
        if (userBMIDisplay && userCurrentWeight && userHeight) {
            const bmi = calculateBMI(userCurrentWeight, userHeight);
            userBMIDisplay.textContent = bmi.toFixed(1);
        }
    }
    
    // Обработчики для экрана с планами питания
    // backBtn32 был удален из HTML
    
    // Обработчики для выбора планов питания
    const planCards = document.querySelectorAll('.plan-card');
    let selectedPlan = '1-week'; // По умолчанию выбран недельный план
    
    planCards.forEach(card => {
        card.addEventListener('click', function() {
            // Убираем выделение со всех планов
            planCards.forEach(plan => plan.classList.remove('selected'));
            
            // Выделяем выбранный план
            this.classList.add('selected');
            selectedPlan = this.dataset.value;
            
            console.log('Selected plan:', selectedPlan);
        });
    });
    
    // Обработчики для модального окна подписки
    const subscribeModal = document.getElementById('subscribeModal');
    const emailInput = document.getElementById('emailInput');
    const subscribeBtn = document.getElementById('subscribeBtn');
    const cancelSubscribeBtn = document.getElementById('cancelSubscribeBtn');
    const submitSubscribeBtn = document.getElementById('submitSubscribeBtn');

    subscribeBtn.addEventListener('click', function() {
        console.log('Opening payment screen for plan:', selectedPlan);
        
        // Отправляем событие в Mixpanel
        if (window.mixpanel) {
            mixpanel.track('payment_screen_opened', {
                plan: selectedPlan,
                plan_name: document.querySelector('.plan-card.selected .plan-name').textContent
            });
        }
        
        // Показываем экран оплаты
        goToNextQuestion(question32, paymentScreen, 'payment');
        
        // Обновляем информацию о выбранном плане
        updatePaymentScreen();
    });
    
    cancelSubscribeBtn.addEventListener('click', function() {
        console.log('Closing subscribe modal');
        subscribeModal.style.display = 'none';
        emailInput.value = '';
    });
    
    submitSubscribeBtn.addEventListener('click', function() {
        const email = emailInput.value.trim();
        if (email && isValidEmail(email)) {
            console.log('Submitting email:', email);
            
            // Отправляем событие в Mixpanel
            if (window.mixpanel) {
                mixpanel.track('email_submitted', {
                    email: email,
                    plan: selectedPlan,
                    plan_name: document.querySelector('.plan-card.selected .plan-name').textContent
                });
            }
            
            // Отправляем событие purchase в Facebook Pixel
            if (window.fbq) {
                fbq('track', 'Purchase', {
                    value: getPlanPrice(selectedPlan),
                    currency: 'USD',
                    content_name: document.querySelector('.plan-card.selected .plan-name').textContent,
                    content_category: 'nutrition_plan'
                });
            }
            
            // Здесь можно добавить логику отправки плана
            alert('Thank you! Your nutrition plan has been sent to ' + email);
            subscribeModal.style.display = 'none';
            emailInput.value = '';
        } else {
            alert('Please enter a valid email address');
        }
    });
    
    // Закрытие модального окна при клике вне его
    subscribeModal.addEventListener('click', function(e) {
        if (e.target === subscribeModal) {
            subscribeModal.style.display = 'none';
            emailInput.value = '';
        }
    });
    
    // Функция валидации email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Функция показа профиля пользователя
    function showUserProfile() {
        console.log('showUserProfile called');
        console.log('userAge:', userAge);
        console.log('userHeight:', userHeight);
        console.log('userCurrentWeight:', userCurrentWeight);
        console.log('selectedImage2:', selectedImage2);
        
        // Проверяем, что все необходимые данные есть
        if (!userAge || !userHeight || !userCurrentWeight || !selectedImage2) {
            console.error('Missing required data for profile');
            return;
        }
        
        // Рассчитываем ИМТ
        const bmi = calculateBMI(userCurrentWeight, userHeight);
        console.log('Calculated BMI:', bmi);
        
        // Отображаем ИМТ
        if (bmiValue) {
            bmiValue.textContent = bmi.toFixed(1);
        } else {
            console.error('bmiValue element not found');
        }
        
        // Позиционируем маркер на шкале
        if (bmiMarker) {
            positionBMIMarker(bmi);
        } else {
            console.error('bmiMarker element not found');
        }
        
        // Показываем риски здоровья
        showHealthRisks(bmi);
        
        // Заполняем панельки профиля
        fillProfilePanels();
        
        // Меняем картинку в зависимости от пола
        changeProfileImage();
        
        console.log('Profile display completed');
    }
    
    // Функция расчета ИМТ
    function calculateBMI(weight, height) {
        // ИМТ = вес (кг) / (рост (м))²
        const heightInMeters = height / 100;
        return weight / (heightInMeters * heightInMeters);
    }
    
    // Функция позиционирования маркера ИМТ на шкале
    function positionBMIMarker(bmi) {
        let position;
        if (bmi < 18.5) {
            position = (bmi / 18.5) * 25; // 0-25%
        } else if (bmi < 25) {
            position = 25 + ((bmi - 18.5) / (25 - 18.5)) * 25; // 25-50%
        } else if (bmi < 30) {
            position = 50 + ((bmi - 25) / (30 - 25)) * 25; // 50-75%
        } else {
            position = 75 + Math.min((bmi - 30) / 10, 1) * 25; // 75-100%
        }
        
        bmiMarker.style.left = `${position}%`;
    }
    
    // Функция показа рисков здоровья
    function showHealthRisks(bmi) {
        const risksSection = document.querySelector('.risks-section');
        const riskText = document.querySelector('.risk-text');
        
        // Убираем старые классы
        riskText.className = 'risk-text';
        
        if (bmi < 18.5) {
            riskText.textContent = 'Underweight: Increased risk of nutritional deficiencies and weakened immune system.';
            riskText.className = 'risk-text warning';
            risksSection.style.backgroundColor = '#fff3cd';
        } else if (bmi < 25) {
            riskText.textContent = 'Optimal health range. Maintain current lifestyle.';
            riskText.className = 'risk-text optimal';
            risksSection.style.backgroundColor = '#d4edda';
        } else if (bmi < 30) {
            riskText.textContent = 'Overweight: Increased risk of heart disease, type 2 diabetes, and high blood pressure.';
            riskText.className = 'risk-text warning';
            risksSection.style.backgroundColor = '#fff3cd';
        } else {
            riskText.textContent = 'Obese: High risk of severe health complications including heart disease, diabetes, and joint problems.';
            riskText.className = 'risk-text danger';
            risksSection.style.backgroundColor = '#f8d7da';
        }
    }
    
    // Функция смены картинки в профиле в зависимости от пола
    function changeProfileImage() {
        const profileImage = document.querySelector('.bmi-person-image');
        if (selectedImage2 === 'female') {
            profileImage.src = 'img/woman.png';
        } else if (selectedImage2 === 'male') {
            profileImage.src = 'img/man.png';
        }
    }
    
    // Функция заполнения панелек профиля
    function fillProfilePanels() {
        // Lifestyle на основе возраста, привычек и пола
        let lifestyle = '';
        if (selectedImage2 === 'female') {
            if (userAge < 25) lifestyle = 'Young woman lifestyle';
            else if (userAge < 40) lifestyle = 'Adult woman lifestyle';
            else if (userAge < 55) lifestyle = 'Mature woman lifestyle';
            else lifestyle = 'Senior woman lifestyle';
        } else {
            if (userAge < 25) lifestyle = 'Young man lifestyle';
            else if (userAge < 40) lifestyle = 'Adult man lifestyle';
            else if (userAge < 55) lifestyle = 'Mature man lifestyle';
            else lifestyle = 'Senior man lifestyle';
        }
        
        // Добавляем детали на основе привычек
        if (selectedOption19 === 'casual-drinker') lifestyle += ' with moderate drinking';
        if (selectedOption19 === 'sweet-tooth') lifestyle += ' with sweet preferences';
        if (selectedOption19 === 'soda') lifestyle += ' with soda consumption';
        if (selectedOption19 === 'salty-crispy') lifestyle += ' with salty food preferences';
        if (selectedOption19 === 'screen-time') lifestyle += ' with screen time habits';
        
        // Fitness level на основе частоты тренировок и возраста
        let fitness = '';
        if (selectedOption17 === 'almost-every-day') {
            if (userAge < 30) fitness = 'Elite athlete';
            else if (userAge < 50) fitness = 'Advanced fitness';
            else fitness = 'Senior athlete';
        } else if (selectedOption17 === 'several-times-week') {
            if (userAge < 30) fitness = 'Intermediate fitness';
            else if (userAge < 50) fitness = 'Regular exerciser';
            else fitness = 'Active senior';
        } else if (selectedOption17 === 'several-times-month') {
            fitness = 'Occasional exerciser';
        } else {
            fitness = 'Sedentary lifestyle';
        }
        
        // Goal на основе целевого веса и пола
        let goal = '';
        if (userTargetWeight < userCurrentWeight) {
            const weightLoss = userCurrentWeight - userTargetWeight;
            if (weightLoss > 20) {
                goal = selectedImage2 === 'female' ? 'Significant weight loss for women' : 'Significant weight loss for men';
            } else if (weightLoss > 10) {
                goal = selectedImage2 === 'female' ? 'Moderate weight loss for women' : 'Moderate weight loss for men';
            } else {
                goal = selectedImage2 === 'female' ? 'Light weight loss for women' : 'Light weight loss for men';
            }
        } else if (userTargetWeight > userCurrentWeight) {
            goal = selectedImage2 === 'female' ? 'Weight gain & muscle building for women' : 'Weight gain & muscle building for men';
        } else {
            goal = selectedImage2 === 'female' ? 'Weight maintenance for women' : 'Weight maintenance for men';
        }
        
        // Отображаем в панельках
        lifestyleText.textContent = lifestyle;
        fitnessText.textContent = fitness;
        goalText.textContent = goal;
    }

    // Функция для получения цены выбранного плана
    function getPlanPrice(planType) {
        const planPrices = {
            '1-week': 4.99,
            '4-week': 14.99,
            '12-week': 14.99
        };
        return planPrices[planType] || 0;
    }
    
    // Функция для показа индикатора свайпа

    // Функции для работы с якорями
    function showQuestionByAnchor(anchor) {
        // Скрываем все вопросы
        const allQuestions = document.querySelectorAll('.quiz-card');
        allQuestions.forEach(q => q.style.display = 'none');
        
        // Находим вопрос по якорю
        const targetQuestion = document.querySelector(`[data-anchor="${anchor}"]`);
        if (targetQuestion) {
            targetQuestion.style.display = 'block';
            
            // Обновляем URL без перезагрузки страницы
            const newUrl = `${window.location.pathname}#${anchor}`;
            window.history.pushState({ anchor }, '', newUrl);
            
            console.log(`Showing question with anchor: ${anchor}`);
        } else {
            console.error(`Question with anchor "${anchor}" not found`);
            // Если якорь не найден, показываем первый вопрос
            question1.style.display = 'block';
        }
    }
    
    function getCurrentAnchor() {
        const hash = window.location.hash;
        return hash ? hash.substring(1) : 'goal';
    }
    
    function initializeAnchorNavigation() {
        // Обрабатываем изменение хэша в URL
        window.addEventListener('hashchange', function() {
            const anchor = getCurrentAnchor();
            showQuestionByAnchor(anchor);
        });
        
        // При загрузке страницы проверяем, есть ли якорь в URL
        window.addEventListener('load', function() {
            const anchor = getCurrentAnchor();
            if (anchor !== 'goal') {
                showQuestionByAnchor(anchor);
            }
        });
        
        // Обрабатываем нажатие кнопки "Назад" в браузере
        window.addEventListener('popstate', function(event) {
            if (event.state && event.state.anchor) {
                showQuestionByAnchor(event.state.anchor);
            }
        });
    }
    
    // Инициализируем навигацию по якорям
    initializeAnchorNavigation();
    
    // Инициализируем Stripe
    initializeStripe();
    
    // Функция для перехода к следующему вопросу с обновлением URL
    function goToNextQuestion(currentQuestion, nextQuestion, anchor) {
        currentQuestion.style.display = 'none';
        nextQuestion.style.display = 'block';
        
        // Обновляем URL с новым якорем
        const newUrl = `${window.location.pathname}#${anchor}`;
        window.history.pushState({ anchor }, '', newUrl);
    }
    
    // Функция для возврата к предыдущему вопросу с обновлением URL
    function goToPreviousQuestion(currentQuestion, previousQuestion, anchor) {
        currentQuestion.style.display = 'none';
        previousQuestion.style.display = 'block';
        
        // Обновляем URL с новым якорем
        const newUrl = `${window.location.pathname}#${anchor}`;
        window.history.pushState({ anchor }, '', newUrl);
    }
    
    // Универсальная функция для перехода к следующему вопросу
    function goToNextQuestionByElement(currentQuestionElement) {
        const currentId = currentQuestionElement.id;
        const currentAnchor = questionAnchors[currentId];
        const currentIndex = questionSequence.indexOf(currentAnchor);
        
        if (currentIndex !== -1 && currentIndex < questionSequence.length - 1) {
            const nextAnchor = questionSequence[currentIndex + 1];
            const nextQuestionElement = document.querySelector(`[data-anchor="${nextAnchor}"]`);
            
            if (nextQuestionElement) {
                goToNextQuestion(currentQuestionElement, nextQuestionElement, nextAnchor);
            }
        }
    }
    
    // Универсальная функция для возврата к предыдущему вопросу
    function goToPreviousQuestionByElement(currentQuestionElement) {
        const currentId = currentQuestionElement.id;
        const currentAnchor = questionAnchors[currentId];
        const currentIndex = questionSequence.indexOf(currentAnchor);
        
        if (currentIndex > 0) {
            const previousAnchor = questionSequence[currentIndex - 1];
            const previousQuestionElement = document.querySelector(`[data-anchor="${previousAnchor}"]`);
            
            if (previousQuestionElement) {
                goToPreviousQuestion(currentQuestionElement, previousQuestionElement, previousAnchor);
            }
        }
    }
    
    // Обработчики для экрана оплаты
    backBtnPayment.addEventListener('click', function() {
        console.log('Going back to plans screen');
        goToPreviousQuestion(paymentScreen, question32, 'subscribe');
    });
    
    // Инициализация Stripe
    function initializeStripe() {
        console.log('Initializing Stripe...');
        console.log('Stripe key:', 'pk_live_51Qk1KmK2gOb0VfuWz5unqlgduUQKZTOXnSFR35DiEyKiqtABb4V8xgmr8TQ4QrvSE02Ct2');
        
        // Live ключ Stripe
        stripe = Stripe('pk_live_51Qk1KmK2gOb0VfuWz5unqlgduUQKZTOXnSFR35DiEyKiqtABb4V8xgmr8TQ4QrvSE02Ct2');
        
        console.log('Stripe object created:', stripe);
        
        const elements = stripe.elements();
        cardElement = elements.create('card', {
            style: {
                base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                        color: '#aab7c4',
                    },
                },
                invalid: {
                    color: '#9e2146',
                },
            },
        });
        
        cardElement.mount('#card-element');
        
        // Обработка ошибок валидации карты
        cardElement.on('change', function(event) {
            const displayError = document.getElementById('card-errors');
            if (event.error) {
                displayError.textContent = event.error.message;
                payBtn.disabled = true;
            } else {
                displayError.textContent = '';
                payBtn.disabled = false;
            }
        });
    }
    
    // Обновление экрана оплаты
    function updatePaymentScreen() {
        const selectedPlanCard = document.querySelector('.plan-card.selected');
        if (selectedPlanCard) {
            selectedPlan = selectedPlanCard.dataset.value;
            const planName = selectedPlanCard.querySelector('.plan-name').textContent;
            const planPrice = getPlanPrice(selectedPlan);
            
            // Обновляем информацию о плане
            selectedPlanName.textContent = planName;
            selectedPlanPrice.textContent = `$${planPrice}`;
            planCost.textContent = `$${planPrice}`;
            
            // Рассчитываем налог (пример: 8.5%)
            const tax = planPrice * 0.085;
            const total = planPrice + tax;
            
            taxAmount.textContent = `$${tax.toFixed(2)}`;
            totalAmount.textContent = `$${total.toFixed(2)}`;
            payBtnAmount.textContent = `$${total.toFixed(2)}`;
        }
    }
    
    // Обработчик кнопки Pay
    payBtn.addEventListener('click', function() {
        console.log('Pay button clicked');
        console.log('Stripe object:', stripe);
        console.log('Card element:', cardElement);
        
        if (!stripe || !cardElement) {
            console.error('Stripe not initialized');
            return;
        }
        
        payBtn.disabled = true;
        payBtn.innerHTML = '<span>Processing...</span>';
        
        // Здесь должна быть логика создания payment intent на сервере
        // Для демонстрации используем тестовый токен
        console.log('Creating token...');
        stripe.createToken(cardElement).then(function(result) {
            if (result.error) {
                const errorElement = document.getElementById('card-errors');
                errorElement.textContent = result.error.message;
                payBtn.disabled = false;
                payBtn.innerHTML = `<span class="pay-btn-text">Pay</span><span class="pay-btn-amount">$${totalAmount.textContent.replace('$', '')}</span>`;
            } else {
                console.log('Payment token created:', result.token);
                
                // Отправляем событие в Mixpanel
                if (window.mixpanel) {
                    mixpanel.track('payment_attempted', {
                        plan: selectedPlan,
                        plan_name: selectedPlanName.textContent,
                        amount: totalAmount.textContent
                    });
                }
                
                // Показываем модальное окно для email
                subscribeModal.style.display = 'flex';
                
                // Возвращаемся к экрану с планами
                goToPreviousQuestion(paymentScreen, question32, 'subscribe');
            }
        });
    });
    
    // Функция валидации email
});
