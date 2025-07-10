const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

admin.initializeApp();

// Configure your email service (Gmail example)
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: functions.config().email.user, // Set via: firebase functions:config:set email.user="your-email@gmail.com"
    pass: functions.config().email.pass  // Set via: firebase functions:config:set email.pass="your-app-password"
  }
});

exports.sendRegistrationEmail = functions.firestore
  .document('registrations/{registrationId}')
  .onCreate(async (snap, context) => {
    const registration = snap.data();
    
    const emailTemplate = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white; padding: 30px; border-radius: 12px 12px 0 0; text-align: center; }
          .content { background: white; padding: 30px; border: 1px solid #e5e7eb; }
          .footer { background: #f9fafb; padding: 20px; border-radius: 0 0 12px 12px; text-align: center; color: #6b7280; }
          .event-details { background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .button { display: inline-block; background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Registration Confirmed!</h1>
            <p>You're all set for the event</p>
          </div>
          
          <div class="content">
            <p>Hi <strong>${registration.userName}</strong>,</p>
            
            <p>Great news! Your registration for <strong>${registration.eventName}</strong> has been confirmed.</p>
            
            <div class="event-details">
              <h3>📅 Event Details</h3>
              <p><strong>Event:</strong> ${registration.eventName}</p>
              <p><strong>Date:</strong> ${registration.eventDate}</p>
              <p><strong>Time:</strong> ${registration.eventTime}</p>
              <p><strong>Location:</strong> ${registration.eventLocation}</p>
            </div>
            
            <p><strong>Your Registration Details:</strong></p>
            <ul>
              <li><strong>Name:</strong> ${registration.userName}</li>
              <li><strong>Email:</strong> ${registration.userEmail}</li>
              <li><strong>Phone:</strong> ${registration.userPhone}</li>
              ${registration.userBranch ? `<li><strong>Branch:</strong> ${registration.userBranch}</li>` : ''}
              <li><strong>Year:</strong> ${registration.userYear}</li>
            </ul>
            
            <p>Please save this email for your records. If you need to make any changes or have questions, please contact the event organizers.</p>
            
            <p>We look forward to seeing you at the event!</p>
          </div>
          
          <div class="footer">
            <p>This email was sent from ClubMate - Your Smart Campus Companion</p>
            <p>© ${new Date().getFullYear()} ClubMate. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const mailOptions = {
      from: `ClubMate <${functions.config().email.user}>`,
      to: registration.userEmail,
      subject: `Registration Confirmed: ${registration.eventName}`,
      html: emailTemplate
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log('Registration email sent successfully to:', registration.userEmail);
    } catch (error) {
      console.error('Error sending registration email:', error);
    }
  });