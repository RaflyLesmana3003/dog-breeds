import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { useEffect, useState } from "react"
import BlurFade from "../../src/components/ui/blur-fade"

export default function BreedsCard({ 
  name = "John Doe", 
  avatarUrl = "/placeholder.svg?height=40&width=40",
  onSelect = (breeds: string) => {},
  disabled
}: { 
  name?: string, 
  avatarUrl?: string,
  onSelect?: (breeds: string) => void,
  disabled: boolean
}) {
  const [avatar, setAvatar] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)

  const fetchData = async () => {
    try {
      const response = await fetch(avatarUrl)
      const json = await response.json()
      
      if (!response.ok) {
        throw new Error('Failed to fetch avatar')
      }
      setAvatar(json.message)
    } catch (error) {
      console.error('Error fetching avatar:', error)
    } finally {
    }
  }
  
  useEffect(() => {
    fetchData()
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [avatarUrl])
  
  return (
    <button
      className="w-full max-w-md text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary rounded-lg"
      onClick={() => {onSelect(name)}}
      disabled={disabled}
      aria-label={`Select ${name}`}
    >
      <Card className={`transition-all duration-200 ease-in-out hover:bg-accent hover:shadow-md cursor-pointer transform  ${disabled ? 'bg-white opacity-30 hover:shadow-none cursor-not-allowed' : 'border-primary-foreground/15 hover:scale-105'} hover:border-primary hover:bg-[white]`} >
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
              <div className={`h-12 w-12 rounded-full ${isLoading ? 'animate-pulse bg-[--primary--yellow--900]' : 'hidden'}`} />
                     
                <Avatar className="h-12 w-12" style={{ display: isLoading ? 'none' : 'block' }}>
                  <AvatarImage src={avatar} alt={name} />
                </Avatar>
            <div className="space-y-2">
              {isLoading ? (
                <Skeleton className="h-5 w-24" />
              ) : (
                <h4 className="text-lg font-medium capitalize">{name}</h4>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </button>
  )
}