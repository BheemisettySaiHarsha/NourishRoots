import React, { useState, useEffect } from 'react';
import { Star, Plus, Minus, ShoppingCart, Heart, Share2, Shield, Truck, RotateCcw, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import type { Product } from '../types';

// Sample product data - in real app this would come from API/database
const sampleProduct: Product & {
  images: string[];
  rating: number;
  reviewCount: number;
  stock: number;
  originalPrice?: number;
  badges: string[];
  ingredients: string[];
  nutritionFacts: { [key: string]: string };
  benefits: string[];
  howToUse: string[];
  reviews: Array<{
    id: string;
    name: string;
    rating: number;
    comment: string;
    verified: boolean;
    date: string;
  }>;
  videoUrl?: string;
} = {
  id: '1',
  name: 'Amla Almond Butter',
  price: 18.99,
  originalPrice: 22.99,
  image: 'https://images.pexels.com/photos/5966629/pexels-photo-5966629.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
  images: [
    'https://images.pexels.com/photos/5966629/pexels-photo-5966629.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
    'https://images.pexels.com/photos/4198843/pexels-photo-4198843.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
    'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
    'https://images.pexels.com/photos/5946071/pexels-photo-5946071.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop'
  ],
  category: 'nut-butters',
  description: 'Infused with cold-pressed amla & roasted almonds',
  rating: 4.8,
  reviewCount: 127,
  stock: 15,
  badges: ['Vegan', 'Gluten-Free', 'High Protein'],
  ingredients: ['Roasted Almonds', 'Cold-pressed Amla', 'Himalayan Pink Salt', 'Coconut Oil'],
  nutritionFacts: {
    'Calories': '190 per 2 tbsp',
    'Protein': '7g',
    'Fat': '16g',
    'Carbs': '6g',
    'Fiber': '3g',
    'Vitamin C': '25mg'
  },
  benefits: [
    'Rich in Vitamin C from fresh amla for immune support',
    'High protein content supports muscle health',
    'Healthy fats for sustained energy',
    'Antioxidants help fight free radicals'
  ],
  howToUse: [
    'Spread on toast or crackers for a nutritious breakfast',
    'Mix into smoothies for extra protein and flavor',
    'Eat by the spoon as a healthy snack',
    'Use as a dip for apple slices or celery'
  ],
  reviews: [
    {
      id: '1',
      name: 'Sarah M.',
      rating: 5,
      comment: 'Amazing taste! The amla gives it such a unique flavor. My kids love it too.',
      verified: true,
      date: '2024-01-15'
    },
    {
      id: '2',
      name: 'Mike R.',
      rating: 4,
      comment: 'Great quality and texture. Perfect for my morning smoothies.',
      verified: true,
      date: '2024-01-10'
    },
    {
      id: '3',
      name: 'Priya K.',
      rating: 5,
      comment: 'Finally found a nut butter that\'s both healthy and delicious!',
      verified: true,
      date: '2024-01-08'
    }
  ],
  bestseller: true,
  dateAdded: '2024-01-01'
};

const relatedProducts: Product[] = [
  {
    id: '2',
    name: 'Moringa Cashew Butter',
    price: 16.99,
    image: 'https://images.pexels.com/photos/5946071/pexels-photo-5946071.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    category: 'nut-butters',
    description: 'Smooth cashew butter with superfood moringa',
    ingredients: ['moringa'],
    bestseller: false,
    dateAdded: '2024-01-01'
  },
  {
    id: '3',
    name: 'Protein Power Bar',
    price: 14.99,
    image: 'https://images.pexels.com/photos/4198843/pexels-photo-4198843.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    category: 'granola-bars',
    description: 'High-protein bar with mixed superfoods',
    ingredients: ['amla'],
    bestseller: true,
    dateAdded: '2024-01-01'
  },
  {
    id: '4',
    name: 'Wellness Gift Box',
    price: 45.99,
    image: 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    category: 'gift-boxes',
    description: 'Perfect starter pack for healthy living',
    ingredients: ['amla', 'moringa'],
    bestseller: false,
    dateAdded: '2024-01-01'
  }
];

export const ProductDetail: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [viewingPeople] = useState(Math.floor(Math.random() * 8) + 3);

  const product = sampleProduct;

  const handleAddToCart = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleQuantityChange = (change: number) => {
    setQuantity(prev => Math.max(1, Math.min(product.stock, prev + change)));
  };

  const renderStars = (rating: number, size = 'w-4 h-4') => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`${size} ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'benefits', label: 'Superfood Benefits' },
    { id: 'usage', label: 'How to Use' },
    { id: 'reviews', label: 'Reviews' }
  ];

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Breadcrumb */}
      <div className="bg-[#FAFAFA] border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3">
          <nav className="text-sm text-gray-600">
            <a href="/" className="hover:text-[#FF6F61]">Home</a>
            <span className="mx-2">/</span>
            <a href="/shop" className="hover:text-[#FF6F61]">Shop</a>
            <span className="mx-2">/</span>
            <a href={`/shop/${product.category}`} className="hover:text-[#FF6F61] capitalize">
              {product.category.replace('-', ' ')}
            </a>
            <span className="mx-2">/</span>
            <span className="text-[#333333] font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 group">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                {product.badges.map(badge => (
                  <span
                    key={badge}
                    className="px-2 py-1 bg-[#2F5D38] text-white text-xs rounded-full"
                  >
                    {badge}
                  </span>
                ))}
              </div>

              {/* Wishlist Button */}
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
              </button>
            </div>

            {/* Thumbnail Images */}
            <div className="flex space-x-2 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? 'border-[#FF6F61]' : 'border-gray-200'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Product Video (if available) */}
            {product.videoUrl && (
              <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="w-16 h-16 bg-[#FF6F61] rounded-full flex items-center justify-center hover:bg-[#FF6F61]/90 transition-colors">
                    <Play className="w-6 h-6 text-white ml-1" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-[#333333] mb-2">
                {product.name}
              </h1>
              <p className="text-lg text-gray-600 mb-4">
                {product.description}
              </p>

              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center">
                  {renderStars(product.rating)}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-3 mb-6">
                <span className="text-3xl font-bold text-[#FF6F61]">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    ${product.originalPrice}
                  </span>
                )}
                {product.originalPrice && (
                  <span className="px-2 py-1 bg-red-100 text-red-600 text-sm rounded-full">
                    Save ${(product.originalPrice - product.price).toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${product.stock > 10 ? 'bg-green-500' : 'bg-orange-500'}`} />
              <span className={`text-sm font-medium ${product.stock > 10 ? 'text-green-600' : 'text-orange-600'}`}>
                {product.stock > 10 ? 'In Stock' : `Only ${product.stock} left!`}
              </span>
            </div>

            {/* Live Viewing Counter */}
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span>{viewingPeople} people are viewing this product</span>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-2 font-medium">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= product.stock}
                  className="p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleAddToCart}
                className="w-full bg-[#FF6F61] text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-[#FF6F61]/90 hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Add to Cart - ${(product.price * quantity).toFixed(2)}</span>
              </button>
              
              <button className="w-full bg-[#2F5D38] text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-[#2F5D38]/90 transition-colors">
                Buy Now
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
              <div className="text-center">
                <Shield className="w-6 h-6 text-[#2F5D38] mx-auto mb-2" />
                <span className="text-xs text-gray-600">Secure Checkout</span>
              </div>
              <div className="text-center">
                <Truck className="w-6 h-6 text-[#2F5D38] mx-auto mb-2" />
                <span className="text-xs text-gray-600">Free Shipping $49+</span>
              </div>
              <div className="text-center">
                <RotateCcw className="w-6 h-6 text-[#2F5D38] mx-auto mb-2" />
                <span className="text-xs text-gray-600">Easy Returns</span>
              </div>
            </div>

            {/* Share Button */}
            <button className="flex items-center space-x-2 text-gray-600 hover:text-[#FF6F61] transition-colors">
              <Share2 className="w-4 h-4" />
              <span className="text-sm">Share this product</span>
            </button>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-[#FF6F61] text-[#FF6F61]'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            {activeTab === 'description' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Ingredients</h3>
                  <ul className="space-y-2">
                    {product.ingredients.map(ingredient => (
                      <li key={ingredient} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-[#2F5D38] rounded-full" />
                        <span>{ingredient}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">Nutrition Facts</h3>
                  <div className="space-y-2">
                    {Object.entries(product.nutritionFacts).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-gray-600">{key}:</span>
                        <span className="font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'benefits' && (
              <div>
                <h3 className="text-xl font-semibold mb-6">Superfood Benefits</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-3 p-4 bg-[#F5F0E6] rounded-lg">
                      <div className="w-6 h-6 bg-[#2F5D38] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs font-bold">{index + 1}</span>
                      </div>
                      <p className="text-gray-700">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'usage' && (
              <div>
                <h3 className="text-xl font-semibold mb-6">How to Use</h3>
                <div className="space-y-4">
                  {product.howToUse.map((use, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-[#FF6F61] rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm font-bold">{index + 1}</span>
                      </div>
                      <p className="text-gray-700 pt-1">{use}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold">Customer Reviews</h3>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      {renderStars(product.rating)}
                    </div>
                    <span className="text-sm text-gray-600">
                      {product.rating} out of 5 ({product.reviewCount} reviews)
                    </span>
                  </div>
                </div>

                <div className="space-y-6">
                  {(showAllReviews ? product.reviews : product.reviews.slice(0, 3)).map(review => (
                    <div key={review.id} className="border-b border-gray-200 pb-6">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <span className="font-medium">{review.name}</span>
                          {review.verified && (
                            <span className="px-2 py-1 bg-green-100 text-green-600 text-xs rounded-full">
                              Verified Buyer
                            </span>
                          )}
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(review.date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center mb-2">
                        {renderStars(review.rating)}
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>

                {product.reviews.length > 3 && (
                  <button
                    onClick={() => setShowAllReviews(!showAllReviews)}
                    className="mt-6 text-[#FF6F61] hover:underline font-medium"
                  >
                    {showAllReviews ? 'Show Less' : 'View All Reviews'}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-[#333333] mb-8">Other Nourishing Picks</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map(relatedProduct => (
              <div
                key={relatedProduct.id}
                className="group bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                onClick={() => window.location.href = `/product/${relatedProduct.id}`}
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <button
                    className="absolute bottom-3 right-3 w-10 h-10 bg-[#FF6F61] text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Add to cart logic
                    }}
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-[#333333] mb-1">
                    {relatedProduct.name}
                  </h4>
                  <p className="text-gray-600 text-sm mb-2">
                    {relatedProduct.description}
                  </p>
                  <p className="text-[#FF6F61] font-bold">
                    ${relatedProduct.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 lg:hidden z-40">
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <div className="text-sm text-gray-600">Total</div>
            <div className="text-lg font-bold text-[#FF6F61]">
              ${(product.price * quantity).toFixed(2)}
            </div>
          </div>
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-[#FF6F61] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#FF6F61]/90 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-24 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
          Added to cart successfully!
        </div>
      )}
    </div>
  );
};