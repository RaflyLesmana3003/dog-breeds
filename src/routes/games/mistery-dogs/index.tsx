import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/games/mistery-dogs/')({
  component: RouteComponent,
})

function RouteComponent() {
  return 'Hello /games/mistery-dogs/!'
}
