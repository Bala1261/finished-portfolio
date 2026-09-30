# How to Add Event Participation Images

## Steps to Add Your Event Photos:

### 1. Prepare Your Images
- Collect photos from your event participations (Sathyabama Hackathon, Sona College Paper, CIT Project Demo)
- Rename them clearly, for example:
  - `sathyabama-hackathon.jpg`
  - `sona-college-paper.jpg`
  - `cit-project-demo.jpg`

### 2. Add Images to Your Portfolio
- Copy your event images to the `public/images/` folder in your portfolio directory
- Make sure they are in JPG or PNG format

### 3. Update the Experience Component
- Open `src/components/Experience.js`
- Find the "Technical Events Participation" entry (id: 3)
- Look for the `images` array (currently empty with a comment)
- Add your image paths like this:

```javascript
{
  id: 3,
  date: '2024',
  title: 'Technical Events Participation',
  company: 'Various Institutions',
  type: 'events',
  description: 'Actively participated in hackathons, technical presentations, and project demonstrations to showcase skills and learn from peers.',
  achievements: [
    'Participated in Hackathon at Sathyabama University',
    'Presented Technical Paper at Sona College of Technology',
    'Demonstrated Project at CIT'
  ],
  images: [
    '/images/sathyabama-hackathon.jpg',
    '/images/sona-college-paper.jpg',
    '/images/cit-project-demo.jpg'
  ]
},
```

### 4. Example Image Structure
Your `public/images/` folder should look like:
```
public/
  └── images/
      ├── profile.jpg
      ├── sathyabama-hackathon.jpg
      ├── sona-college-paper.jpg
      └── cit-project-demo.jpg
```

### 5. Restart Your Development Server
- Stop the server (Ctrl+C in terminal)
- Run `npm start` again
- Your event images will now appear in the Experience section!

## Tips:
- Use high-quality images (but not too large - keep them under 1MB each)
- Recommended image dimensions: 400x300 pixels
- Images will be displayed in a grid below the event description
- They will have hover effects for better interactivity

## Example Images:
You can use your actual event photos showing:
- You at the hackathon workspace
- Presenting your technical paper
- Demonstrating your project
- Team photos from events
- Certificate or award moments
