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
    from: `"Pro Programmer Website" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_RECEIVER || process.env.EMAIL_USER,
    replyTo: email,
    subject: `🔔 New Contact: ${name} — ${service || 'General Inquiry'}`,
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a1a; border-radius: 16px; overflow: hidden; border: 1px solid #1a1a3a;">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%); padding: 32px 40px;">
          <h1 style="margin: 0; color: #fff; font-size: 22px; font-weight: 700;">
            ◆ Pro Programmer
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
            <a href="mailto:${email}?subject=Re: Pro Programmer Inquiry" 
               style="display: inline-block; padding: 12px 32px; background: linear-gradient(135deg, #00d4ff, #7c3aed); color: #fff; font-size: 14px; font-weight: 600; border-radius: 50px; text-decoration: none;">
              Reply to ${name}
            </a>
          </div>
        </div>

        <!-- Footer -->
        <div style="padding: 20px 40px; background: #050510; text-align: center;">
          <p style="margin: 0; color: #555; font-size: 12px;">
            This email was sent from the Pro Programmer website contact form.
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
 * Send confirmation email to the client after they submit the contact form
 * @param {Object} contactData - The contact form data
 */
const sendClientConfirmation = async (contactData) => {
  const { name, email, service } = contactData;

  const transporter = createTransporter();

  const mailOptions = {
    from: `"ProProgrammer" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `✅ We received your message, ${name}! — ProProgrammer`,
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e5e7eb;">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #6366F1 0%, #A78BFA 100%); padding: 40px 40px 32px;">
          <h1 style="margin: 0; color: #fff; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">
            ◆ ProProgrammer
          </h1>
          <p style="margin: 10px 0 0; color: rgba(255,255,255,0.9); font-size: 15px; font-weight: 500;">
            Premium Digital Agency
          </p>
        </div>

        <!-- Body -->
        <div style="padding: 36px 40px;">
          <h2 style="color: #0a0a1a; font-size: 20px; margin: 0 0 8px; font-weight: 700;">
            Hi ${name}! 👋
          </h2>
          <p style="color: #4b5563; font-size: 15px; line-height: 1.7; margin: 0 0 20px;">
            Thank you for reaching out to us! We've successfully received your message${service ? ` regarding <strong style="color: #6366F1;">${service}</strong>` : ''}.
          </p>

          <!-- Highlight Box -->
          <div style="background: linear-gradient(135deg, #EEF2FF, #F5F3FF); border-radius: 12px; padding: 24px; border-left: 4px solid #6366F1; margin: 24px 0;">
            <p style="margin: 0; color: #1e1b4b; font-size: 16px; font-weight: 600;">
              ⏰ We'll get back to you within 2 hours!
            </p>
            <p style="margin: 8px 0 0; color: #4338CA; font-size: 14px; line-height: 1.6;">
              One of our team members will review your message and reach out to you shortly. We value your time and aim to respond as quickly as possible.
            </p>
          </div>

          <p style="color: #4b5563; font-size: 14px; line-height: 1.7; margin: 20px 0 0;">
            In the meantime, here's what you can expect:
          </p>

          <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
            <tr>
              <td style="padding: 10px 0; color: #6366F1; font-size: 18px; width: 32px; vertical-align: top;">✓</td>
              <td style="padding: 10px 0; color: #374151; font-size: 14px; line-height: 1.5;">A dedicated team member will be assigned to your inquiry</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #6366F1; font-size: 18px; width: 32px; vertical-align: top;">✓</td>
              <td style="padding: 10px 0; color: #374151; font-size: 14px; line-height: 1.5;">We'll provide a free initial consultation & project estimate</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #6366F1; font-size: 18px; width: 32px; vertical-align: top;">✓</td>
              <td style="padding: 10px 0; color: #374151; font-size: 14px; line-height: 1.5;">No obligations — just a friendly conversation about your goals</td>
            </tr>
          </table>

          <p style="color: #6b7280; font-size: 14px; line-height: 1.7; margin: 20px 0 0;">
            If your request is urgent, feel free to reply directly to this email or reach us at 
            <a href="mailto:proprogrammer618@gmail.com" style="color: #6366F1; text-decoration: none; font-weight: 600;">proprogrammer618@gmail.com</a>.
          </p>

          <!-- Warm Regards -->
          <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #e5e7eb;">
            <p style="color: #374151; font-size: 14px; margin: 0; line-height: 1.6;">
              Warm regards,<br/>
              <strong style="color: #0a0a1a;">The ProProgrammer Team</strong>
            </p>
          </div>
        </div>

        <!-- Footer -->
        <div style="padding: 20px 40px; background: #f9fafb; text-align: center; border-top: 1px solid #e5e7eb;">
          <p style="margin: 0; color: #9ca3af; font-size: 12px;">
            © ${new Date().getFullYear()} ProProgrammer — Premium Digital Agency
          </p>
          <p style="margin: 6px 0 0; color: #9ca3af; font-size: 11px;">
            This is an automated confirmation. You're receiving this because you submitted a message on our website.
          </p>
        </div>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Client confirmation email sent to:', email, info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Client confirmation email failed:', error.message);
    return { success: false, error: error.message };
  }
};

module.exports = { sendContactNotification, sendClientConfirmation };
