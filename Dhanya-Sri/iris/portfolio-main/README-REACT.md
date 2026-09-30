# React Portfolio Website

A modern, responsive portfolio website built with **React** showcasing your skills, projects, and experience. Perfect for students and developers looking to create an impressive online presence.

## 🚀 Features

### ✨ Implemented Features

- **Responsive Navigation Bar**
  - Fixed navigation with scroll effects
  - Mobile-friendly hamburger menu
  - Active link highlighting based on scroll position
  - Smooth scrolling to sections

- **Hero Section**
  - Animated typing effect with React Type Animation
  - Gradient text effects
  - Social media links with hover animations
  - Profile image with modern styling
  - Framer Motion animations

- **About Section**
  - Personal introduction
  - Information cards with icons
  - Resume download button
  - Smooth scroll animations

- **Skills Section**
  - Categorized skills (Frontend, Backend, Tools)
  - Animated progress bars (triggered on scroll)
  - Hover effects with Framer Motion
  - Visual skill percentage display

- **Projects Section**
  - Dynamic project showcase grid
  - Category filtering (All, Web Apps, Mobile, Design)
  - Image overlays with demo/GitHub links
  - Technology tags
  - Smooth filter animations

- **Experience Timeline**
  - Interactive timeline layout
  - Work experience and education entries
  - Scroll-based animations
  - Responsive design

- **Contact Section**
  - Functional contact form with React state
  - Form validation
  - Contact information display
  - Social media links
  - Success/error message feedback

- **Additional Features**
  - Back to top button with animations
  - Smooth scrolling throughout
  - Framer Motion animations
  - Fully responsive design for all devices
  - Modern dark theme with gradients
  - React Icons for beautiful icons

## 🛠️ Technologies Used

- **React 18** - Modern React with hooks
- **Framer Motion** - Smooth animations
- **React Icons** - Beautiful icon library
- **React Type Animation** - Typing effect
- **CSS3** - Modern styling with CSS Grid & Flexbox
- **JavaScript (ES6+)** - Modern JavaScript features

## 📦 Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm start
   ```

3. **Open Your Browser**
   - Navigate to `http://localhost:3000`
   - The app will automatically reload if you make changes

## 🎨 Customization

### 1. Personal Information

Update the following files:

**Hero Section** ([src/components/Hero.js](src/components/Hero.js)):
```javascript
<h1>Hi, I'm <span className="gradient-text">Your Name</span></h1>
```

**About Section** ([src/components/About.js](src/components/About.js)):
- Update personal info
- Change about me description

**Social Links** - Update URLs in:
- [src/components/Hero.js](src/components/Hero.js)
- [src/components/Contact.js](src/components/Contact.js)

### 2. Skills

Edit [src/components/Skills.js](src/components/Skills.js):
```javascript
const skillCategories = [
  {
    title: 'Frontend Development',
    icon: <FaLaptopCode />,
    skills: [
      { name: 'Your Skill', level: 90 },
      // Add more skills
    ]
  }
];
```

### 3. Projects

Update [src/components/Projects.js](src/components/Projects.js):
```javascript
const projects = [
  {
    title: 'Your Project',
    description: 'Project description',
    image: 'path/to/image',
    tags: ['React', 'Node.js'],
    category: 'web',
    demoUrl: 'https://...',
    githubUrl: 'https://...'
  }
];
```

### 4. Experience

Modify [src/components/Experience.js](src/components/Experience.js):
```javascript
const timeline = [
  {
    date: '2022 - Present',
    title: 'Your Position',
    company: 'Company Name',
    description: 'Description',
    achievements: ['Achievement 1', 'Achievement 2']
  }
];
```

### 5. Colors & Theme

Update CSS variables in [src/App.css](src/App.css):
```css
:root {
  --primary-color: #6366f1;
  --secondary-color: #ec4899;
  --accent-color: #14b8a6;
  /* Customize more colors */
}
```

### 6. Images

Replace placeholder images:
- Create an `images/` folder in `public/`
- Add your images
- Update image paths in components

## 📝 Available Scripts

### `npm start`
Runs the app in development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm run build`
Builds the app for production to the `build` folder.
The build is optimized and ready to be deployed.

### `npm test`
Launches the test runner in interactive watch mode.

## 🌐 Deployment

### Quick Deploy Options:

1. **GitHub Pages**
   ```bash
   npm install --save-dev gh-pages
   ```
   Add to `package.json`:
   ```json
   "homepage": "https://yourusername.github.io/portfolio",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   ```
   Deploy:
   ```bash
   npm run deploy
   ```

2. **Netlify**
   - Connect your GitHub repository
   - Build command: `npm run build`
   - Publish directory: `build`
   - Auto-deploy on push

3. **Vercel**
   ```bash
   npm install -g vercel
   vercel
   ```

4. **Heroku, AWS, or Other Hosting**
   - Build the project: `npm run build`
   - Upload the `build` folder to your hosting

## 🔧 Backend Integration (Future)

The contact form is ready for backend integration. To connect:

1. Uncomment the fetch code in [src/components/Contact.js](src/components/Contact.js)
2. Create your backend API endpoint
3. Update the API URL

### Suggested Backend:
- Node.js + Express + Nodemailer
- Python + Flask/Django
- Serverless functions (Netlify/Vercel)

## 📱 Responsive Design

The portfolio is fully responsive:
- Desktop (1920px and above)
- Laptop (1024px - 1920px)
- Tablet (768px - 1024px)
- Mobile (320px - 768px)

## 🎓 For Students

This project is perfect for:
- Learning React fundamentals
- Understanding component-based architecture
- Practicing React Hooks (useState, useEffect, useRef)
- Working with animations (Framer Motion)
- Building a professional portfolio
- Showcasing your projects to recruiters

### Learning Points:
- Component composition
- Props and state management
- Event handling
- Conditional rendering
- Array methods (map, filter)
- CSS modules and styling
- Responsive design
- Animations and transitions

## 📚 Project Structure

```
portfolio/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar.js
│   │   ├── Hero.js
│   │   ├── About.js
│   │   ├── Skills.js
│   │   ├── Projects.js
│   │   ├── Experience.js
│   │   ├── Contact.js
│   │   ├── Footer.js
│   │   └── BackToTop.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## 🐛 Troubleshooting

### Common Issues:

1. **Port 3000 already in use**
   ```bash
   # Windows
   netstat -ano | findstr :3000
   taskkill /PID <PID> /F
   
   # Mac/Linux
   lsof -i :3000
   kill -9 <PID>
   ```

2. **Module not found errors**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Build errors**
   - Clear cache: `npm cache clean --force`
   - Reinstall dependencies

## 🤝 Contributing

This is a personal portfolio template. Feel free to fork and customize for your own use!

## 📄 License

This project is open source and available for personal and commercial use.

## 💡 Tips for Students

1. **Start Simple**: Begin with basic customization (name, skills, projects)
2. **Learn by Doing**: Try modifying components to understand how they work
3. **Add Features**: Once comfortable, add new sections or features
4. **Use Git**: Practice version control with this project
5. **Deploy Early**: Get it online quickly and iterate
6. **Get Feedback**: Share with peers and mentors for improvements

## 📞 Support

If you encounter any issues:
1. Check the console for errors
2. Review the documentation
3. Search for similar issues online
4. Experiment with the code!

---

**Made with ❤️ for students and developers**

Good luck with your portfolio! 🚀
