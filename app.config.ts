import type { ConfigContext, ExpoConfig } from '@expo/config';
import { env } from './env';
export default ({ config }: ConfigContext): ExpoConfig => {
  return {
    ...config,
    name: env.EXPO_PUBLIC_APP_NAME,
    slug: 'food-app-supabase',
    version: env.VERSION,
    scheme: 'food-app-supabase',
    web: {
      bundler: 'metro',
      output: 'static',
      favicon: './assets/app/favicon.png',
    },
    plugins: [
      'expo-router',
      [
        'app-icon-badge',
        {
          enabled: env.NODE_ENV !== 'production',
          badges: [
            {
              text: env.VERSION,
              type: 'ribbon',
              color: 'white',
            },
            {
              text: env.NODE_ENV,
              type: 'banner',
              color: 'white',
            },
          ],
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
      tsconfigPaths: true,
    },
    orientation: 'portrait',
    icon: './assets/app/icon.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/app/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: env.EXPO_PUBLIC_BUNDLE_ID,
    },
    android: {
      package: env.EXPO_PUBLIC_BUNDLE_ID,
      adaptiveIcon: {
        foregroundImage: './assets/app/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
    },
    extra: {
      router: {
        origin: false,
      },
      eas: {
        projectId: 'c25ceef4-7353-4c6f-a3bf-26250e6e9239',
      },
    },
  };
};
