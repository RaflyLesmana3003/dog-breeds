import { collection, DocumentData, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { useAuth } from '../../lib/isAuthenticated';
import { db } from '../../main';
import { Favorite } from '../../types/favorite';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useAuth();

  const fetchFavorites = async () => {
    setIsLoading(true);
    try {
      const q = query(collection(db, 'favorites'), where('userId', '==', currentUser.uid));
      const querySnapshot = await getDocs(q);
      const fetchedFavorites = querySnapshot.docs.map((doc: DocumentData) => ({
        breed: doc.data().breed,
        imageUrl: doc.data().imageUrl,
        id: doc.id,
        userId: doc.data().userId,
        userName: doc.data().userName,
        totalLikes: doc.data().totalLikes,
        createdAt: doc.data().createdAt,
        updatedAt: doc.data().updatedAt,
        isLikedByMe: doc.data().likedBy?.includes(currentUser.uid) || false,
      }));
      setFavorites(fetchedFavorites);
    } catch (error) {
      console.log('Error getting favorites:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    fetchFavorites();
  }, [currentUser]);

  const refetch = () => {
    fetchFavorites();
  };

  return { favorites, isLoading, refetch };
};
