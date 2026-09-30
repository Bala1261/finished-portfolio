# Brevo SMTP Setup for Render (FREE - No SendGrid Needed!)

## ✅ Solution: Use Brevo SMTP (Formerly Sendinblue)

Brevo offers **FREE SMTP service** that works perfectly on Render without any port blocking issues!

---

## 🚀 Quick Setup (5 Minutes)

### Step 1: Create Brevo Account (FREE)
1. Go to: **https://www.brevo.com/**
2. Click **"Sign up free"**
3. Fill in your details:
   - Email: `solairaj495@gmail.com`
   - Create a password
4. Verify your email address

### Step 2: Get SMTP Credentials
1. Login to Brevo Dashboard
2. Click on your **name** (top right) → **"SMTP & API"**
3. You'll see your SMTP settings:
   ```
   SMTP Server: smtp-relay.brevo.com
   Port: 587
   Login: Your email (solairaj495@gmail.com)
   Password: Click "Create a new SMTP key"
   ```
4. Click **"Create a new SMTP key"**
5. Name it: `Portfolio Contact Form`
6. **COPY THE SMTP KEY** (you'll only see it once!)

### Step 3: Add Environment Variables to Render

1. Go to: **https://dashboard.render.com**
2. Select your **backend web service**
3. Go to **"Environment"** tab
4. Add these environment variables:

```
BREVO_SMTP_USER=solairaj495@gmail.com
BREVO_SMTP_KEY=your_smtp_key_here
EMAIL_TO=solairaj495@gmail.com
```

**Replace `your_smtp_key_here` with the SMTP key you copied!**

5. Click **"Save Changes"**
6. Render will automatically redeploy (takes 2-3 minutes)

### Step 4: Test!
1. Wait for deployment to complete
2. Go to your live portfolio website
3. Fill out the contact form
4. Submit a test message
5. Check your email! ✅

---

## 📋 Complete Environment Variables for Render

Your Render backend should have these variables:

```
MONGODB_URI=your_mongodb_connection_string
BREVO_SMTP_USER=solairaj495@gmail.com
BREVO_SMTP_KEY=your_brevo_smtp_key
EMAIL_TO=solairaj495@gmail.com
```

---

## 🎯 Why Brevo Works on Render

| Feature | Brevo SMTP | Gmail SMTP |
|---------|-----------|------------|
| **Port** | 587 (allowed by Render) | 587 (blocked by Render) |
| **Works on Render** | ✅ YES | ❌ NO (timeout) |
| **Free Tier** | 300 emails/day | Limited |
| **Setup Time** | 5 minutes | Complex |
| **Reliability** | High | Low on Render |

---

## 🎁 Brevo Free Tier Benefits

- ✅ **300 emails per day** (FREE forever)
- ✅ Works perfectly on Render
- ✅ No credit card required
- ✅ Professional email service
- ✅ Email tracking & analytics
- ✅ Better deliverability than Gmail

---

## 🔄 Alternative: Keep Using Gmail (Local Only)

If you want to use Gmail for **local development** only:

Your current `.env` file should have:
```
EMAIL_USER=solairaj495@gmail.com
EMAIL_PASSWORD=your_gmail_app_password
```

**Note:** This will work locally but will timeout on Render!

---

## ❓ Troubleshooting

### "Email not sending on Render"
- Make sure you added `BREVO_SMTP_USER` and `BREVO_SMTP_KEY` to Render
- Check Render logs for error messages
- Verify the SMTP key is correct (no extra spaces)

### "Invalid credentials"
- Double-check you copied the entire SMTP key
- Make sure `BREVO_SMTP_USER` is your Brevo account email
- Create a new SMTP key if needed

### "Still getting timeout"
- Make sure you're using Brevo variables, not Gmail
- Check that Render redeployed after adding variables
- View Render logs to confirm it's using Brevo

---

## 📝 What the Code Does Now

The backend automatically detects which SMTP service to use:

1. **First Priority:** Brevo SMTP (if `BREVO_SMTP_KEY` exists)
2. **Second Priority:** Gmail SMTP (if `EMAIL_USER` and `EMAIL_PASSWORD` exist)
3. **Fallback:** Email disabled (messages still saved to database)

This means:
- ✅ **On Render:** Use Brevo (works perfectly)
- ✅ **Locally:** Use Gmail or Brevo (both work)
- ✅ **Flexible:** Easy to switch between providers

---

## 🎉 Summary

1. Create Brevo account (free)
2. Get SMTP key
3. Add to Render environment variables
4. Done! Emails will work perfectly on Render

**Total time: 5 minutes**  
**Cost: $0 (FREE forever)**

---

Need help? Let me know if you encounter any issues!
