import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../main';
import { useAuth } from '../../lib/isAuthenticated';

export async function addFavorite(breedId: string) {
  const { currentUser } = useAuth();
  if (!currentUser) {
    throw new Error('User not logged in');
  }

  try {
    await setDoc(doc(db, 'favorites', `${currentUser.uid}-${breedId}`), {
      breedId,
      userId: currentUser.uid,
    });
  } catch (error) {
    console.error('Error adding favorite:', error);
    throw error;
  }
}
