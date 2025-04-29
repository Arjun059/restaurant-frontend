'use client'
import { Button } from '#/components/ui/button'
import { useNavigate } from 'react-router'
import { AlertTriangle, Utensils, RotateCw } from 'lucide-react'
import { useRouteError } from 'react-router-dom'

export default function ErrorBoundaryPage() {
  const error = useRouteError() as any
  const navigate = useNavigate() 

  // let errorMessage = "An unexpected error occurred";
  // if (isRouteErrorResponse(error)) {
  //   errorMessage = error.statusText || error.data?.message || `Error ${error.status}`;
  // } else if (error instanceof Error) {
  //   errorMessage = error.message;
  // }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-6 text-center">
      <div className="">
        <div className="flex flex-col items-center">
          <div className="rounded-full bg-red-50 p-4">
            <AlertTriangle className="h-10 w-10 text-red-500" />
          </div>
          <h1 className="mt-4 font-bold text-2xl text-gray-900">Oops! Something went wrong</h1>
          <p className="mt-2 font-medium text-red-500">
            {error.message || 'Failed to load food data'}
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-gray-600">
            We encountered an issue while loading your page. Our chefs are working to fix this
            recipe mishap.
          </p>

          <div className="flex flex-col justify-center gap-3 pt-4 sm:flex-row">
            <Button
              onClick={() => window.location.reload()}
              variant="outline"
              className="w-full gap-2 sm:w-auto"
            >
              <RotateCw className="h-4 w-4" />
              Try Again
            </Button>
            <Button onClick={() => navigate('/')} className="w-full gap-2 sm:w-auto">
              <Utensils className="h-4 w-4" />
              Return Home
            </Button>
          </div>
        </div>

        <div className="mt-4 border-gray-200 border-t pt-6">
          <p className="text-gray-500 text-sm">
            Error code: {error.digest || 'UNKNOWN'}
            <br />
          </p>
        </div>
      </div>
    </div>
  )
}
