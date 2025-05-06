import { Skeleton } from '#/components/ui/skeleton'

export default function SkeletonDishesList() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Filters and Sort Section */}
      <section className="mb-6">
        <div className="mb-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <Skeleton className="h-7 w-48" />
          <div className="flex items-center space-x-3">
            <Skeleton className="h-9 w-24 rounded-full" />
            <Skeleton className="h-9 w-28 rounded-full" />
            <Skeleton className="h-9 w-20 rounded-full" />
          </div>
        </div>
        <div className="scrollbar-hide flex items-center space-x-3 overflow-x-auto py-2">
          {Array(8)
            .fill('skeleton-dish-list')
            .map((_, i) => (
              <Skeleton key={`${i}-${_}`} className="h-8 w-24 flex-shrink-0 rounded-full" />
            ))}
        </div>
      </section>

      {/* Restaurant/Food Grid */}
      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array(12)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-lg border border-gray-100 transition-shadow hover:shadow-md"
            >
              {/* Food Image */}
              <div className="relative">
                <Skeleton className="h-48 w-full" />
                <div className="absolute right-2 bottom-2">
                  <Skeleton className="h-7 w-16 rounded-md" />
                </div>
                <div className="absolute top-2 left-2">
                  <Skeleton className="h-5 w-12 rounded-sm" />
                </div>
              </div>

              {/* Content */}
              <div className="space-y-2 p-3">
                {/* Restaurant/Food Name */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-1 rounded bg-green-50 px-1.5 py-0.5">
                    <Skeleton className="h-4 w-6 rounded-sm bg-green-200" />
                    <Skeleton className="h-3 w-3 rounded-sm bg-green-200" />
                  </div>
                  <Skeleton className="h-5 w-[70%]" />
                </div>

                {/* Cuisine Types */}
                {/* <div className="flex items-center space-x-1">
                  <Skeleton className="h-4 w-16" />
                  <div className="h-1 w-1 rounded-full bg-gray-300" />
                  <Skeleton className="h-4 w-20" />
                </div> */}

                {/* Distance and Time */}
                {/* <div className="flex items-center justify-between pt-1">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-16" />
                </div> */}

                {/* Divider */}
                <div className="my-2 border-t" />

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
      {/* <div className="mt-10 mb-6 flex justify-center">
        <Skeleton className="h-10 w-32 rounded-md" />
      </div> */}

      {/* Popular Localities Section */}
      {/* <section className="mt-12 mb-8">
        <Skeleton className="mx-auto mb-6 h-7 w-64" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {Array(8)
            .fill('skeleton-locality-list')
            .map((_, i) => (
              <div
                key={`${i}-${_}`}
                className="rounded-lg border p-3 transition-shadow hover:shadow-sm"
              >
                <Skeleton className="mb-1 h-5 w-[70%]" />
                <Skeleton className="h-4 w-[50%]" />
              </div>
            ))}
        </div>
      </section> */}
    </main>
  )
}
