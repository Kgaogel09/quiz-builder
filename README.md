# Quiz Builder React Application

A modern, accessible quiz builder application built with React, TypeScript, and Tailwind CSS. Create, preview, and take interactive quizzes with a clean, user-friendly interface.

## 🚀 Features

### Quiz Editor
- **Dynamic Question Management**: Add, edit, and remove questions with ease
- **Multiple Choice Options**: Support for 2+ options per question with dynamic add/remove functionality
- **Correct Answer Selection**: Visual indicators for marking correct answers
- **Real-time Validation**: Instant feedback for incomplete questions
- **Auto-save**: Questions are automatically saved to local storage

### Quiz Preview
- **Interactive Quiz Taking**: Navigate through questions with previous/next controls
- **Progress Tracking**: Visual progress bar showing completion status
- **Answer Selection**: Click-to-select interface with visual feedback
- **Responsive Design**: Works seamlessly across different screen sizes

### Results & Analytics
- **Detailed Scoring**: Percentage-based scoring with visual indicators
- **Performance Feedback**: Contextual messages based on quiz performance
- **Question-by-Question Review**: Detailed breakdown of correct/incorrect answers
- **Retry Functionality**: Option to retake the quiz

## 🛠️ Technology Stack

- **Frontend Framework**: React 18.3.1 with TypeScript
- **Styling**: Tailwind CSS 3.4.13
- **Icons**: Lucide React 0.554.0
- **Build Tool**: Vite 5.4.8
- **Testing**: Jest 29.7.0 + React Testing Library + Playwright
- **Code Quality**: TypeScript with strict configuration

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd quiz-builder-react
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🎯 Usage Guide

### Creating a Quiz

1. **Add Questions**: Click "Add Question" to create new questions
2. **Enter Question Text**: Fill in the question title in the input field
3. **Add Options**: Each question starts with 2 options, add more using "Add Option"
4. **Mark Correct Answer**: Click the green checkmark (✓) next to the correct option
5. **Save Quiz**: Click "Save Quiz" when all questions have correct answers marked

### Taking a Quiz

1. **Preview Mode**: Click "Preview" to switch from editor to quiz-taking mode
2. **Answer Questions**: Click on your chosen answer for each question
3. **Navigate**: Use "Previous" and "Next" buttons to move between questions
4. **Submit**: Click "Submit" after answering the last question

### Viewing Results

1. **Score Overview**: See your percentage score and correct answers count
2. **Performance Feedback**: Get contextual feedback based on your performance
3. **Detailed Review**: Review each question with your answers vs. correct answers
4. **Retry Option**: Take the quiz again to improve your score

## 🏗️ Project Structure

```
src/
├── components/
│   ├── editor/
│   │   └── Editor.tsx          # Quiz creation and editing interface
│   ├── preview/
│   │   └── Preview.tsx         # Quiz taking interface
│   └── results/
│       └── Results.tsx         # Results display and analysis
├── hooks/
│   ├── useQuizLogic.tsx        # Quiz state management and logic
│   └── useQuizStorage.tsx      # Local storage persistence
├── types/
│   ├── type.ts                 # TypeScript type definitions
│   └── global.d.ts             # Global type declarations
├── App.tsx                     # Main application component
├── main.tsx                    # Application entry point
└── index.css                   # Global styles and Tailwind imports
```

## 🧪 Testing

### Unit Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

### End-to-End Tests
```bash
# Run Playwright e2e tests
npm run test:e2e
```

## 🔧 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm test` | Run unit tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:e2e` | Run end-to-end tests |

## 📱 Responsive Design

The application is fully responsive and works on:
- **Desktop**: Full-featured experience with all controls
- **Tablet**: Optimized layout for touch interactions
- **Mobile**: Streamlined interface for smaller screens

## ♿ Accessibility Features

- **Semantic HTML**: Proper heading hierarchy and landmark elements
- **ARIA Labels**: Screen reader friendly interface
- **Keyboard Navigation**: Full keyboard accessibility
- **Color Contrast**: WCAG compliant color schemes
- **Focus Management**: Clear focus indicators and logical tab order

## 💾 Data Persistence

- **Local Storage**: Quiz data is automatically saved to browser's local storage
- **Auto-save**: Changes are saved in real-time as you edit
- **Data Recovery**: Quiz data persists between browser sessions

## 🎨 Customization

### Styling
The application uses Tailwind CSS for styling. Key design tokens:
- **Primary Color**: Sky blue (`sky-600`)
- **Success Color**: Emerald green (`emerald-500`)
- **Warning Color**: Amber (`amber-400`)
- **Error Color**: Red (`red-500`)
- **Background**: Light gray (`#f6f5f4`)

### Configuration Files
- `tailwind.config.cjs`: Tailwind CSS configuration
- `vite.config.ts`: Vite build configuration
- `tsconfig.json`: TypeScript configuration
- `jest.config.ts`: Jest testing configuration

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

### Deployment Options
- **Vercel**: Zero-config deployment
- **Netlify**: Drag and drop deployment
- **GitHub Pages**: Free hosting for public repositories
- **AWS S3**: Scalable cloud hosting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🐛 Known Issues

- Quiz data is stored locally and won't sync across devices
- Large quizzes (50+ questions) may impact performance
- No export/import functionality for quiz data

## 🔮 Future Enhancements

- [ ] Quiz templates and categories
- [ ] Timer functionality for timed quizzes
- [ ] Export quiz data to JSON/CSV
- [ ] Multiple quiz formats (true/false, fill-in-the-blank)
- [ ] User authentication and cloud storage
- [ ] Quiz sharing via URL
- [ ] Advanced analytics and reporting

## 📞 Support

For support, please open an issue in the GitHub repository or contact the development team.

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**