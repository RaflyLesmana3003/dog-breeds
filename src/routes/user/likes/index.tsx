import { createFileRoute, Navigate } from '@tanstack/react-router';
import Feeds from '../../../components/feeds/feeds';
import { useFavorites } from '../../../services/favorite/get';

export const Route = createFileRoute('/user/likes/')({
  component: Index,
})

function Index() {
  const { favorites, isLoading, refetch } = useFavorites()
  console.log("🚀 ~ Index ~ favorites:", favorites)

  if (!isLoading && favorites.length > 0) {
    return <Feeds isLikedFavorite/>
  }

  return <Navigate to="/user" replace={true} />
}
