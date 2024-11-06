import { createFileRoute } from '@tanstack/react-router'
import { Button } from '../../../components/ui/button'
import { RefreshCw } from 'lucide-react'
import { Card, CardContent } from '../../../components/ui/card'
import { useEffect, useState } from 'react'
import { getRandomImage } from '../../../services/breeds/getRandomImage'

export const Route = createFileRoute('/games/mistery-dogs/')({
  component: Component,
})

export default function Component() {
  const [dogs, setDogs] = useState<string[]>([])
  const [revealed, setRevealed] = useState<boolean[]>([false, false, false])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchDogs = async () => {
    setLoading(true);
    setError(null);
    setRevealed([false, false, false]);
    try {
      const responses = await Promise.all([
        getRandomImage(),
        getRandomImage(),
        getRandomImage(),
      ]);
      setDogs(responses);
    } catch (err) {
      setError('Failed to fetch dogs. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDogs()
  }, [])

  const handleReveal = (index: number) => {
    setRevealed(prev => {
      const newRevealed = [...prev]
      newRevealed[index] = true
      return newRevealed
    })
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <p className="text-red-500">{error}</p>
        <Button onClick={fetchDogs}>Try Again</Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col items-center gap-6">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">Mystery Dogs</h1>
          <Button variant="outline" size="icon" onClick={fetchDogs} disabled={loading}>
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            <span className="sr-only">New Dogs</span>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {dogs.map((dog, index) => (
            <Card 
              key={dog + index}
              className={`relative cursor-pointer transition-transform duration-500 transform-gpu ${
                revealed[index] ? '' : 'hover:scale-105'
              }`}
              onClick={() => !revealed[index] && handleReveal(index)}
            >
              <CardContent className="p-0 aspect-square relative overflow-hidden">
                <div
                  className={`absolute inset-0 bg-primary/10 backdrop-blur-sm flex items-center justify-center transition-all duration-500 z-10 ${
                    revealed[index] ? 'opacity-0 pointer-events-none' : 'opacity-100'
                  }`}
                >
                  <p className="text-lg font-semibold">Click to Reveal!</p>
                </div>
                <img
                  src={dog}
                  alt="Mystery dog"
                  className={`rounded-lg w-full h-full object-cover transition-all duration-500 ${
                    revealed[index] ? 'opacity-100 z-20' : 'opacity-0 z-0'
                  }`}
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
