import { connectAuthEmulator, getAuth } from "firebase/auth";
import { initializeApp, getApps } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
};

const firebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

const authEmulatorHost = import.meta.env.VITE_FIREBASE_AUTH_EMULATOR_HOST;

const firebaseAuth = getAuth(firebaseApp);

if (authEmulatorHost && process.env.NODE_ENV === "development") {
  connectAuthEmulator(firebaseAuth, `http://${authEmulatorHost}`);
}

export { firebaseAuth };
