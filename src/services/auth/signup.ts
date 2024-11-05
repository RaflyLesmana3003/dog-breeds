import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../main';

export async function signupWithEmailAndPassword(email: string, password: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Signup error:', error);
    throw error;
  }
}
