import {Dialog, DialogContent, DialogHeader, DialogTitle} from '#/components/ui/dialog'
import {Badge} from '#/components/ui/badge'
import {Button} from '#/components/ui/button'
import {ChevronLeft, ChevronRight, Clock, Utensils} from 'lucide-react'
import useEmblaCarousel from 'embla-carousel-react'
import {useCallback, useEffect, useState} from 'react'
import RatingStars from '../../components/rating-stars'

interface DishDetailProps {
  dish: {
    id: number
    name: string
    description: string
    price: number
    rating: number
    deliveryTime?: string
    images: string[]
    restaurant: string
    veg: boolean
    bestSeller: boolean
  }
  isOpen: boolean
  onClose: () => void
}

export function DishDetail({dish, isOpen, onClose}: DishDetailProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    setScrollSnaps(emblaApi.scrollSnapList())
    emblaApi.on('select', onSelect)
  }, [emblaApi, onSelect])



  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{dish.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Image Carousel Section */}
          <div className="relative">
            <div className="overflow-hidden rounded-lg" ref={emblaRef}>
              <div className="flex">
                {dish.images.map((image, index) => (
                  <div key={index} className="relative flex-[0_0_100%]">
                    <img
                      src={image}
                      alt={`${dish.name} - Image ${index + 1}`}
                      className="h-64 w-full object-cover"
                    />
                    {dish.bestSeller && index === selectedIndex && (
                      <Badge className="absolute top-2 left-2 bg-amber-400 text-amber-900">
                        Bestseller
                      </Badge>
                    )}
                    <div
                      className={`absolute bottom-2 left-2 flex h-6 w-6 items-center justify-center rounded-full ${dish.veg ? 'bg-green-500' : 'bg-red-500'
                        }`}
                    >
                      <div className="h-3 w-3 rounded-full bg-white" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Navigation */}
            <div className="absolute inset-y-0 left-0 flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full bg-black/50 text-white hover:bg-black/70"
                onClick={scrollPrev}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full bg-black/50 text-white hover:bg-black/70"
                onClick={scrollNext}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Carousel Dots */}
            <div className="absolute bottom-2 right-2 flex gap-1">
              {scrollSnaps.map((_, index) => (
                <button
                  key={index}
                  className={`h-2 w-2 rounded-full transition-colors ${index === selectedIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  onClick={() => emblaApi?.scrollTo(index)}
                />
              ))}
            </div>
          </div>

          {/* Restaurant Info */}
          <div className="flex items-center gap-2">
            <Utensils className="h-5 w-5 text-gray-500" />
            <span className="text-lg font-medium">{dish.restaurant}</span>
          </div>

          {/* Details Grid */}
          <div className="flex justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="flex">
                <RatingStars rating={dish.rating} />
                <span className="font-medium">({dish.rating})</span>
              </div>
            </div>
            {dish.deliveryTime && (
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-gray-500" />
                <span className="font-medium">{dish.deliveryTime}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <span className="text-lg font-medium">₹{dish.price}</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="mb-2 font-semibold">Description</h3>
            <p className="text-gray-600">{dish.description}</p>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  )
}
