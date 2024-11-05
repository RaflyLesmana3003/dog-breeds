import { timeAgo } from "../../lib/timeHistory";
import { useAllFavorites } from "../../services/favorite/getAll";
import { Lens } from "../../src/components/ui/lens";
import { Button } from "../ui/button";
import BlurFade from "../../src/components/ui/blur-fade";
import { Heart } from "lucide-react";
import { useLikeFavorite } from "../../services/favorite/like";

function Feeds() {
  const { favorites, isLoading, refetch } = useAllFavorites();

  const {likeFavorite, unlikeFavorite} = useLikeFavorite()
  return (
    <div className="columns-4 gap-2 mt-8">
      {favorites.map((favorite, index) => (
        <BlurFade 
        key={index}
        delay={0.25 + index * 0.05} 
        inView
        className="my-2"
      >
        <div
          key={index}
          className="w-full relative rounded-lg overflow-hidden max-w-md bg-white border border-secondary to-primary p-2"
        >
          <div className="relative z-10">
            <Lens>
              <img
                src={favorite.imageUrl}
                alt="image"
                width={500}
                height={500}
                className="rounded-lg"
              />
            </Lens>

            <div className="py-4 relative z-20 flex justify-between items-center mx-4">
              <div>
                <h2 className="text-2xl text-left font-bold">{favorite.breed}</h2>
                <p className="text-left">
                  {favorite.userName}
                </p>
                <p className="text-left text-muted-foreground">
                  {timeAgo(new Date(favorite.createdAt.seconds * 1000))}
                </p>
              </div>
              <Button variant={favorite.isLikedByMe ? 'default' : 'ghost'} className="rounded-full" onClick={async () => {
                if (favorite.isLikedByMe) {
                  await unlikeFavorite(favorite.id).then(() => {
                    refetch()
                  })
                } else {
                  await likeFavorite(favorite.id).then(() => {
                    refetch()
                  })
                }
              }}>
                <Heart/> {favorite.totalLikes} Likes
              </Button>
            </div>
          </div>
        </div>
        </BlurFade>
      ))}
    </div>
  );
}

export default Feeds;
