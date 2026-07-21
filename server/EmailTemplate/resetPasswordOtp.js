export function callresetPwTemplate(otp, customerName) { // Removed 'async'
     return `
         <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 30px; background: #ffffff; border-radius: 16px; box-shadow: 0 4px 24px rgba(0,0,0,0.06);">
    
    <!-- Header -->
    <div style="text-align: center; margin-bottom: 32px;">
      <h1 style="color: #2563EB; font-size: 28px; margin: 0; font-weight: 700;">🔐 Quick Hire</h1>
      <p style="color: #6B7280; font-size: 16px; margin: 4px 0 0 0;">Security Verification</p>
    </div>
    
    <!-- Body -->
    <h2 style="color: #1F2937; font-size: 22px; margin: 0 0 8px 0;">Reset Your Password</h2>
    <p style="color: #4B5563; font-size: 16px; margin: 0 0 24px 0; line-height: 1.6;">
      <!-- FIXED: customerName instead of customerNamer -->
      Hi <strong>${customerName || 'User'}</strong>,
    </p>
    <p style="color: #4B5563; font-size: 16px; margin: 0 0 24px 0; line-height: 1.6;">
      We received a request to reset your password. Use the verification code below:
    </p>
    
    <!-- OTP Code -->
    <div style="background: #F3F4F6; border-radius: 12px; padding: 24px; text-align: center; margin: 24px 0; border: 2px dashed #D1D5DB;">
      <p style="color: #6B7280; font-size: 12px; margin: 0 0 8px 0; letter-spacing: 2px; text-transform: uppercase;">Verification Code</p>
      <div style="font-size: 40px; font-weight: 800; color: #2563EB; letter-spacing: 10px; font-family: monospace; background: white; padding: 12px 24px; border-radius: 8px; display: inline-block;">
        ${otp}
      </div>
      <p style="color: #6B7280; font-size: 13px; margin: 12px 0 0 0;">
        ⏱️ Expires in <strong>10 minutes</strong>
      </p>
    </div>
    
    <p style="color: #6B7280; font-size: 14px; margin: 0 0 8px 0; line-height: 1.6;">
      If you didn't request this, please ignore this email.
    </p>
    
    <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 32px 0 20px 0;">
    
    <p style="color: #9CA3AF; font-size: 13px; margin: 0; text-align: center;">
      Need help? <a href="mailto:support@quickhire.com" style="color: #2563EB; text-decoration: none;">support@quickhire.com</a>
    </p>
    <p style="color: #9CA3AF; font-size: 12px; margin: 8px 0 0 0; text-align: center;">
      &copy; ${new Date().getFullYear()} Quick Hire. All rights reserved.
    </p>
  </div>
        `
}