import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

export const isFirebaseConfigured = Object.values(firebaseConfig).every(Boolean);
const auth = isFirebaseConfigured ? getAuth(initializeApp(firebaseConfig)) : null;

function requireAuth() {
  if (!auth) {
    throw new Error('Configura las variables VITE_FIREBASE_* y habilita Email/Password y Google en Firebase Authentication.');
  }
  return auth;
}

export function watchAuthState(onChange, onError) {
  return onAuthStateChanged(requireAuth(), onChange, onError);
}

export async function registerWithPassword(name, email, password) {
  const credential = await createUserWithEmailAndPassword(requireAuth(), email, password);
  await updateProfile(credential.user, { displayName: name });
  return credential.user;
}

export async function loginWithPassword(email, password) {
  const credential = await signInWithEmailAndPassword(requireAuth(), email, password);
  return credential.user;
}

export async function loginWithGoogle() {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  const credential = await signInWithPopup(requireAuth(), provider);
  return credential.user;
}

export function logoutFromFirebase() {
  return signOut(requireAuth());
}

export function getAuthErrorMessage(error) {
  const messages = {
    'auth/email-already-in-use': 'Ya existe una cuenta con ese correo. Inicia sesión.',
    'auth/invalid-email': 'El correo electrónico no es válido.',
    'auth/invalid-credential': 'El correo o la contraseña no son correctos.',
    'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres.',
    'auth/operation-not-allowed': 'Habilita el proveedor de acceso correspondiente en Firebase Authentication.',
    'auth/popup-closed-by-user': 'Se cerró la ventana de Google antes de completar el acceso.',
    'auth/popup-blocked': 'El navegador bloqueó la ventana de Google. Permite las ventanas emergentes e inténtalo de nuevo.',
    'auth/unauthorized-domain': 'Agrega este dominio a los dominios autorizados en Firebase Authentication.',
    'auth/network-request-failed': 'No se pudo conectar con Firebase. Revisa tu conexión e inténtalo de nuevo.'
  };
  return messages[error.code] || `No se pudo autenticar la cuenta${error.code ? ` (${error.code})` : ''}.`;
}
