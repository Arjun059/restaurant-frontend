export type Dish = {
  id: number;
  name: string;
  description: string;
  categories: string[];
  preparationTime: string;
  price: number;
  displayPrice: number;
  veg: boolean;
  rating: number;
  bestSeller: boolean;
  images: {
    name: string;
    folder: string;
    url: string;
  }[] | null;
  restaurantId: number;
  user: {
    id: number;
    name: string;
    email: string;
    password: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    Dishes: any; // You can replace `any` with `Dish[]` or a more specific type if needed
  };
  created_at: string;
  updated_at: string;
  deletedAt: string | null;
};

export type DishListResponse = Dish[]
