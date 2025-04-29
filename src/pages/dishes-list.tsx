import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card"
import { Badge } from "#/components/ui/badge"
// import { Button } from "#/components/ui/button"

const images = [
 "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1712756241096-cedbab03cd52?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDh8fHxlbnwwfHx8fHw%3D",
  "https://images.unsplash.com/photo-1468777675496-5782faaea55b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDI1fHx8ZW58MHx8fHx8",
  "https://images.unsplash.com/photo-1578167731266-cabac4159bed?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDU2fHx8ZW58MHx8fHx8",
  "https://plus.unsplash.com/premium_photo-1663853051660-91bd9b822799?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEzNHx8fGVufDB8fHx8fA%3D%3D",
]
function getRandomImage() {
  return images[Math.floor(Math.random() * images.length)]
}

const foodProducts = [
  {
    id: 1,
    name: "Chicken Biryani",
    description: "Hyderabadi style dum biryani with succulent chicken pieces",
    price: 249,
    rating: 4.5,
    deliveryTime: "30-40 mins",
    image: getRandomImage(),
    restaurant: "Biryani House",
    veg: false,
    bestSeller: true
  },
  {
    id: 2,
    name: "Paneer Butter Masala",
    description: "Cottage cheese in rich creamy tomato gravy",
    price: 199,
    rating: 4.2,
    deliveryTime: "25-35 mins",
    image: getRandomImage(),
    restaurant: "North Indian Delight",
    veg: true,
    bestSeller: true
  },
  {
    id: 3,
    name: "Veg Supreme Pizza",
    description: "Loaded with capsicum, onion, corn, olives and jalapenos",
    price: 299,
    rating: 4.0,
    image: getRandomImage(),
    restaurant: "Pizza Hub",
    veg: true,
    bestSeller: false
  },
  {
    id: 4,
    name: "Chicken Burger",
    description: "Juicy chicken patty with lettuce and mayo",
    price: 149,
    rating: 3.9,
    deliveryTime: "20-30 mins",
    image: getRandomImage(),
    restaurant: "Burger King",
    veg: false,
    bestSeller: false
  },
  {
    id: 5,
    name: "Masala Dosa",
    description: "Crispy rice crepe stuffed with spiced potato",
    price: 99,
    rating: 4.3,
    deliveryTime: "15-25 mins",
    image: getRandomImage(),
    restaurant: "South Indian Cafe",
    veg: true,
    bestSeller: true
  },
  {
    id: 6,
    name: "Chocolate Lava Cake",
    description: "Warm chocolate cake with molten center, served with ice cream",
    price: 179,
    rating: 4.6,
    deliveryTime: "10-15 mins",
    image: getRandomImage(),
    restaurant: "Dessert Palace",
    veg: true,
    bestSeller: true
  }
];

export default function ProductList() {

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Popular Dishes Near You</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {foodProducts.map((product) => (
          <Card key={product.id} className="hover:shadow-lg transition-shadow">
            <div className="relative">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              {product.bestSeller && (
                <Badge className="absolute top-2 left-2 bg-amber-400 text-amber-900">
                  Bestseller
                </Badge>
              )}
              <div className={`absolute bottom-2 left-2 w-5 h-5 rounded-full flex items-center justify-center ${product.veg ? 'bg-green-500' : 'bg-red-500'}`}>
                <div className={`w-2 h-2 rounded-full ${product.veg ? 'bg-white' : 'bg-white'}`} />
              </div>
            </div>
            
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{product.name}</CardTitle>
            </CardHeader>
            
            <CardContent>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
              
              <div className="flex justify-between items-center mb-3 text-sm">
                <span className="flex items-center text-green-600 font-medium">
                  <StarIcon className="w-4 h-4 mr-1" />
                  {product.rating}
                </span>
                <span className="font-bold">₹{product.price}</span>
              </div>
              
              {/* <Button variant="outline" className="w-full border-green-500 text-green-600 hover:bg-green-50">
                Add to Cart
              </Button> */}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}