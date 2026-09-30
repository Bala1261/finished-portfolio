# EmailJS Integration Guide

This guide will help you integrate EmailJS to make your contact form functional.

## Step 1: Create EmailJS Account

1. Go to [EmailJS](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email

## Step 2: Set Up Email Service

1. Go to "Email Services" in your dashboard
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Connect your email account
5. Note your **Service ID**

## Step 3: Create Email Template

1. Go to "Email Templates"
2. Click "Create New Template"
3. Use this template structure:

```
Subject: New Contact from {{from_name}}

From: {{from_name}}
Email: {{user_email}}

Message:
{{message}}
```

4. Save and note your **Template ID**

## Step 4: Get Your Public Key

1. Go to "Account" > "General"
2. Find your **Public Key** (also called User ID)

## Step 5: Install EmailJS

```bash
npm install @emailjs/browser
```

## Step 6: Update Contact Component

Replace the contact form submission in `src/components/sections/Contact.jsx`:

```javascript
import emailjs from '@emailjs/browser';

// Add these constants at the top of your component
const SERVICE_ID = 'your_service_id';
const TEMPLATE_ID = 'your_template_id';
const PUBLIC_KEY = 'your_public_key';

// Update handleSubmit function
const handleSubmit = (e) => {
  e.preventDefault();
  setStatus('Sending...');

  emailjs
    .send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        from_name: formData.name,
        user_email: formData.email,
        message: formData.message,
      },
      PUBLIC_KEY
    )
    .then(
      (result) => {
        console.log('SUCCESS!', result.text);
        setStatus('Message sent successfully! Thank you for reaching out.');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus(''), 3000);
      },
      (error) => {
        console.log('FAILED...', error.text);
        setStatus('Failed to send message. Please try again.');
        setTimeout(() => setStatus(''), 3000);
      }
    );
};
```

## Alternative: Formspree (Easier Setup)

1. Go to [Formspree](https://formspree.io/)
2. Sign up for free
3. Create a new form
4. Get your form endpoint
5. Update Contact form:

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  
  const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  if (response.ok) {
    setStatus('Message sent! Thank you.');
    setFormData({ name: '', email: '', message: '' });
  } else {
    setStatus('Failed to send. Please try again.');
  }
};
```

## Alternative: Web3Forms (No Backend Required)

1. Go to [Web3Forms](https://web3forms.com/)
2. Get your access key
3. Update form:

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  formData.append('access_key', 'YOUR_ACCESS_KEY');

  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    body: formData,
  });

  const data = await response.json();
  
  if (data.success) {
    setStatus('Message sent successfully!');
    e.target.reset();
  } else {
    setStatus('Failed to send. Please try again.');
  }
};
```

## Security Note

**Important**: Never commit API keys to public repositories!

Use environment variables:

1. Create `.env` file in root:
```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

2. Add `.env` to `.gitignore`

3. Use in code:
```javascript
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
```

4. For deployment, add these environment variables in your hosting platform settings.

## Testing

Test your contact form thoroughly:
- [ ] Submit with valid data
- [ ] Check if email arrives
- [ ] Test with different email providers
- [ ] Test error handling
- [ ] Check spam folder if email doesn't arrive

---

Choose the method that works best for you and enjoy your functional contact form!
