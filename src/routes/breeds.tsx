import { createFileRoute } from '@tanstack/react-router'
import { Button } from '../components/ui/button'
import BlurIn from '../components/ui/blur-in'

export const Route = createFileRoute('/breeds')({
  component: About,
})

function About() {
  return (
    <>
      <Button>halo dunia</Button>
      <BlurIn
        word="Blur In"
        className="text-4xl font-bold text-black dark:text-white"
      />
    </>
  )
}
