import {Badge} from '#/components/ui/badge'
import {Card, CardContent, CardHeader, CardTitle} from '#/components/ui/card'
import {useQuery} from '@tanstack/react-query'
import {useEffect, useMemo, useState} from 'react'
import RatingStars from '../../components/rating-stars'
import {fetcher} from '../../utils/fetcher'
import {DishDetail} from './dish-detail'
import {useNavigate, useParams} from 'react-router-dom'
import {
  Coffee,
  CupSoda,
  IceCream,
  IceCreamBowl,
  Sandwich,
  Soup,
  Utensils,
} from "lucide-react"
import useStore from '../../store'
import {PAGE_ROUTES} from '../../constants/page-routes'
import SkeletonDishesList from '../../components/skeletons/dishes-list'

// const images = [
//   'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//   'https://plus.unsplash.com/premium_photo-1712756241096-cedbab03cd52?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDh8fHxlbnwwfHx8fHw%3D',
//   'https://images.unsplash.com/photo-1468777675496-5782faaea55b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDI1fHx8ZW58MHx8fHx8',
//   'https://images.unsplash.com/photo-1578167731266-cabac4159bed?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDU2fHx8ZW58MHx8fHx8',
//   'https://plus.unsplash.com/premium_photo-1663853051660-91bd9b822799?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEzNHx8fGVufDB8fHx8fA%3D%3D',
// ];

// function getRandomImages(count: number = 3): string[] {
//   const shuffled = [...images].sort(() => 0.5 - Math.random())
//   return shuffled.slice(0, count)
// }

const categoryIcons = {
  starter: <Utensils className="w-4 h-4 mr-2 text-[#DAA520]" />,
  dessert: <IceCream className="w-4 h-4 mr-2 text-[#DAA520]" />,
  beverage: <Coffee className="w-4 h-4 mr-2 text-[#DAA520]" />,
  main_course: <Utensils className="w-4 h-4 mr-2 text-[#DAA520]" />,
  snack: <Sandwich className="w-4 h-4 mr-2 text-[#DAA520]" />,
};

function formatCategoryLabel(category: string) {
  ``
  // after every  _ should start world with capital case
  return category.replace(/_/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
}

export default function DishesList() {
  const [selectedDish, setSelectedDish] = useState<any | null>(null)
  const [categories, setCategories] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<any>(undefined)
  const {restaurant} = useStore(state => state)
  const {restaurantUrl} = useParams()
  const navigate = useNavigate()

  const queryResp = useQuery<any>({
    queryKey: ['dishes', `restaurant-dishes-${restaurant?.id}`],
    queryFn: () => fetcher<any[]>(`/dishes/${restaurant?.id}`),
    enabled: !!restaurant?.id,
  });

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
  }, [queryResp?.data])

  useEffect(() => {
    if (restaurantUrl && !restaurant?.id) {
      navigate(PAGE_ROUTES.RESTAURANT_HOME(restaurantUrl), {replace: true})
    }
  }, [restaurantUrl, restaurant?.id])

  if (queryResp.isLoading) {
    return <SkeletonDishesList />
  }

  return (
    <div className="container mx-auto px-4 py-4">
      <h1 className="mb-6 font-semibold text-lg text-gray-800">Popular Dishes Near You</h1>
      <div className='grid grid-cols-12 gap-4'>
        <div className='col-span-4 md:col-span-2 bg-white p-2 rounded-lg'>
          <div className="col-span-2">
            <ul className="space-y-2">
              {categories.map((cate, index) => (
                <li
                  key={index}
                  className={`cursor-pointer flex sm:flex-row flex-col items-center rounded-md px-3 py-2 transition-colors ${selectedCategory === cate ? 'bg-green-100 font-bold text-green-700 border-s border-[#DAA520]' : 'hover:bg-gray-100 font-bold text-gray-800'
                    }`}
                  onClick={() => setSelectedCategory(cate)} // if you want filtering
                >
                  {categoryIcons[cate as keyof typeof categoryIcons]}
                  <span className='text-sm'>{formatCategoryLabel(cate)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 col-span-8 md:col-span-10">
          {groupedDishesByCategory[selectedCategory ?? categories[0]]?.map((dish: any) => (
            <Card
              key={dish.id}
              className="cursor-pointer transition-shadow hover:shadow-lg"
              onClick={() => setSelectedDish({...dish})}
            >
              <div className="relative">

                {dish.images?.[0]?.url ?
                  <img
                    src={dish.images?.[0]?.url}
                    alt={dish.name}
                    className="h-48 w-full rounded-t-lg object-cover"
                  />
                  :
                  <ImagePlaceHolder dishCategory={dish.categories[0]} ></ImagePlaceHolder>
                }

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

              <CardHeader className="p-2 pt-3">
                <CardTitle className="text-md">{dish.name}</CardTitle>
              </CardHeader>

              <CardContent className='p-2 pt-0'>
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

const ImagePlaceHolder = ({dishCategory}: any) => {
  function getIcon(dishCategory: string) {
    switch (dishCategory) {
      case "Starter":
      case "main_course":
        return <Soup className='w-full h-full text-gray-200' />
      case "dessert":
        return <IceCreamBowl className='w-full h-full text-gray-200' />
      case "beverage":
        return <CupSoda className='w-full h-full text-gray-200' />
      case "snack":
        return <Sandwich className='w-full h-full text-gray-200' />
      default:
        return <Soup className='w-full h-full text-gray-200' />
    }
  }

  return <div className='w-full h-full'>
    {getIcon(dishCategory)}
  </div>

}

export const Dish_Categories = [
  {
    label: 'Main Course',
    value: 'main_course',
  },
  {
    label: 'Starter',
    value: 'starter',
  },
  {
    label: 'Dessert',
    value: 'dessert',
  },
  {
    label: 'Beverage',
    value: 'beverage',
  },
  {
    label: 'Snack',
    value: 'snack',
  },
]
