import {Card, CardContent, CardHeader, CardTitle} from '#/components/ui/card'
import {Badge} from '#/components/ui/badge'
import {useState} from 'react'
import {DishDetail} from './dish-detail'
import RatingStars from '../../components/rating-stars'

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

const dishes = [
  {
    id: 1,
    name: 'Chicken Biryani',
    description: 'Hyderabadi style dum biryani with succulent chicken pieces',
    price: 249,
    rating: 4.5,
    deliveryTime: '30-40 mins',
    images: getRandomImages(),
    restaurant: 'Biryani House',
    veg: false,
    bestSeller: true,
  },
  {
    id: 2,
    name: 'Paneer Butter Masala',
    description: 'Cottage cheese in rich creamy tomato gravy',
    price: 199,
    rating: 4.2,
    deliveryTime: '25-35 mins',
    images: getRandomImages(),
    restaurant: 'North Indian Delight',
    veg: true,
    bestSeller: true,
  },
  {
    id: 3,
    name: 'Veg Supreme Pizza',
    description: 'Loaded with capsicum, onion, corn, olives and jalapenos',
    price: 299,
    rating: 4.0,
    images: getRandomImages(),
    restaurant: 'Pizza Hub',
    veg: true,
    bestSeller: false,
  },
  {
    id: 4,
    name: 'Chicken Burger',
    description: 'Juicy chicken patty with lettuce and mayo',
    price: 149,
    rating: 3.9,
    deliveryTime: '20-30 mins',
    images: getRandomImages(),
    restaurant: 'Burger King',
    veg: false,
    bestSeller: false,
  },
  {
    id: 5,
    name: 'Masala Dosa',
    description: 'Crispy rice crepe stuffed with spiced potato',
    price: 99,
    rating: 4.3,
    deliveryTime: '15-25 mins',
    images: getRandomImages(),
    restaurant: 'South Indian Cafe',
    veg: true,
    bestSeller: true,
  },
  {
    id: 6,
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with molten center, served with ice cream',
    price: 179,
    rating: 4.6,
    deliveryTime: '10-15 mins',
    images: getRandomImages(),
    restaurant: 'Dessert Palace',
    veg: true,
    bestSeller: true,
  },
]

export default function DishesList() {
  const [selectedDish, setSelectedDish] = useState<typeof dishes[0] | null>(null)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 font-bold text-2xl text-gray-800">Popular Dishes Near You</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {dishes.map((dish) => (
          <Card
            key={dish.id}
            className="cursor-pointer transition-shadow hover:shadow-lg"
            onClick={() => setSelectedDish(dish)}
          >
            <div className="relative">
              <img
                src={dish.images[0]}
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
                  <RatingStars rating={dish.rating} />
                </span>
                <span className="font-bold">₹{dish.price}</span>
              </div>
            </CardContent>
          </Card>
        ))}
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

