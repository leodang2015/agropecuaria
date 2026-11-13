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

export const isFirebaseConfigured = Object.values(firebaseConfig).every(value =>
  typeof value === 'string' && value.trim() && !value.startsWith('YOUR_')
);
const auth = isFirebaseConfigured ? getAuth(initializeApp(firebaseConfig)) : null;
const localAccountsKey = 'agro_local_auth';

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

async function hashLocalPassword(password, salt, iterations) {
  if (!globalThis.crypto?.subtle || !globalThis.crypto?.getRandomValues) {
    throw new Error('El registro local requiere un navegador moderno y una conexión segura (HTTPS o localhost).');
  }
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits({
    name: 'PBKDF2',
    salt,
    iterations,
    hash: 'SHA-256'
  }, key, 256);
  return Array.from(new Uint8Array(bits), byte => byte.toString(16).padStart(2, '0')).join('');
}

function getLocalAccounts() {
  try {
    const accounts = JSON.parse(localStorage.getItem(localAccountsKey) || '[]');
    return Array.isArray(accounts) ? accounts : [];
  } catch (error) {
    console.error('Could not read local account records:', error);
    throw new Error('No se pudieron leer las cuentas guardadas en este navegador.');
  }
}

export async function registerLocally(name, email, password) {
  const normalizedEmail = email.trim().toLowerCase();
  const accounts = getLocalAccounts();
  if (accounts.some(account => account.email === normalizedEmail)) {
    throw Object.assign(new Error('Ya existe una cuenta con ese correo.'), { code: 'auth/email-already-in-use' });
  }

  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iterations = 120000;
  const passwordHash = await hashLocalPassword(password, salt, iterations);
  const user = {
    uid: `local-${crypto.randomUUID()}`,
    email: normalizedEmail,
    displayName: name.trim()
  };
  accounts.push({
    ...user,
    salt: Array.from(salt, byte => byte.toString(16).padStart(2, '0')).join(''),
    iterations,
    passwordHash
  });
  localStorage.setItem(localAccountsKey, JSON.stringify(accounts));
  return user;
}

export async function loginLocally(email, password) {
  const normalizedEmail = email.trim().toLowerCase();
  const account = getLocalAccounts().find(item => item.email === normalizedEmail);
  if (!account) {
    throw Object.assign(new Error('El correo o la contraseña no son correctos.'), { code: 'auth/invalid-credential' });
  }

  const salt = Uint8Array.from(account.salt.match(/.{2}/g), byte => parseInt(byte, 16));
  const passwordHash = await hashLocalPassword(password, salt, account.iterations);
  if (passwordHash !== account.passwordHash) {
    throw Object.assign(new Error('El correo o la contraseña no son correctos.'), { code: 'auth/invalid-credential' });
  }
  return { uid: account.uid, email: account.email, displayName: account.displayName };
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
  return messages[error.code] || error.message || `No se pudo autenticar la cuenta${error.code ? ` (${error.code})` : ''}.`;
}
