"use client";
import { Button } from "#/components/ui/button";
import { useNavigate } from "react-router";
import { AlertTriangle, Utensils, RotateCw } from "lucide-react";
import { useRouteError } from "react-router-dom";

export default function ErrorBoundaryPage() {
  const error = useRouteError();
  const navigate = useNavigate();
  
  // let errorMessage = "An unexpected error occurred";
  // if (isRouteErrorResponse(error)) {
  //   errorMessage = error.statusText || error.data?.message || `Error ${error.status}`;
  // } else if (error instanceof Error) {
  //   errorMessage = error.message;
  // }
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6 text-center">
      <div className="">
        <div className="flex flex-col items-center">
          <div className="p-4 bg-red-50 rounded-full">
            <AlertTriangle className="h-10 w-10 text-red-500" />
          </div>
          <h1 className="mt-4 text-2xl font-bold text-gray-900">
            Oops! Something went wrong
          </h1>
          <p className="mt-2 text-red-500 font-medium">
            {error.message || "Failed to load food data"}
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-gray-600">
            We encountered an issue while loading your page. Our chefs are
            working to fix this recipe mishap.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <Button
              onClick={() => window.location.reload()}
              variant="outline"
              className="gap-2 w-full sm:w-auto"
            >
              <RotateCw className="h-4 w-4" />
              Try Again
            </Button>
            <Button
              onClick={() => navigate("/")}
              className="gap-2 w-full sm:w-auto"
            >
              <Utensils className="h-4 w-4" />
              Return Home
            </Button>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-200 mt-4">
          <p className="text-sm text-gray-500">
            Error code: {error.digest || "UNKNOWN"}
            <br />
          </p>
        </div>
      </div>
    </div>
  );
}