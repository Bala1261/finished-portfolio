# Deployment Fix Summary

## 🔧 Issues Fixed

### 1. **Frontend-Backend Connection Issue**
**Problem:** Frontend was using hardcoded old backend URL
```javascript
// ❌ OLD (hardcoded)
fetch('https://portfolio-backend-hy1n.onrender.com/api/send-email')

// ✅ NEW (uses environment variable)
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
fetch(`${apiUrl}/api/send-email`)
```

**File Changed:** `src/components/sections/Contact.jsx`

---

## 🚀 Deployment Configuration

### **Backend (Web Service)**
- **URL:** `https://solairaj-backend.onrender.com`
- **Root Directory:** `server`
- **Build Command:** `npm install`
- **Start Command:** `npm start`

**Environment Variables:**
```
BREVO_API_KEY=your_brevo_api_key_here
MONGODB_URI=your_mongodb_connection_string_here
NODE_ENV=production
PORT=5000
EMAIL_TO=your_email@example.com
```

### **Frontend (Static Site)**
- **Root Directory:** `/` (project root)
- **Build Command:** `npm install && npm run build`
- **Publish Directory:** `dist`

**Environment Variables:**
```
VITE_API_URL=https://solairaj-backend.onrender.com
```

---

## 📋 Next Steps

### 1. **Commit and Push Changes**
```bash
git add .
git commit -m "Fix: Use environment variable for API URL"
git push
```

### 2. **Redeploy Frontend on Render**
- Render will automatically detect the push and redeploy
- OR manually trigger redeploy from Render dashboard

### 3. **Verify Environment Variable**
Go to your frontend service on Render:
- Click **Environment** tab
- Ensure `VITE_API_URL` is set to: `https://solairaj-backend.onrender.com`
- If not, add it and save

### 4. **Test After Deployment**
1. Visit your frontend URL
2. Fill out the contact form
3. Submit the message
4. Check for success message
5. Check your email at `solairaj495@gmail.com`

---

## 🔍 Troubleshooting

### If Email Still Not Received:

1. **Check Backend Logs on Render:**
   - Go to backend service → Logs tab
   - Look for email sending confirmation or errors

2. **Test Backend Directly:**
   ```bash
   curl -X POST https://solairaj-backend.onrender.com/api/send-email \
     -H "Content-Type: application/json" \
     -d '{"name":"Test","email":"test@example.com","message":"Test message"}'
   ```

3. **Check Email Configuration:**
   Visit: `https://solairaj-backend.onrender.com/api/email-config`

4. **Verify Brevo API Key:**
   - Go to [Brevo Dashboard](https://app.brevo.com/)
   - Check API Keys section
   - Ensure the key starts with `xkeysib-`
   - Verify it's not expired

5. **Check Spam Folder:**
   - Emails might be going to spam
   - Add sender to safe list

---

## ✅ Verification Endpoints

- **Backend Health:** `https://solairaj-backend.onrender.com/api/health`
- **Email Config:** `https://solairaj-backend.onrender.com/api/email-config`
- **View Messages:** `https://solairaj-backend.onrender.com/api/messages`

---

## 📝 Common Issues

### Issue: "Failed to send message"
**Cause:** Frontend can't reach backend
**Solution:** 
- Check `VITE_API_URL` is set correctly
- Ensure backend is running
- Check browser console for CORS errors

### Issue: "Message sent but no email"
**Cause:** Brevo API configuration issue
**Solution:**
- Verify `BREVO_API_KEY` in backend environment
- Check backend logs for email errors
- Test email config endpoint

### Issue: "CORS Error"
**Cause:** Backend not allowing frontend origin
**Solution:** Backend already uses `cors()` which allows all origins, so this shouldn't happen

---

## 🎯 Expected Behavior

1. User fills contact form
2. Frontend sends POST to `https://solairaj-backend.onrender.com/api/send-email`
3. Backend saves message to MongoDB
4. Backend sends email via Brevo API
5. User sees success message
6. You receive email at `solairaj495@gmail.com`
