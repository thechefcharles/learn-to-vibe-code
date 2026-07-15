export function validateEnv() {
  const required = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'SUPABASE_SERVICE_ROLE_KEY',
    'STRIPE_SECRET_KEY',
    'NEXT_PUBLIC_SITE_URL',
  ];

  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}
