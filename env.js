const z = require('zod');
const packageJSON = require('./package.json');
const validationSchema = z.object({
  EXPO_PUBLIC_APP_NAME: z.string(),
  EXPO_PUBLIC_BUNDLE_ID: z.string(),
  EXPO_PUBLIC_PACKAGE: z.string(),
  EXPO_PUBLIC_SUPABASE_URL: z.string().url(),
  EXPO_PUBLIC_SUPABASE_ANON_KEY: z.string(),
  VERSION: z.string(),
  NODE_ENV: z.union([z.literal('development'), z.literal('production')]).default('development'),
});

/**
 * @type {Record<keyof z.infer<typeof validationSchema> , unknown>}
 */
const _clientEnv = {
  EXPO_PUBLIC_APP_NAME: process.env.EXPO_PUBLIC_APP_NAME,
  EXPO_PUBLIC_BUNDLE_ID: process.env.EXPO_PUBLIC_BUNDLE_ID,
  EXPO_PUBLIC_PACKAGE: process.env.EXPO_PUBLIC_PACKAGE,
  EXPO_PUBLIC_SUPABASE_URL: process.env.EXPO_PUBLIC_SUPABASE_URL,
  EXPO_PUBLIC_SUPABASE_ANON_KEY: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
  VERSION: packageJSON.version,
  NODE_ENV: process.env.NODE_ENV,
};

// Validate `process.env` against our schema
const parsedEnv = validationSchema.safeParse(_clientEnv);
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
