import { createFileRoute, Navigate } from '@tanstack/react-router';
import Feeds from '../../../components/feeds/feeds';
import { useFavorites } from '../../../services/favorite/get';
import { useLikedFavorites } from '../../../services/favorite/getLiked';

export const Route = createFileRoute('/user/likes/')({
  component: Index,
})

function Index() {
  const { favorites, isLoading, refetch } = useLikedFavorites();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (favorites.length === 0) {
    return <div className='mt-8'>You have not liked any breeds yet.</div>;
  }

  return <Feeds isLikedFavorite />;
}
