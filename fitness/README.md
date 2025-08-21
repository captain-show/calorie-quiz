# Calorie Counter Quiz Website

A mobile-first, interactive quiz website designed to help users assess their health and fitness goals, leading to personalized recommendations and subscription plans.

## Features

### 🎯 **Quiz Structure**
- **12 comprehensive questions** covering age, gender, height, weight, fitness goals, dietary habits, activity level, sleep patterns, stress levels, and medical conditions
- **Interactive elements** including choice cards, input fields, and visual stress scales
- **Progress tracking** with a visual progress bar
- **Informational sections** with BMI explanations and success testimonials

### 📱 **Mobile-First Design**
- Responsive layout optimized for mobile devices
- Touch-friendly interface with swipe navigation support
- Vertical scrolling layout for optimal mobile experience
- Desktop-optimized with centered content and side margins

### 🎨 **Modern UI/UX**
- Clean, minimalist white background design
- Smooth animations and transitions between screens
- Modern typography using Inter font family
- Professional color scheme with blue accents
- Interactive hover effects and visual feedback

### 🔄 **User Journey**
1. **Intro Screen** - App introduction and benefits
2. **Quiz Questions** - Comprehensive health assessment
3. **Profile Summary** - Personalized health profile with BMI calculation
4. **Subscription Plans** - Three-tier pricing with countdown timer
5. **Email Capture** - Lead generation and plan delivery

## Technical Implementation

### **Frontend Technologies**
- **HTML5** - Semantic markup structure
- **CSS3** - Modern styling with Flexbox and Grid
- **JavaScript (ES6+)** - Interactive functionality and state management
- **Font Awesome** - Icon library for visual elements
- **Google Fonts** - Inter font family for typography

### **Key Features**
- **State Management** - Tracks user answers and quiz progress
- **Input Validation** - Real-time validation for age, height, and weight
- **BMI Calculator** - Automatic BMI calculation with health risk assessment
- **Responsive Design** - Mobile-first approach with desktop optimization
- **Touch Support** - Swipe navigation for mobile devices
- **Keyboard Navigation** - Enter key support for accessibility
- **Countdown Timer** - 5-minute countdown for special offers

### **Performance Optimizations**
- Lazy loading for images
- Debounced input handling
- Efficient DOM manipulation
- CSS animations with hardware acceleration
- Minimal JavaScript bundle size

## File Structure

```
fitness/
├── index.html          # Main HTML structure
├── styles.css          # CSS styling and responsive design
├── script.js           # JavaScript functionality and logic
└── README.md           # Project documentation
```

## Getting Started

### **Prerequisites**
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional, for development)

### **Installation**
1. Clone or download the project files
2. Open `index.html` in a web browser
3. For development, use a local server:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

### **Usage**
1. **Start Quiz** - Click "Start Your Assessment" on the intro screen
2. **Answer Questions** - Progress through 12 health-related questions
3. **Review Profile** - View your personalized health summary
4. **Choose Plan** - Select from three subscription options
5. **Enter Email** - Provide email to receive your personalized plan

## Customization

### **Styling**
- Modify `styles.css` to change colors, fonts, and layout
- Update CSS variables for consistent theming
- Adjust breakpoints for different screen sizes

### **Content**
- Edit `index.html` to modify questions and content
- Update quiz logic in `script.js`
- Customize recommendations and BMI calculations

### **Functionality**
- Extend JavaScript functions for additional features
- Integrate with backend APIs for data storage
- Add analytics tracking and conversion optimization

## Browser Support

- **Chrome** 80+
- **Firefox** 75+
- **Safari** 13+
- **Edge** 80+
- **Mobile browsers** (iOS Safari, Chrome Mobile)

## Performance Metrics

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## Accessibility Features

- Semantic HTML structure
- Keyboard navigation support
- Screen reader compatibility
- High contrast color scheme
- Touch-friendly interface elements

## Future Enhancements

- **Backend Integration** - User accounts and data persistence
- **Analytics Dashboard** - User behavior tracking
- **A/B Testing** - Conversion optimization
- **Multi-language Support** - Internationalization
- **Progressive Web App** - Offline functionality
- **Social Sharing** - Referral system integration

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For questions or support, please contact the development team or create an issue in the repository.

---

**Built with ❤️ for better health and fitness outcomes**

