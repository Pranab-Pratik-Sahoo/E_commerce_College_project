import { Product, Category } from '../types/product';

export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    description: 'Immerse yourself in studio-quality sound with our premium wireless headphones. Features active noise cancellation and 30-hour battery life.',
    price: 249.99,
    originalPrice: 299.99,
    imageUrl: 'https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'audio',
    rating: 4.8,
    inStock: true,
    featured: true,
    colors: ['Black', 'White', 'Navy'],
    sizes: []
  },
  {
    id: '2',
    name: 'Ultra Slim Laptop',
    description: 'Powerful performance in an ultra-slim design. Features the latest processor, 16GB RAM, and 512GB SSD storage.',
    price: 1299.99,
    originalPrice: 1499.99,
    imageUrl: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'computers',
    rating: 4.9,
    inStock: true,
    featured: true,
    colors: ['Silver', 'Space Gray'],
    sizes: []
  },
  {
    id: '3',
    name: 'Smart Fitness Watch',
    description: 'Track your fitness goals with precision. Features heart rate monitoring, GPS, and 7-day battery life.',
    price: 199.99,
    originalPrice: 249.99,
    imageUrl: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'wearables',
    rating: 4.7,
    inStock: true,
    featured: false,
    colors: ['Black', 'Blue', 'Pink'],
    sizes: []
  },
  {
    id: '4',
    name: 'Wireless Charging Pad',
    description: 'Charge your devices wirelessly with our fast-charging pad. Compatible with all Qi-enabled devices.',
    price: 49.99,
    originalPrice: 69.99,
    imageUrl: 'https://images.pexels.com/photos/4526407/pexels-photo-4526407.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'accessories',
    rating: 4.5,
    inStock: true,
    featured: false,
    colors: ['Black', 'White'],
    sizes: []
  },
  {
    id: '5',
    name: 'Premium Smartphone',
    description: 'The latest flagship smartphone with cutting-edge features. Includes a pro-grade camera system and all-day battery life.',
    price: 999.99,
    originalPrice: 1099.99,
    imageUrl: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'phones',
    rating: 4.9,
    inStock: true,
    featured: true,
    colors: ['Midnight', 'Starlight', 'Blue'],
    sizes: []
  },
  {
    id: '6',
    name: 'Bluetooth Speaker',
    description: 'Portable Bluetooth speaker with incredible sound quality and 24-hour battery life. Waterproof and perfect for outdoor adventures.',
    price: 129.99,
    originalPrice: 159.99,
    imageUrl: 'https://images.pexels.com/photos/1279107/pexels-photo-1279107.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'audio',
    rating: 4.6,
    inStock: true,
    featured: false,
    colors: ['Black', 'Blue', 'Red'],
    sizes: []
  },
  {
    id: '7',
    name: '4K Smart TV',
    description: 'Ultra HD smart TV with vibrant colors and immersive sound. Access all your favorite streaming services in one place.',
    price: 799.99,
    originalPrice: 899.99,
    imageUrl: 'https://images.pexels.com/photos/6976103/pexels-photo-6976103.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'tvs',
    rating: 4.7,
    inStock: true,
    featured: true,
    colors: ['Black'],
    sizes: ['55"', '65"', '75"']
  },
  {
    id: '8',
    name: 'Gaming Console',
    description: 'Next-generation gaming console with lightning-fast performance and stunning graphics. Includes one wireless controller.',
    price: 499.99,
    originalPrice: 549.99,
    imageUrl: 'https://images.pexels.com/photos/275033/pexels-photo-275033.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'gaming',
    rating: 4.9,
    inStock: false,
    featured: true,
    colors: ['Black', 'White'],
    sizes: []
  }
];

export const categories: Category[] = [
  {
    id: 'audio',
    name: 'Audio',
    description: 'Headphones, speakers, and other audio equipment',
    imageUrl: 'https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'computers',
    name: 'Computers',
    description: 'Laptops, desktops, and accessories',
    imageUrl: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'wearables',
    name: 'Wearables',
    description: 'Smart watches and fitness trackers',
    imageUrl: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'accessories',
    name: 'Accessories',
    description: 'Chargers, cases, and other accessories',
    imageUrl: 'https://images.pexels.com/photos/4526407/pexels-photo-4526407.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'phones',
    name: 'Phones',
    description: 'Smartphones and mobile accessories',
    imageUrl: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'tvs',
    name: 'TVs',
    description: 'Smart TVs and home entertainment systems',
    imageUrl: 'https://images.pexels.com/photos/6976103/pexels-photo-6976103.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'gaming',
    name: 'Gaming',
    description: 'Gaming consoles and accessories',
    imageUrl: 'https://images.pexels.com/photos/275033/pexels-photo-275033.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
];

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getProductsByCategory = (categoryId: string): Product[] => {
  return products.filter(product => product.category === categoryId);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(
    product => 
      product.name.toLowerCase().includes(lowercaseQuery) || 
      product.description.toLowerCase().includes(lowercaseQuery)
  );
};