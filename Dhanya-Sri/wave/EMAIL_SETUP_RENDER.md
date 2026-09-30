# Email Setup for Render Deployment

## Problem
Render blocks outbound SMTP connections on standard ports (465, 587, 25) for security reasons, causing Gmail SMTP to timeout.

## Solution Options

### Option 1: Use SendGrid (Recommended - FREE)

SendGrid provides a reliable API-based email service that works perfectly on Render.

#### Steps:

1. **Create SendGrid Account**
   - Go to https://sendgrid.com/
   - Sign up for a FREE account (100 emails/day forever free)
   - Verify your email address

2. **Get API Key**
   - Go to Settings → API Keys
   - Click "Create API Key"
   - Name: "Portfolio Contact Form"
   - Permissions: "Full Access" or "Mail Send"
   - Copy the API key (you'll only see it once!)

3. **Update Environment Variables in Render**
   - Go to your Render Dashboard
   - Select your web service
   - Go to "Environment" tab
   - Add new variable:
     ```
     SENDGRID_API_KEY=your_api_key_here
     EMAIL_FROM=your-verified-email@gmail.com
     EMAIL_TO=solairaj495@gmail.com
     ```

4. **Install SendGrid Package**
   ```bash
   npm install @sendgrid/mail
   ```

5. **Update server.js** (see code below)

---

### Option 2: Use Resend (Alternative - FREE)

Resend is a modern email API service.

#### Steps:

1. **Create Resend Account**
   - Go to https://resend.com/
   - Sign up for FREE (100 emails/day, 3,000/month)

2. **Get API Key**
   - Go to API Keys
   - Create new API key
   - Copy the key

3. **Update Environment Variables in Render**
   ```
   RESEND_API_KEY=your_api_key_here
   EMAIL_FROM=your-email@gmail.com
   EMAIL_TO=solairaj495@gmail.com
   ```

4. **Install Resend Package**
   ```bash
   npm install resend
   ```

---

### Option 3: Use Mailgun (Alternative)

Similar to SendGrid, Mailgun offers free tier (5,000 emails/month for 3 months).

---

## Code Update for SendGrid

Replace the email configuration and sending logic in `server/server.js`:

```javascript
import sgMail from '@sendgrid/mail';

// Initialize SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Email endpoint
app.post('/api/send-email', async (req, res) => {
  const { name, email, message } = req.body;

  // Validation
  if (!name || !email || !message) {
    return res.status(400).json({ 
      success: false, 
      message: 'All fields are required' 
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ 
      success: false, 
      message: 'Invalid email format' 
    });
  }

  const tokenId = `MSG-${nanoid(10)}`;

  try {
    // Save to MongoDB
    const newMessage = new Message({
      tokenId,
      name,
      email,
      message,
      emailSent: false
    });

    await newMessage.save();
    console.log(`📝 Message saved with Token ID: ${tokenId}`);

    // Send email using SendGrid
    const msg = {
      to: 'solairaj495@gmail.com',
      from: process.env.EMAIL_FROM, // Must be verified in SendGrid
      replyTo: email,
      subject: `Portfolio Contact from ${name} [${tokenId}]`,
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>New Portfolio Message</h2>
        <p><strong>Token ID:</strong> ${tokenId}</p>
        <p><strong>From:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      </div>
      `,
      text: `New Portfolio Message\nToken ID: ${tokenId}\nFrom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    };

    try {
      await sgMail.send(msg);
      newMessage.emailSent = true;
      await newMessage.save();
      console.log(`✅ Email sent successfully for ${tokenId}`);
    } catch (emailError) {
      console.error(`❌ Email sending failed for ${tokenId}:`, emailError.message);
    }

    res.status(200).json({ 
      success: true, 
      message: 'Message sent successfully!',
      tokenId: tokenId
    });

  } catch (error) {
    console.error('❌ Database error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to save message. Please try again later.' 
    });
  }
});
```

---

## Quick Setup (Recommended)

**I recommend SendGrid** because:
- ✅ 100% free forever (100 emails/day)
- ✅ Works perfectly on Render
- ✅ Easy to set up
- ✅ Reliable delivery
- ✅ No credit card required

**Next Steps:**
1. Create SendGrid account
2. Get API key
3. Add to Render environment variables
4. Let me know, and I'll update the code for you!
