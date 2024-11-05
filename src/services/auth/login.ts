import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../main';

export async function loginWithEmailAndPassword(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}
