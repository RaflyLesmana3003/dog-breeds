import { createFileRoute, Navigate } from '@tanstack/react-router'
import { useAuth } from '../../lib/isAuthenticated'
import Heart from '../../assets/icons/Heart.svg'
import { useEffect, useState } from 'react'
import { getAllBreeds } from '../../services/breeds/getAll'
import BreedsCard from '../../components/breeds/breedsCard'
import usePagination from '../../hooks/usePagination'
import Pagination from '../../components/ui/pagination'
import BlurFade from '../../src/components/ui/blur-fade'
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '../../src/components/ui/drawer'
import { Button } from '../../components/ui/button'
import { ScrollArea } from '../../src/components/ui/scroll-area'
import { BreedInfo } from '../../components/breeds/BreedInfo'
import ShineBorder from '../../src/components/ui/shine-border'
import { Avatar, AvatarImage } from '../../components/ui/avatar'

export const Route = createFileRoute('/user/')({
  component: Index,
})

function Index() {
  const [open, setOpen] = useState(false)
  const [breeds, setBreeds] = useState<{ name: string, imageUrl: string }[]>([]);
  const [selectedFavorite, setSelectedFavorite] = useState<{breed: string, imageUrl: string}[]>([]);
  const itemsPerPage = 20;

  const { userLoggedIn, loading, currentUser } = useAuth();
  if (!loading && !userLoggedIn) {
    return <Navigate to="/login" replace={true} />;
  }

  useEffect(() => {
    async function fetchBreeds() {
      const response = await getAllBreeds();
      setBreeds(Object.keys(response.message).map((breed) => ({ name: breed, imageUrl: '' })));
    }
    fetchBreeds();
  }, []);

  const {
    currentData: breedsForPage,
    currentPage,
    totalPages,
    goToPage,
  } = usePagination(breeds, itemsPerPage);

  const handlePageChange = (page: number) => {
    goToPage(page)
  }

  return (
    <div className="p-2">
      <BlurFade delay={0.25} inView>
        <h1 className='text-center'>
        Welcome {currentUser?.displayName ?? ''}
        </h1>
      </BlurFade>
      <BlurFade delay={0.25 * 2} inView>
        <p className="text-center text-sm text-muted-foreground">
          To get started, please select your 3 favorite dog breeds. <br/>This will help us personalize your experience and show you the most relevant content.
        </p>
      
      <div className="flex flex-col gap-3 items-center justify-center my-3 md:flex-row">
        <ShineBorder
          className="text-center text-2xl font-bold capitalize h-full flex justify-center !min-w-0 w-72 !p-4"
          borderWidth={2}
          color={["rgba(221, 231, 199, 1)", "rgba(227, 150, 15, 1)", "rgba(164, 170, 172, 1)"]}
        >
          {selectedFavorite.length > 0 && (
            <div className='flex flex-col items-center justify-center'>
            <Avatar className="h-24 w-24">
              <AvatarImage src={selectedFavorite[0].imageUrl} alt={'name'}  />
            </Avatar>
            <h2 className='mb-0'>{selectedFavorite[0].breed}</h2>
          </div>
          )}
          {selectedFavorite.length === 0 && (
            <p className="text-center text-muted-foreground">Choose your favorite dog breeds.</p>
          )}
        </ShineBorder>
        <ShineBorder
          className="text-center text-2xl font-bold capitalize h-full flex justify-center !min-w-0 w-72 "
          borderWidth={2}
          color={["rgba(221, 231, 199, 1)", "rgba(227, 150, 15, 1)", "rgba(164, 170, 172, 1)"]}
        >
          {selectedFavorite.length > 1 && (
            <div className='flex flex-col items-center justify-center'>
              <Avatar className="h-24 w-24">
                <AvatarImage src={selectedFavorite[1].imageUrl} alt={'name'} />
              </Avatar>
              <h2 className='mb-0'>{selectedFavorite[1].breed}</h2>
            </div>
          )}
          {selectedFavorite.length <= 1 && (
            <p className="text-center text-muted-foreground">Choose your favorite dog breeds.</p>
          )}
        </ShineBorder>
        <ShineBorder
          className="text-center text-2xl font-bold capitalize h-full flex justify-center !min-w-0 w-72"
          borderWidth={2}
          color={["rgba(221, 231, 199, 1)", "rgba(227, 150, 15, 1)", "rgba(164, 170, 172, 1)"]}
        >
          {selectedFavorite.length > 2 && (
            <div className='flex flex-col items-center justify-center'>
            <Avatar className="h-24 w-24">
              <AvatarImage src={selectedFavorite[2].imageUrl} alt={'name'} />
            </Avatar>
            <h2 className='mb-0'>{selectedFavorite[2].breed}</h2>
          </div>
          )}
          {selectedFavorite.length <= 2 && (
            <p className="text-center text-muted-foreground">Choose your favorite dog breeds.</p>
          )}
        </ShineBorder>
      </div>
      </BlurFade>


      <BlurFade delay={0.25 * 2} inView>
        <div className='min-h-[50vh]'>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 px-4">
            {breedsForPage.map((breed) => (
            <Drawer>
              <DrawerTrigger>
                <BreedsCard key={breed.name} name={breed.name} avatarUrl={`https://dog.ceo/api/breed/${breed.name}/images/random`} isSelected={false} />
              </DrawerTrigger>
              <DrawerContent className="max-h-[100vh]">
                <DrawerHeader className='pb-0'>
                  <DrawerDescription>Breed Information.</DrawerDescription>
                  <DrawerTitle className='text-2xl font-bold text-primary mb-0'>{breed.name}</DrawerTitle>
                </DrawerHeader>
                <ScrollArea className="p-4 max-h-[80vh] overflow-auto">
                  <BreedInfo breed={breed.name}
                  selectButton={
                    <DrawerClose>
                      <Button className="opacity-0 group-hover:opacity-100">
                      <img src={Heart}/> Add to my favorite
                      </Button>
                    </DrawerClose>
                  }
                  onSelected={(breed, imageUrl) => {
                    if (selectedFavorite.length < 3) {
                      setSelectedFavorite([...selectedFavorite, {breed, imageUrl}])
                    }
                  }}/>
                </ScrollArea>
                <DrawerFooter className='flex flex-row items-center justify-end'>
                  <DrawerClose>
                    <Button variant="outline">Cancel</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
            ))}
          </div>
        </div>
      </BlurFade>
      <BlurFade delay={0.25 * 1} inView>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(value) => {
          handlePageChange(value)
        }}
      />
      </BlurFade>
    </div>
  )
}
