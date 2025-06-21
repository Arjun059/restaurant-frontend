import {Card, CardContent, CardHeader, CardTitle} from '#/components/ui/card'
import {Badge} from '#/components/ui/badge'
import {useMemo, useState} from 'react'
import {DishDetail} from './dish-detail'
import RatingStars from '../../components/rating-stars'
import {useQuery} from '@tanstack/react-query'
import {fetcher} from '../../utils/fetcher'

const images = [
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://plus.unsplash.com/premium_photo-1712756241096-cedbab03cd52?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDh8fHxlbnwwfHx8fHw%3D',
  'https://images.unsplash.com/photo-1468777675496-5782faaea55b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDI1fHx8ZW58MHx8fHx8',
  'https://images.unsplash.com/photo-1578167731266-cabac4159bed?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDU2fHx8ZW58MHx8fHx8',
  'https://plus.unsplash.com/premium_photo-1663853051660-91bd9b822799?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEzNHx8fGVufDB8fHx8fA%3D%3D',
]

function getRandomImages(count: number = 3): string[] {
  const shuffled = [...images].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}


export default function DishesList() {
  const [selectedDish, setSelectedDish] = useState<any | null>(null)
  const [categories, setCategories] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<any>(undefined)
  const queryResp = useQuery<any>({
    queryKey: ['dishes'],
    queryFn: () => fetcher<any[]>('/dishes'),
  });

  if (queryResp.isError) {
    throw new Error()
  }

  console.log(queryResp.data, 'response data')

  const groupedDishesByCategory: any = useMemo(() => {
    const _groupedDishesByCategory: any = {}
    queryResp?.data?.forEach((dish: any) => {
      dish.categories.forEach((category: any) => {
        if (!_groupedDishesByCategory[category]) {
          _groupedDishesByCategory[category] = [];
        }
        _groupedDishesByCategory[category].push(dish);
      });
    });

    const cates = Object.keys(_groupedDishesByCategory)
    setCategories(cates)
    if (!selectedCategory) setSelectedCategory(cates[0])
    return _groupedDishesByCategory
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 font-bold text-2xl text-gray-800">Popular Dishes Near You</h1>
      <div className='grid grid-cols-12'>
        <div className='col-span-4 md:col-span-2'>
          <div className="col-span-2 pr-4 border-r">
            <ul className="space-y-2">
              {categories.map((cate, index) => (
                <li
                  key={index}
                  className={`cursor-pointer rounded-md px-3 py-2 transition-colors ${selectedCategory === cate ? 'bg-green-100 font-medium text-green-700' : 'hover:bg-gray-100 text-gray-800'
                    }`}
                  onClick={() => setSelectedCategory(cate)} // if you want filtering
                >
                  {cate}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 col-span-8 md:col-span-10">
          {groupedDishesByCategory[selectedCategory ?? categories[0]]?.map((dish: any) => (
            <Card
              key={dish.id}
              className="cursor-pointer transition-shadow hover:shadow-lg"
              onClick={() => setSelectedDish({...dish, images: getRandomImages(3)})}
            >
              <div className="relative">
                <img
                  // src={dish.images[0]}
                  src={getRandomImages(1)[0]}
                  alt={dish.name}
                  className="h-48 w-full rounded-t-lg object-cover"
                />
                {dish.bestSeller && (
                  <Badge className="absolute top-2 left-2 bg-amber-400 text-amber-900">
                    Bestseller
                  </Badge>
                )}
                <div
                  className={`absolute bottom-2 left-2 flex h-5 w-5 items-center justify-center rounded-full ${dish.veg ? 'bg-green-500' : 'bg-red-500'
                    }`}
                >
                  <div className="h-2 w-2 rounded-full bg-white" />
                </div>
              </div>

              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{dish.name}</CardTitle>
              </CardHeader>

              <CardContent>
                <p className="mb-3 line-clamp-2 text-gray-600 text-sm">{dish.description}</p>

                <div className="mb-3 flex items-center justify-between text-sm">
                  <span className="flex items-center font-medium text-green-600">
                    <RatingStars rating={dish.rating} readOnly />
                  </span>
                  <span className="font-bold">₹{dish.price}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>

      {selectedDish && (
        <DishDetail
          dish={selectedDish}
          isOpen={!!selectedDish}
          onClose={() => setSelectedDish(null)}
        />
      )}
    </div>
  )
}

