import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { nanoid } from 'nanoid';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import Message from './models/Message.js';
import SibApiV3Sdk from '@sendinblue/client';

// Get directory name for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env from parent directory
dotenv.config({ path: join(__dirname, '..', '.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

connectDB();

// Brevo API Configuration (uses HTTPS - works on Render!)
let brevoClient = null;

if (process.env.BREVO_API_KEY || process.env.BREVO_SMTP_KEY) {
  const apiKey = process.env.BREVO_API_KEY || process.env.BREVO_SMTP_KEY;
  
  console.log('📧 Using Brevo API configuration');
  console.log('   Method: REST API (HTTPS)');
  console.log('   API Key:', apiKey.substring(0, 20) + '...');
  
  brevoClient = new SibApiV3Sdk.TransactionalEmailsApi();
  brevoClient.setApiKey(SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey, apiKey);
  
  console.log('✅ Brevo API client initialized');
} else {
  console.log('⚠️  Brevo API not configured');
  console.log('💡 Add BREVO_API_KEY or BREVO_SMTP_KEY to enable emails');
}

// Async function to send email in background (non-blocking)
const sendEmailInBackground = async (messageData, tokenId) => {
  try {
    console.log(`📧 Attempting to send email for ${tokenId}...`);
    
    if (!brevoClient) {
      console.log('⚠️  Brevo API not configured - skipping email send');
      return;
    }

    const { name, email, message } = messageData;
    
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; border-radius: 10px;">
        <div style="background: linear-gradient(135deg, #1e40af 0%, #06b6d4 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">New Portfolio Message</h1>
          <p style="color: #e0f2fe; margin: 10px 0 0 0; font-size: 14px;">Token ID: ${tokenId}</p>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <div style="margin-bottom: 20px; padding: 15px; background: #dbeafe; border-radius: 8px; border-left: 4px solid #1e40af;">
            <p style="margin: 0; color: #1e3a8a; font-weight: bold; font-size: 14px;">🔖 Reference ID</p>
            <p style="margin: 5px 0 0 0; color: #1e40af; font-size: 18px; font-weight: bold; letter-spacing: 1px;">${tokenId}</p>
          </div>

          <div style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 2px solid #e5e7eb;">
            <p style="margin: 0 0 5px 0; color: #6b7280; font-size: 14px;">From:</p>
            <p style="margin: 0; color: #111827; font-size: 18px; font-weight: bold;">${name}</p>
          </div>
          
          <div style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 2px solid #e5e7eb;">
            <p style="margin: 0 0 5px 0; color: #6b7280; font-size: 14px;">Email:</p>
            <p style="margin: 0;">
              <a href="mailto:${email}" style="color: #1e40af; text-decoration: none; font-size: 16px;">${email}</a>
            </p>
          </div>
          
          <div style="margin-bottom: 20px;">
            <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 14px;">Message:</p>
            <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; border-left: 4px solid #1e40af;">
              <p style="margin: 0; color: #111827; line-height: 1.6; white-space: pre-wrap;">${message}</p>
            </div>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #e5e7eb; text-align: center;">
            <a href="mailto:${email}?subject=Re: Portfolio Contact [${tokenId}]" 
               style="display: inline-block; background: linear-gradient(135deg, #1e40af 0%, #06b6d4 100%); 
                      color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; 
                      font-weight: bold; font-size: 14px;">
              Reply to ${name}
            </a>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px;">
          <p>This message was sent from your portfolio contact form</p>
          <p>Reference: ${tokenId}</p>
        </div>
      </div>
    `;

    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    sendSmtpEmail.sender = { 
      email: process.env.EMAIL_FROM || 'solairaj495@gmail.com',
      name: 'Portfolio Contact Form'
    };
    sendSmtpEmail.to = [{ 
      email: process.env.EMAIL_TO || 'solairaj495@gmail.com'
    }];
    sendSmtpEmail.replyTo = { email: email, name: name };
    sendSmtpEmail.subject = `Portfolio Contact from ${name} [${tokenId}]`;
    sendSmtpEmail.htmlContent = htmlContent;
    sendSmtpEmail.textContent = `
New Portfolio Message
Token ID: ${tokenId}

From: ${name}
Email: ${email}

Message:
${message}

---
Reply to this email to respond to ${name}
Reference: ${tokenId}
    `;

    const result = await brevoClient.sendTransacEmail(sendSmtpEmail);
    
    // Update database to mark email as sent
    await Message.updateOne(
      { tokenId },
      { $set: { emailSent: true } }
    );
    
    console.log(`✅ Email sent successfully for ${tokenId}`);
    console.log(`📨 Message ID: ${result.messageId}`);
  } catch (emailError) {
    console.error(`❌ Email sending failed for ${tokenId}:`, emailError.message);
    console.error('   Error details:', emailError.response?.body || emailError);
    // Don't throw - this is background processing
  }
};

// Email endpoint
app.post('/api/send-email', async (req, res) => {
  const startTime = Date.now();
  const { name, email, message } = req.body;

  console.log(`📥 Received message from: ${name} (${email})`);

  // Validation
  if (!name || !email || !message) {
    return res.status(400).json({ 
      success: false, 
      message: 'All fields are required' 
    });
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ 
      success: false, 
      message: 'Invalid email format' 
    });
  }

  // Generate unique token ID
  const tokenId = `MSG-${nanoid(10)}`;

  try {
    // Save to MongoDB with timeout protection
    const savePromise = new Message({
      tokenId,
      name,
      email,
      message,
      emailSent: false
    }).save();

    // Set a timeout for database save (8 seconds max - increased for cold starts)
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Database timeout')), 8000)
    );

    await Promise.race([savePromise, timeoutPromise]);
    
    const dbTime = Date.now() - startTime;
    console.log(`📝 Message saved with Token ID: ${tokenId} (${dbTime}ms)`);

    // Send response immediately - don't wait for email
    res.status(200).json({ 
      success: true, 
      message: 'Message received! I\'ll get back to you soon.',
      tokenId: tokenId
    });

    const responseTime = Date.now() - startTime;
    console.log(`✅ Response sent in ${responseTime}ms`);

    // Send email in background (non-blocking)
    setImmediate(() => {
      sendEmailInBackground({ name, email, message }, tokenId);
    });

  } catch (error) {
    const errorTime = Date.now() - startTime;
    console.error(`❌ Database error (${errorTime}ms):`, error.message);
    
    // More specific error message for timeout
    const errorMessage = error.message === 'Database timeout' 
      ? 'Server is warming up. Please try again.'
      : 'Failed to save message. Please try again later.';
    
    res.status(500).json({ 
      success: false, 
      message: errorMessage
    });
  }
});

// Cleanup endpoint - remove status field from all messages
app.post('/api/cleanup/remove-status', async (req, res) => {
  try {
    const result = await Message.updateMany(
      {},
      { $unset: { status: "" } }
    );
    
    res.json({ 
      success: true, 
      message: 'Status field removed from all messages',
      modifiedCount: result.modifiedCount
    });
  } catch (error) {
    console.error('Cleanup error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Cleanup failed' 
    });
  }
});

// Get all messages endpoint (for debugging)
app.get('/api/messages', async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 }).limit(20);
    res.json({ 
      success: true, 
      count: messages.length,
      messages: messages 
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch messages' 
    });
  }
});

// Email configuration diagnostic endpoint
app.get('/api/email-config', async (req, res) => {
  const apiKey = process.env.BREVO_API_KEY || process.env.BREVO_SMTP_KEY;
  
  const config = {
    configured: !!brevoClient,
    method: 'Brevo REST API (HTTPS)',
    hasApiKey: !!apiKey,
    apiKeyPreview: apiKey ? apiKey.substring(0, 20) + '...' : 'Not set',
    emailFrom: process.env.EMAIL_FROM || 'solairaj495@gmail.com',
    emailTo: process.env.EMAIL_TO || 'solairaj495@gmail.com',
  };

  // Brevo API is always ready if configured (no connection test needed for REST API)
  if (brevoClient) {
    config.status = 'READY';
    config.message = 'Brevo API is configured and ready to send emails';
  } else {
    config.status = 'NOT_CONFIGURED';
    config.message = 'Brevo API not configured - add BREVO_API_KEY or BREVO_SMTP_KEY';
  }

  res.json(config);
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
