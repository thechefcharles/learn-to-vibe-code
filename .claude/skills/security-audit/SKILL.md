---
name: security-audit
description: Run comprehensive security audit before production deployment
---

# Security Audit

Comprehensive security audit covering OWASP Top 10, authentication, authorization, data protection, and accreditation compliance.

## Steps

1. **Code review for security issues:**
   - Check for SQL injection vulnerabilities
   - Check for XSS vulnerabilities in templates
   - Check for CSRF protection on state-changing operations
   - Verify secrets are not in code (use .env.local)
   - Check for hardcoded API keys or tokens

2. **Authentication & Authorization:**
   - Verify sign-up RLS policies allow user registration
   - Verify user can only read/write their own data
   - Verify admin endpoints require instructor role
   - Check rate limiting on auth endpoints
   - Verify email verification is enforced
   - Check password complexity requirements

3. **Data Protection:**
   - Verify PII is encrypted at rest (Supabase encryption)
   - Verify HTTPS is enforced (no HTTP)
   - Check that learner records are properly isolated
   - Verify quiz answer keys are server-side only
   - Verify capstone grades are protected

4. **Accreditation Compliance:**
   - Verify all learner attempts are recorded
   - Verify quiz scores persist correctly
   - Verify deliverable submissions are tracked
   - Verify capstone rubric scoring is server-only
   - Verify certificates include completion metadata

5. **API Security:**
   - Check that all endpoints validate input
   - Check that error messages don't leak sensitive info
   - Verify webhook signatures (Stripe)
   - Check for exposed sensitive headers
   - Verify CORS policy is restrictive

6. **Report findings:**
   - List all vulnerabilities by severity (Critical/Important/Minor)
   - Provide fix recommendations
   - Flag any issues blocking production deployment

## Usage

```bash
/security-audit
```

## When to use

- Before launching to production
- After major code changes
- Monthly security checkup
- Before handling payment data
- Before accepting learner enrollments

## Critical checks (must pass before deploy)

✓ No SQL injection vulnerabilities  
✓ No XSS vulnerabilities  
✓ RLS policies correct  
✓ Secrets not in code  
✓ Rate limiting enabled  
✓ Email verification enforced  
✓ Webhook signatures verified  
✓ Error messages don't leak info  
