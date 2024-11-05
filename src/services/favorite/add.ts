import { doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';

import { useAuth } from '../../lib/isAuthenticated';
import { db } from '../../main';

export const useAddFavorite = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useAuth();

  const addFavorite = async (breeds: { breed: string, imageUrl: string }[]) => {
    if (!currentUser) {
      throw new Error('User not logged in');
    }

    setIsLoading(true);
    try {
      await Promise.all(breeds.map(async (breed) => {
        await setDoc(doc(db, 'favorites', `${currentUser.uid}-${breed.breed}`), {
          breed: breed.breed,
          userId: currentUser.uid,
          userName: currentUser.displayName,
          imageUrl: breed.imageUrl,
          totalLikes: 0,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }));
    } catch (error) {
      console.log('Error adding favorites:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { addFavorite, isLoading };
};
