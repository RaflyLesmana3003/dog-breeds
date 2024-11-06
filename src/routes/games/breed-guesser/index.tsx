import { createFileRoute } from '@tanstack/react-router'
import { useCallback, useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card'
import { Loader2, PawPrint } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import { RadioGroup, RadioGroupItem } from '../../../src/components/ui/radio-group'
import { Label } from '../../../components/ui/label'
import { getAllBreeds } from '../../../services/breeds/getAll'
import { getRandomImage } from '../../../services/breeds/getRandomImage'

export const Route = createFileRoute('/games/breed-guesser/')({
  component: Component,
})

export default function Component() {
  const [loading, setLoading] = useState(true)
  const [imageUrl, setImageUrl] = useState('')
  const [correctBreed, setCorrectBreed] = useState('')
  const [options, setOptions] = useState<string[]>([])
  const [selected, setSelected] = useState('')
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState(false)
  const [rounds, setRounds] = useState(0)

  const capitalizeBreed = (breed: string) => {
    return breed.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  }

  const fetchRandomDog = useCallback(async () => {
    try {
      setLoading(true)
      const response = await getRandomImage()
      setImageUrl(response)
      
      const breedFromUrl = response.split('/breeds/')[1].split('/')[0]
      setCorrectBreed(breedFromUrl)
      
      const breedsResponse = await getAllBreeds()
      const allBreeds = Object.keys(breedsResponse.message)
      
      const wrongBreeds = allBreeds
        .filter(breed => breed !== breedFromUrl)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
      
      setOptions([breedFromUrl, ...wrongBreeds].sort(() => 0.5 - Math.random()))
      setLoading(false)
      setAnswered(false)
      setSelected('')
    } catch (error) {
      console.error('Error fetching dog:', error)
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchRandomDog()
  }, [fetchRandomDog])

  const handleSubmit = () => {
    if (selected === correctBreed) {
      setScore(score + 1)
    }
    setAnswered(true)
    setRounds(rounds + 1)
  }

  const handleNextRound = () => {
    fetchRandomDog()
  }

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PawPrint className="w-6 h-6" />
          Dog Breed Guesser
        </CardTitle>
        <CardDescription>
          Can you guess the breed of this dog? Score: {score}/{rounds}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading ? (
          <div className="flex items-center justify-center h-[300px]">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : (
          <>
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <img
                src={imageUrl}
                alt="Guess the dog breed"
                className="object-cover w-full h-full"
              />
            </div>
            <RadioGroup
              value={selected}
              onValueChange={setSelected}
              className="gap-4"
              disabled={answered}
            >
              {options.map((breed) => (
                <div key={breed} className="flex items-center space-x-2">
                  <RadioGroupItem value={breed} id={breed} />
                  <Label htmlFor={breed} className="flex-1">
                    {capitalizeBreed(breed)}
                  </Label>
                  {answered && breed === correctBreed && (
                    <span className="text-green-500">✓ Correct</span>
                  )}
                  {answered && selected === breed && breed !== correctBreed && (
                    <span className="text-red-500">✗ Incorrect</span>
                  )}
                </div>
              ))}
            </RadioGroup>
            {!answered ? (
              <Button
                onClick={handleSubmit}
                disabled={!selected}
                className="w-full"
              >
                Submit Answer
              </Button>
            ) : (
              <Button
                onClick={handleNextRound}
                className="w-full"
              >
                Next Dog
              </Button>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}
