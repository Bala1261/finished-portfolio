# Portfolio Website

A modern, responsive portfolio website showcasing your skills, projects, and experience.

## Features

### ✨ Implemented Features

- **Responsive Navigation Bar**
  - Fixed navigation with scroll effect
  - Mobile-friendly hamburger menu
  - Active link highlighting based on scroll position

- **Hero Section**
  - Eye-catching introduction with gradient text
  - Animated typing effect for roles/titles
  - Profile image with modern styling
  - Social media links
  - Call-to-action buttons

- **About Section**
  - Personal introduction
  - Professional information cards
  - Resume download button
  - Image showcase

- **Skills Section**
  - Categorized skills (Frontend, Backend, Tools)
  - Animated progress bars
  - Visual skill percentage display
  - Hover effects on skill cards

- **Projects Section**
  - Project showcase grid
  - Category filtering (All, Web Apps, Mobile, Design)
  - Project cards with images and descriptions
  - Technology tags
  - Links to live demo and GitHub
  - Smooth filter animations

- **Experience & Education Timeline**
  - Interactive timeline layout
  - Work experience entries
  - Education history
  - Detailed descriptions and achievements

- **Contact Section**
  - Contact form with validation
  - Contact information display
  - Social media links
  - Form submission feedback (frontend ready for backend)

- **Additional Features**
  - Back to top button
  - Smooth scrolling
  - Scroll animations
  - Particle background effect
  - Fully responsive design for all devices
  - Modern gradient color scheme
  - Optimized performance

## Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS Grid & Flexbox
- **JavaScript (Vanilla)** - Interactive functionality
- **Font Awesome** - Icons

## Getting Started

### Installation

1. Clone or download this repository to your local machine

2. Open the project folder

3. Customize the content:
   - Update personal information in `index.html`
   - Replace placeholder images with your own
   - Add your social media links
   - Update skills, projects, and experience sections
   - Modify color scheme in `styles.css` if desired

### Running the Website

Simply open `index.html` in your web browser:

```bash
# On Windows
start index.html

# On Mac
open index.html

# On Linux
xdg-open index.html
```

Or use a local development server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js with npx
npx serve

# Using VS Code Live Server extension
# Right-click on index.html and select "Open with Live Server"
```

## Customization Guide

### 1. Personal Information

Edit the following sections in `index.html`:

- Hero section: Update name, roles, and description
- About section: Add your story, contact details
- Social media links: Replace `#` with your actual URLs

### 2. Skills

Update the skills in the Skills section:

```html
<div class="skill-item">
    <div class="skill-info">
        <span>Your Skill</span>
        <span>Percentage%</span>
    </div>
    <div class="skill-bar">
        <div class="skill-progress" style="width: Percentage%"></div>
    </div>
</div>
```

### 3. Projects

Add or modify projects in the Projects section. Each project card includes:
- Project image
- Title and description
- Technology tags
- Links to live demo and GitHub repository

### 4. Experience & Education

Update the timeline items with your work experience and education.

### 5. Colors & Styling

Modify CSS variables in `styles.css`:

```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #ec4899;
    --accent-color: #14b8a6;
    /* Add more customizations */
}
```

### 6. Images

Replace placeholder images:
- Hero profile image
- About section image
- Project images

Store images in an `images/` folder for better organization.

## Backend Integration (Coming Soon)

The contact form is ready for backend integration. When you implement the backend:

1. Uncomment the fetch code in `script.js` (Contact Form Handling section)
2. Set up your backend endpoint (e.g., `/api/contact`)
3. Configure email service or database storage

### Suggested Backend Technologies:
- Node.js + Express + Nodemailer
- Python + Flask/Django
- PHP
- Serverless functions (Netlify, Vercel)

## Deployment

### Quick Deploy Options:

1. **GitHub Pages** (Free)
   - Push to GitHub repository
   - Enable GitHub Pages in repository settings
   - Your site will be live at `https://yourusername.github.io/repository-name`

2. **Netlify** (Free)
   - Drag and drop your folder to Netlify
   - Or connect your GitHub repository

3. **Vercel** (Free)
   - Import your GitHub repository
   - Automatic deployments on push

4. **Traditional Hosting**
   - Upload files via FTP to your hosting provider
   - Works with any web hosting service

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Performance Optimization Tips

- Compress and optimize images (use WebP format)
- Minify CSS and JavaScript files
- Use a CDN for Font Awesome
- Add lazy loading for images
- Enable caching

## Future Enhancements

When adding backend functionality, consider:

- [ ] Blog section with CMS
- [ ] Admin dashboard
- [ ] Visitor analytics
- [ ] Dark/Light theme toggle
- [ ] Multi-language support
- [ ] Newsletter subscription
- [ ] Testimonials section
- [ ] Certificate showcase
- [ ] Integration with GitHub API for live project stats

## License

This project is open source and available for personal and commercial use.

## Contact

For questions or suggestions, feel free to reach out through the contact form on the website!

---

**Made with ❤️ and passion for web development**
