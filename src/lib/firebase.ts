
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};


// For client-side, check and log if any NEXT_PUBLIC_ vars are missing from process.env
if (typeof window !== 'undefined') {
  const requiredPublicEnvVars = [
    'NEXT_PUBLIC_FIREBASE_API_KEY',
    'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
    'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
    'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
    'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
    'NEXT_PUBLIC_FIREBASE_APP_ID',
  ];
  const missingPublicVars = requiredPublicEnvVars.filter(envVar => !process.env[envVar]);
  if (missingPublicVars.length > 0) {
    console.error(
      `Firebase Configuration Error: The following required environment variables are missing from process.env: ${missingPublicVars.join(', ')}. ` +
      `Please ensure they are set in your .env.local file and correctly prefixed with NEXT_PUBLIC_.`
    );
  }
}

// Check if all firebaseConfig values are present and are non-empty strings
const allConfigValuesPresent = Object.entries(firebaseConfig).every(([key, value]) => {
  const isPresent = typeof value === 'string' && value !== '';
  if (!isPresent && typeof window !== 'undefined') {
    // This log helps identify which specific value in firebaseConfig is problematic
    console.warn(`Firebase Configuration Warning: Value for ${key} is missing or empty. Corresponding NEXT_PUBLIC_FIREBASE_ variable might be unset.`);
  }
  return isPresent;
});


let app: FirebaseApp | undefined;
let auth: Auth | undefined;

if (allConfigValuesPresent) {
  if (!getApps().length) {
    try {
      app = initializeApp(firebaseConfig);
    } catch (e) {
        console.error("Error initializing Firebase app:", e);
        // app remains undefined
    }
  } else {
    app = getApp();
  }
  
  if (app) {
    try {
        auth = getAuth(app);
    } catch (e) {
        console.error("Error getting Firebase auth instance:", e);
        // auth remains undefined
    }
  }

} else {
  if (typeof window !== 'undefined') {
    console.error(
      "Firebase initialization skipped due to missing or empty configuration values in firebaseConfig. " +
      "This typically means one or more NEXT_PUBLIC_FIREBASE_ environment variables are undefined or empty. " +
      "Please check your .env.local file and ensure all Firebase config variables are correctly set."
    );
  }
}

export { app, auth };
