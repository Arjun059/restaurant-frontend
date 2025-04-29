import { Skeleton } from "#/components/ui/skeleton"

export default function SkeletonDishesList() {
  return (
    <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Filters and Sort Section */}
      <section className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <Skeleton className="h-7 w-48" />
          <div className="flex items-center space-x-3">
            <Skeleton className="h-9 w-24 rounded-full" />
            <Skeleton className="h-9 w-28 rounded-full" />
            <Skeleton className="h-9 w-20 rounded-full" />
          </div>
        </div>
        <div className="flex items-center space-x-3 overflow-x-auto py-2 scrollbar-hide">
          {Array(8)
            .fill("skeleton-dish-list")
            .map((_, i) => (
              <Skeleton key={`${i}-${_}`} className="h-8 w-24 rounded-full flex-shrink-0" />
            ))}
        </div>
      </section>

      {/* Restaurant/Food Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array(12)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="rounded-lg overflow-hidden border border-gray-100 hover:shadow-md transition-shadow"
            >
              {/* Food Image */}
              <div className="relative">
                <Skeleton className="h-48 w-full" />
                <div className="absolute bottom-2 right-2">
                  <Skeleton className="h-7 w-16 rounded-md" />
                </div>
                <div className="absolute top-2 left-2">
                  <Skeleton className="h-5 w-12 rounded-sm" />
                </div>
              </div>

              {/* Content */}
              <div className="p-3 space-y-2">
                {/* Restaurant/Food Name */}
                <div className="flex justify-between items-start">
                  <Skeleton className="h-5 w-[70%]" />
                  <div className="flex items-center space-x-1 bg-green-50 px-1.5 py-0.5 rounded">
                    <Skeleton className="h-4 w-6 rounded-sm bg-green-200" />
                    <Skeleton className="h-3 w-3 rounded-sm bg-green-200" />
                  </div>
                </div>

                {/* Cuisine Types */}
                <div className="flex items-center space-x-1">
                  <Skeleton className="h-4 w-16" />
                  <div className="h-1 w-1 rounded-full bg-gray-300" />
                  <Skeleton className="h-4 w-20" />
                </div>

                {/* Distance and Time */}
                <div className="flex items-center justify-between pt-1">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-16" />
                </div>

                {/* Divider */}
                <div className="border-t my-2" />

                {/* Offers */}
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-[85%]" />
                </div>
              </div>
            </div>
          ))}
      </section>

      {/* Load More Button */}
      <div className="flex justify-center mt-10 mb-6">
        <Skeleton className="h-10 w-32 rounded-md" />
      </div>

      {/* Popular Localities Section */}
      <section className="mt-12 mb-8">
        <Skeleton className="h-7 w-64 mb-6 mx-auto" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array(8)
            .fill("skeleton-locality-list")
            .map((_, i) => (
              <div key={`${i}-${_}`} className="border rounded-lg p-3 hover:shadow-sm transition-shadow">
                <Skeleton className="h-5 w-[70%] mb-1" />
                <Skeleton className="h-4 w-[50%]" />
              </div>
            ))}
        </div>
      </section>
    </main>
  )
}
