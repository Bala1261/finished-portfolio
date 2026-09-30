# Portfolio - Complete Setup Guide

## Your Portfolio is Ready! 🎉

All your personal information has been integrated:
- ✅ Profile image added
- ✅ Personal details updated
- ✅ Skills configured
- ✅ Education & certifications added
- ✅ Contact form with backend
- ✅ Resume download ready
- ✅ Social media links connected

## Running Your Portfolio

### Frontend (React App)

The React app is already running at http://localhost:3000

If you need to restart it:
```bash
npm start
```

### Backend (Contact Form Server)

To enable the contact form functionality:

1. **Install backend dependencies:**
```bash
cd server
npm install
```

2. **Setup Email Configuration:**

   For Gmail (recommended):
   - Go to your Google Account: https://myaccount.google.com/
   - Navigate to Security > 2-Step Verification
   - Scroll to "App passwords"
   - Generate a new app password for "Mail"
   - Copy the 16-character password

3. **Create `.env` file in server folder:**
```bash
cd server
cp .env.example .env
```

4. **Edit the `.env` file and add:**
```
EMAIL_USER=vishal250820@gmail.com
EMAIL_PASSWORD=your_16_character_app_password_here
PORT=5000
```

5. **Start the backend server:**
```bash
# From the server folder
npm start

# Or for development with auto-restart
npm run dev
```

The backend will run on http://localhost:5000

## Important Notes

### Resume File
- Currently using a text file placeholder at `public/resume.txt`
- **Replace it with your actual PDF resume:**
  - Create your resume PDF
  - Save it as `public/resume.pdf`
  - Update line in `src/components/About.js` from `resume.txt` to `resume.pdf`

### Profile Image
- Your image has been copied to `public/images/profile.jpg`
- It's automatically used in Hero and About sections

### Email Setup
- The contact form sends emails to: **vishal250820@gmail.com**
- You need to set up Gmail App Password (see Backend step 2)
- Without this, contact form won't send emails

## Project Structure

```
portfolio/
├── public/
│   ├── images/
│   │   └── profile.jpg (your photo)
│   └── resume.txt (replace with resume.pdf)
├── server/
│   ├── server.js (backend API)
│   ├── package.json
│   ├── .env (create this - not in git)
│   └── .env.example (template)
├── src/
│   ├── components/ (all updated with your info)
│   ├── App.js
│   └── index.js
└── package.json
```

## Features Implemented

### 1. Personal Branding
- Your name: Vishal K
- Email: vishal250820@gmail.com
- Phone: +91 6381180488
- Location: Cuddalore, Tamil Nadu

### 2. Education
- Kongu Engineering College
- B.E. Computer Science (2023-2027)
- CGPA: 7.50

### 3. Skills
- **Frontend:** HTML5, CSS3, JavaScript, React.js, UI/UX
- **Backend:** Node.js, Express.js, Python, Java, C
- **Tools:** Git, GitHub, VS Code, MongoDB

### 4. Certifications
- MongoDB Certified Associate Developer (May 2025)
- Java Foundation (Present)

### 5. Achievements
- Hackathon at Sathyabama University
- Technical Paper at Sona College of Technology
- Project Demo at CIT

### 6. Social Links
- GitHub: https://github.com/Vishal-25-cyber
- LinkedIn: https://www.linkedin.com/feed/
- Twitter: @vishxl_76
- Instagram: @vishxl_76

## Customization

### Update Projects
Edit `src/components/Projects.js` to add your real projects with:
- Project screenshots
- GitHub repository links
- Live demo links

### Update Resume
1. Create a proper PDF resume
2. Save it as `public/resume.pdf`
3. Update the download link in `src/components/About.js`

### Change Colors
Modify color scheme in `src/App.css`:
```css
:root {
  --primary-color: #6366f1;
  --secondary-color: #ec4899;
  /* Change these to your preferred colors */
}
```

## Deployment

### Deploy Frontend (Netlify/Vercel)
```bash
npm run build
# Upload the 'build' folder to Netlify or Vercel
```

### Deploy Backend (Heroku/Railway)
```bash
cd server
# Follow Heroku or Railway deployment guides
# Remember to set environment variables!
```

## Troubleshooting

### Contact Form Not Working
- Make sure backend server is running (http://localhost:5000)
- Check that .env file is configured with Gmail App Password
- Verify both frontend and backend are running

### Image Not Showing
- Check that `public/images/profile.jpg` exists
- Clear browser cache and refresh

### Resume Download Not Working
- Ensure file exists at `public/resume.txt` or `public/resume.pdf`
- Check file path in About component

## Next Steps

1. ✅ Portfolio is personalized
2. 📝 Create and add your PDF resume
3. 📧 Set up Gmail App Password for contact form
4. 🚀 Add more real projects with screenshots
5. 🌐 Deploy to make it live!

## Support

If you encounter any issues:
1. Check console for errors (F12 in browser)
2. Make sure all dependencies are installed
3. Verify both frontend and backend are running
4. Check that all environment variables are set

---

**Your portfolio is ready to impress! 🎯**

Built with React, Node.js, and passion for coding! 💻
