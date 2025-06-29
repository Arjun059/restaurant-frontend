'use client'

import {Button} from '#/components/ui/button'
import {useNavigate} from 'react-router'
import {Utensils} from 'lucide-react'
import {PAGE_ROUTES} from '../constants/page-routes'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4 text-center">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center">
          <Utensils className="h-16 w-16 text-rose-500" />
          <h1 className="mt-4 font-bold text-3xl text-gray-900">Dish Not Found</h1>
          <p className="mt-2 text-gray-600 text-lg">
            We couldn't find the food item you're looking for.
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-gray-500">
            The dish may have been removed or doesn't exist. Try searching for something else or
            return to our delicious offerings.
          </p>

          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Button onClick={() => navigate(-1)} variant="outline" className="w-full sm:w-auto">
              Go Back
            </Button>
            <Button onClick={() => navigate(PAGE_ROUTES.DISHES_LIST)} className="w-full sm:w-auto">
              Browse Dishes
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
