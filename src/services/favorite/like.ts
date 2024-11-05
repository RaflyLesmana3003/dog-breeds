import { arrayRemove, arrayUnion, doc, getDoc, increment, updateDoc } from "firebase/firestore";
import { db } from "../../main";
import { useAuth } from "../../lib/isAuthenticated";
import { useState } from "react";

export const useLikeFavorite = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { currentUser } = useAuth();
  
    const likeFavorite = async (id: string) => {
      if (!currentUser) {
        throw new Error('User not logged in');
      }
  
      setIsLoading(true);
      try {
        const favoriteRef = doc(db, 'favorites', id);
        const favoriteDoc = await getDoc(favoriteRef);
  
        // Check if user has already liked
        if (favoriteDoc.exists() && favoriteDoc.data().likedBy?.includes(currentUser.uid)) {
          console.log('User has already liked this item.');
          return;
        }
  
        // Proceed to like if the user hasn't already
        await updateDoc(favoriteRef, {
          totalLikes: increment(1),
          updatedAt: new Date(),
          likedBy: arrayUnion(currentUser.uid),
        });
      } catch (error) {
        console.log('Error liking favorite:', error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    };
  
    const unlikeFavorite = async (id: string) => {
      if (!currentUser) {
        throw new Error('User not logged in');
      }
  
      setIsLoading(true);
      try {
        const favoriteRef = doc(db, 'favorites', id);
        const favoriteDoc = await getDoc(favoriteRef);
  
        // Check if user has actually liked
        if (favoriteDoc.exists() && favoriteDoc.data().likedBy?.includes(currentUser.uid)) {
          // Proceed to unlike if the user has liked
          await updateDoc(favoriteRef, {
            totalLikes: increment(-1),
            updatedAt: new Date(),
            likedBy: arrayRemove(currentUser.uid),
          });
        } else {
          console.log("User hasn't liked this item yet.");
        }
      } catch (error) {
        console.log('Error unliking favorite:', error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    };
  
    return { likeFavorite, unlikeFavorite, isLoading };
  };

