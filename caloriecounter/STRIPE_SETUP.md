# 🚀 Настройка Stripe для Calorie Scanner AI

## 📋 Обзор

Этот проект интегрирован с Stripe для обработки платежей. Система включает:
- Экран выбора планов питания
- Экран ввода данных карты
- Модальное окно для email (после успешной оплаты)

## 🔑 Настройка ключей

### 1. Получение ключей Stripe

1. Зарегистрируйтесь на [stripe.com](https://stripe.com)
2. Перейдите в Dashboard → Developers → API keys
3. Скопируйте **Publishable key** (начинается с `pk_test_` или `pk_live_`)

### 2. Обновление ключа в коде

В файле `script.js` найдите строку:
```javascript
stripe = Stripe('pk_live_51Qk1KmK2gOb0VfuWz5unqlgduUQKZTOXnSFR35DiEyKiqtABb4V8xgmr8TQ4QrvSE02Ct2');
```

**Ключ уже настроен!** Используется live ключ для продакшена.

## 💳 Live платежи

### ⚠️ Внимание!
**Используется live ключ Stripe** - все платежи будут реальными!

### 🚨 Важно для продакшена:
- ✅ **Все платежи реальные** - деньги будут списываться
- ✅ **Нет тестовых карт** - только настоящие карты клиентов
- ✅ **Настройте webhook'и** для уведомлений о платежах
- ✅ **Мониторьте Dashboard** Stripe для отслеживания транзакций

### 🔒 Безопасность:
- Используйте HTTPS на сайте
- Валидируйте данные на сервере
- Логируйте все платежные операции
- Соблюдайте PCI DSS требования

## 🔧 Настройка сервера

### Текущая реализация
Сейчас используется `stripe.createToken()` для демонстрации. В продакшене нужно:

1. **Создать Payment Intent** на сервере
2. **Подтвердить платеж** с помощью `stripe.confirmCardPayment()`
3. **Обработать результат** на сервере

### Пример серверной логики (Node.js)
```javascript
const stripe = require('stripe')('sk_test_your_secret_key');

app.post('/create-payment-intent', async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount * 100, // в центах
      currency: 'usd',
      metadata: {
        plan: req.body.plan,
        user_id: req.body.user_id
      }
    });
    
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

## 📱 Пользовательский опыт

### Поток оплаты:
1. **Выбор плана** → `#subscribe`
2. **Ввод карты** → `#payment`
3. **Обработка** → Stripe Elements
4. **Email** → Модальное окно
5. **Завершение** → План отправлен

### Особенности:
- ✅ Автоматический расчет налога (8.5%)
- ✅ Валидация карты в реальном времени
- ✅ Обработка ошибок
- ✅ Адаптивный дизайн
- ✅ Аналитика (Mixpanel + Facebook Pixel)

## 🎨 Кастомизация

### Изменение стилей Stripe Elements
В функции `initializeStripe()`:
```javascript
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
```

### Изменение налоговой ставки
В функции `updatePaymentScreen()`:
```javascript
const tax = planPrice * 0.085; // Измените 0.085 на нужную ставку
```

## 🚨 Безопасность

### Важные моменты:
- ✅ **Никогда** не храните секретные ключи в клиентском коде
- ✅ Используйте HTTPS в продакшене
- ✅ Валидируйте данные на сервере
- ✅ Логируйте все платежные операции
- ✅ Соблюдайте PCI DSS требования

### Рекомендации:
1. Используйте Webhook'и для уведомлений о платежах
2. Реализуйте idempotency для предотвращения дублирования
3. Добавьте rate limiting для API endpoints
4. Мониторьте подозрительную активность

## 📊 Аналитика

### Отслеживаемые события:
- `payment_screen_opened` - открытие экрана оплаты
- `payment_attempted` - попытка оплаты
- `email_submitted` - отправка email

### Facebook Pixel:
- `Purchase` - успешная покупка
- `AddToCart` - добавление в корзину

## 🔍 Отладка и мониторинг

### Консоль браузера:
```javascript
// Проверка инициализации Stripe
console.log('Stripe:', stripe);
console.log('Card Element:', cardElement);

// Проверка создания токена (только для отладки)
stripe.createToken(cardElement).then(console.log);
```

### Stripe Dashboard (Live):
- **Payments** → Все реальные платежи
- **Customers** → База клиентов
- **Logs** → API requests и ошибки
- **Analytics** → Статистика и метрики

### ⚠️ Важно для live:
- Все платежи реальные - тестируйте осторожно
- Используйте небольшие суммы для проверки
- Мониторьте Dashboard в реальном времени
- Настройте уведомления о платежах

## 📞 Поддержка

### Полезные ссылки:
- [Stripe Documentation](https://stripe.com/docs)
- [Stripe Elements](https://stripe.com/docs/stripe-js)
- [Test Cards](https://stripe.com/docs/testing#cards)
- [Webhooks](https://stripe.com/docs/webhooks)

### Сообщество:
- [Stripe Community](https://support.stripe.com)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/stripe)
- [GitHub Issues](https://github.com/stripe/stripe-js/issues)

---

**Примечание:** Это тестовая реализация. Для продакшена обязательно настройте серверную часть и используйте live ключи Stripe.

