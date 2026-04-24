const nodemailer = require('nodemailer');

// Create reusable transporter using Gmail SMTP
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });
};

/**
 * Send email notification when a new contact form is submitted
 * @param {Object} contactData - The contact form data
 */
const sendContactNotification = async (contactData) => {
  const { name, email, phone, service, message } = contactData;

  const transporter = createTransporter();

  const mailOptions = {
    from: `"TechPrix Website" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_RECEIVER || process.env.EMAIL_USER,
    replyTo: email,
    subject: `🔔 New Contact: ${name} — ${service || 'General Inquiry'}`,
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a1a; border-radius: 16px; overflow: hidden; border: 1px solid #1a1a3a;">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%); padding: 32px 40px;">
          <h1 style="margin: 0; color: #fff; font-size: 22px; font-weight: 700;">
            ◆ TechPrix
          </h1>
          <p style="margin: 8px 0 0; color: rgba(255,255,255,0.85); font-size: 14px;">
            New Contact Form Submission
          </p>
        </div>

        <!-- Body -->
        <div style="padding: 32px 40px;">
          <h2 style="color: #fff; font-size: 18px; margin: 0 0 24px; font-weight: 600;">
            📬 You have a new message!
          </h2>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #1a1a3a; color: #888; font-size: 13px; width: 120px; vertical-align: top;">Name</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #1a1a3a; color: #fff; font-size: 14px; font-weight: 500;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #1a1a3a; color: #888; font-size: 13px; vertical-align: top;">Email</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #1a1a3a; color: #00d4ff; font-size: 14px;">
                <a href="mailto:${email}" style="color: #00d4ff; text-decoration: none;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #1a1a3a; color: #888; font-size: 13px; vertical-align: top;">Phone</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #1a1a3a; color: #fff; font-size: 14px;">${phone || 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #1a1a3a; color: #888; font-size: 13px; vertical-align: top;">Service</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #1a1a3a; color: #7c3aed; font-size: 14px; font-weight: 500;">${service || 'Not specified'}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: #888; font-size: 13px; vertical-align: top;">Message</td>
              <td style="padding: 12px 0; color: #fff; font-size: 14px; line-height: 1.6;">${message}</td>
            </tr>
          </table>

          <!-- Reply Button -->
          <div style="margin-top: 32px; text-align: center;">
            <a href="mailto:${email}?subject=Re: TechPrix Inquiry" 
               style="display: inline-block; padding: 12px 32px; background: linear-gradient(135deg, #00d4ff, #7c3aed); color: #fff; font-size: 14px; font-weight: 600; border-radius: 50px; text-decoration: none;">
              Reply to ${name}
            </a>
          </div>
        </div>

        <!-- Footer -->
        <div style="padding: 20px 40px; background: #050510; text-align: center;">
          <p style="margin: 0; color: #555; font-size: 12px;">
            This email was sent from the TechPrix website contact form.
          </p>
          <p style="margin: 4px 0 0; color: #444; font-size: 11px;">
            Submitted on ${new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}
          </p>
        </div>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email notification sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Email notification failed:', error.message);
    // Don't throw — we don't want email failure to break the contact submission
    return { success: false, error: error.message };
  }
};

/**
 * Send confirmation email to the client
 * @param {Object} clientData - The client data
 */
const sendClientConfirmation = async (clientData) => {
  const { name, email, service } = clientData;

  const transporter = createTransporter();

  const mailOptions = {
    from: `"TechPrix" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: '✅ We Received Your Message – TechPrix',
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a1a; border-radius: 16px; overflow: hidden; border: 1px solid #1a1a3a;">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%); padding: 32px 40px;">
          <h1 style="margin: 0; color: #fff; font-size: 22px; font-weight: 700;">
            ◆ TechPrix
          </h1>
          <p style="margin: 8px 0 0; color: rgba(255,255,255,0.85); font-size: 14px;">
            Thank You for Reaching Out!
          </p>
        </div>

        <!-- Body -->
        <div style="padding: 32px 40px;">
          <h2 style="color: #fff; font-size: 18px; margin: 0 0 16px; font-weight: 600;">
            Hi ${name},
          </h2>

          <p style="color: #ddd; font-size: 14px; line-height: 1.7; margin: 0 0 16px;">
            Thank you for your interest in TechPrix! We've received your ${
              service ? `${service}` : 'inquiry'
            } request and our team is reviewing it.
          </p>

          <p style="color: #ddd; font-size: 14px; line-height: 1.7; margin: 0 0 24px;">
            We typically respond within <strong>2 hours</strong> during business hours. If it's urgent, feel free to reach out directly.
          </p>

          <div style="background: #1a1a3a; padding: 16px; border-radius: 8px; margin: 24px 0;">
            <p style="color: #00d4ff; font-size: 13px; margin: 0;">
              📧 <strong>Direct Email:</strong> <a href="mailto:contact@techprix.com" style="color: #00d4ff; text-decoration: none;">contact@techprix.com</a>
            </p>
            <p style="color: #888; font-size: 12px; margin: 8px 0 0;">
              We look forward to working with you!
            </p>
          </div>
        </div>

        <!-- Footer -->
        <div style="padding: 20px 40px; background: #050510; text-align: center;">
          <p style="margin: 0; color: #555; font-size: 12px;">
            © 2024 TechPrix. All rights reserved.
          </p>
        </div>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Client confirmation email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Client confirmation email failed:', error.message);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendContactNotification,
  sendClientConfirmation,
};
