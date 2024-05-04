const z = require('zod');

const validationSchema = z.object({
  EXPO_PUBLIC_APP_NAME: z.string(),
  EXPO_PUBLIC_API_URL: z.string().url(),
  EXPO_PUBLIC_BUNDLE_ID: z.string().min(1),
  EXPO_PUBLIC_SUPABASE_URL: z.string().url(),
  EXPO_PUBLIC_SUPABASE_ANON_KEY: z.string(),
  NODE_ENV: z.union([z.literal('development'), z.literal('production')]).default('development'),
});

// Validate `process.env` against our schema
const parsedEnv = validationSchema.safeParse(process.env);
if (parsedEnv.success === false) {
  console.error(
    `❌ Invalid environment variables in .env.${process.env.NODE_ENV}`,
    parsedEnv.error.flatten().fieldErrors
  );
  throw new Error('Invalid environment variables, Check terminal for more details ');
}

const env = parsedEnv.data;

// Export the result so we can use it in the project
module.exports = {
  env,
};
