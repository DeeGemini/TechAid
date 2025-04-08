"""
Email authentication utilities.
"""
import yagmail
from app.core.config import EMAIL_PASSWORD

def send_email_verification_link(user_email: str, token: str) -> bool:
    """Send email verification link to email."""
    sender_email = "carolmkaysmamba14@gmail.con"  # Use a consistent domain-matching email
    subject = "Verify your email for TechAid"
    
    # Use HTML properly with text alternative (for accessibility)
    html_content = f"""
    <html>
      <body>
        <p>Hello there!</p>
        <p>To verify your email and continue to YourApp, please click the link below:</p>
        <p><a href='https://yourdomain.com/auth/email/verify?token={token}'>Verify your email address</a></p>
        <p>This link will expire in 30 minutes for security reasons.</p>
        <p>If you didn't request this, you can safely ignore this email.</p>
      </body>
    </html>
    """
    
    text_content = f"""
    Hello there!
    
    To verify your email and continue to YourApp, please use this link:
    https://yourdomain.com/auth/email/verify?token={token}
    
    This link will expire in 30 minutes for security reasons.
    
    If you didn't request this, you can safely ignore this email.
    """
    
    try:
        yag = yagmail.SMTP(sender_email, EMAIL_PASSWORD)
        yag.send(to=user_email, subject=subject, contents=[text_content, html_content])
        yag.close()
        return True
    except Exception as e:
        # Log the error properly rather than printing
        print(f"Error sending email: {e}")
        return False