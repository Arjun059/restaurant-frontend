
import { Skeleton } from "#/components/ui/skeleton"

export default function SkeletonPage() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* Main Content with Sidebar Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 py-12">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-8">
          {/* Featured Section */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array(4)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="flex flex-col space-y-3">
                    <Skeleton className="h-[200px] w-full rounded-xl" />
                    <div className="space-y-2">
                      <Skeleton className="h-5 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-2/3" />
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Secondary Section */}
          <div className="space-y-4">
            <Skeleton className="h-8 w-48 mb-6" />
            <div className="space-y-6">
              {Array(3)
                .fill('secondary')
                .map((_, index: number) => (
                  <div key={`${index}-${_}`} className="flex space-x-4">
                    <Skeleton className="h-24 w-24 rounded-md flex-shrink-0" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-5 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-2/3" />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <div className="space-y-4">
            <Skeleton className="h-8 w-32 mb-4" />
            <Skeleton className="h-[120px] w-full rounded-lg" />
          </div>

          <div className="space-y-4">
            <Skeleton className="h-8 w-32 mb-4" />
            <div className="space-y-3">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <Skeleton className="h-4 w-4 rounded-full" />
                    <Skeleton className="h-4 flex-1" />
                  </div>
                ))}
            </div>
          </div>

          <div className="space-y-4">
            <Skeleton className="h-8 w-32 mb-4" />
            <Skeleton className="h-[180px] w-full rounded-lg" />
          </div>
        </div>
      </div>

      {/* Footer Skeleton */}
      <footer className="py-12 border-t">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {Array(4)
            .fill("footer")
            .map((_, index: number) => (
              <div key={`${index}-${_}`} className="space-y-4">
                <Skeleton className="h-6 w-24" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
            ))}
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t">
          <Skeleton className="h-4 w-48 mb-4 md:mb-0" />
          <div className="flex space-x-4">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </div>
      </footer>
    </div>
  )
}
