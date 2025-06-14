import React, { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp, Filter, X, ShoppingCart, Grid, List } from 'lucide-react';
import type { Product, FilterState } from '../types';

const products: Product[] = [
  {
    id: '1',
    name: 'Amla Power Bar',
    price: 12.99,
    image: 'https://images.pexels.com/photos/4198843/pexels-photo-4198843.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    category: 'granola-bars',
    description: 'High-protein bar with vitamin C-rich amla',
    ingredients: ['amla'],
    bestseller: true,
    dateAdded: '2024-01-15'
  },
  {
    id: '2',
    name: 'Moringa Almond Butter',
    price: 18.99,
    image: 'https://images.pexels.com/photos/5966629/pexels-photo-5966629.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    category: 'nut-butters',
    description: 'Creamy almond butter infused with moringa',
    ingredients: ['moringa'],
    bestseller: false,
    dateAdded: '2024-02-01'
  },
  {
    id: '3',
    name: 'Protein Crunch Bar',
    price: 14.99,
    image: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    category: 'granola-bars',
    description: 'Extra protein boost with mixed nuts',
    ingredients: [],
    bestseller: true,
    dateAdded: '2024-01-20'
  },
  {
    id: '4',
    name: 'Superfood Gift Box',
    price: 45.99,
    image: 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    category: 'gift-boxes',
    description: 'Curated selection of our best products',
    ingredients: ['amla', 'moringa'],
    bestseller: true,
    dateAdded: '2024-01-10'
  },
  {
    id: '5',
    name: 'Cashew Vanilla Butter',
    price: 16.99,
    image: 'https://images.pexels.com/photos/5946071/pexels-photo-5946071.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    category: 'nut-butters',
    description: 'Smooth cashew butter with vanilla essence',
    ingredients: [],
    bestseller: false,
    dateAdded: '2024-02-10'
  },
  {
    id: '6',
    name: 'Ashwagandha Energy Bar',
    price: 15.99,
    image: 'https://images.pexels.com/photos/4198843/pexels-photo-4198843.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    category: 'granola-bars',
    description: 'Adaptogenic bar for sustained energy',
    ingredients: ['ashwagandha'],
    bestseller: false,
    dateAdded: '2024-02-15'
  },
  {
    id: '7',
    name: 'Wellness Gift Set',
    price: 32.99,
    image: 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    category: 'gift-boxes',
    description: 'Perfect starter pack for healthy living',
    ingredients: ['moringa'],
    bestseller: false,
    dateAdded: '2024-01-25'
  },
  {
    id: '8',
    name: 'Peanut Moringa Butter',
    price: 13.99,
    image: 'https://images.pexels.com/photos/5966629/pexels-photo-5966629.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    category: 'nut-butters',
    description: 'Classic peanut butter with superfood twist',
    ingredients: ['moringa'],
    bestseller: true,
    dateAdded: '2024-01-30'
  }
];

const categories = [
  { id: 'granola-bars', label: 'Granola Bars' },
  { id: 'nut-butters', label: 'Nut Butters' },
  { id: 'gift-boxes', label: 'E-Gift Boxes' }
];

const ingredients = [
  { id: 'amla', label: 'Amla' },
  { id: 'moringa', label: 'Moringa' },
  { id: 'ashwagandha', label: 'Ashwagandha' },
  { id: 'none', label: 'None' }
];

const sortOptions = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'bestsellers', label: 'Bestsellers' },
  { value: 'newest', label: 'Newest First' }
];

export const Shop: React.FC = () => {
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    ingredients: [],
    priceRange: [0, 50]
  });
  const [sortBy, setSortBy] = useState('relevance');
  const [currentPage, setCurrentPage] = useState(1);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    ingredients: true,
    price: true
  });

  const itemsPerPage = 9;

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      // Category filter
      if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
        return false;
      }

      // Ingredients filter
      if (filters.ingredients.length > 0) {
        if (filters.ingredients.includes('none')) {
          if (product.ingredients.length > 0 && !filters.ingredients.some(ing => ing !== 'none' && product.ingredients.includes(ing))) {
            return false;
          }
        } else {
          if (!filters.ingredients.some(ing => product.ingredients.includes(ing))) {
            return false;
          }
        }
      }

      // Price filter
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false;
      }

      return true;
    });

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'bestsellers':
        filtered.sort((a, b) => (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0));
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
        break;
      default:
        // Keep original order for relevance
        break;
    }

    return filtered;
  }, [filters, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleFilterChange = (type: keyof FilterState, value: any) => {
    setFilters(prev => ({
      ...prev,
      [type]: value
    }));
    setCurrentPage(1);
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const resetFilters = () => {
    setFilters({
      categories: [],
      ingredients: [],
      priceRange: [0, 50]
    });
    setCurrentPage(1);
  };

  const FilterSection = () => (
    <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-[#333333]">Filter By</h3>
        <button
          onClick={resetFilters}
          className="text-sm text-[#FF6F61] hover:underline"
        >
          Reset All
        </button>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('category')}
          className="flex items-center justify-between w-full text-left font-medium text-[#333333] mb-3"
        >
          Category
          {expandedSections.category ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {expandedSections.category && (
          <div className="space-y-2">
            {categories.map(category => (
              <label key={category.id} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(category.id)}
                  onChange={(e) => {
                    const newCategories = e.target.checked
                      ? [...filters.categories, category.id]
                      : filters.categories.filter(c => c !== category.id);
                    handleFilterChange('categories', newCategories);
                  }}
                  className="rounded border-gray-300 text-[#FF6F61] focus:ring-[#FF6F61]"
                />
                <span className="text-sm text-gray-700">{category.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Ingredients Filter */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('ingredients')}
          className="flex items-center justify-between w-full text-left font-medium text-[#333333] mb-3"
        >
          Superfood Ingredient
          {expandedSections.ingredients ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {expandedSections.ingredients && (
          <div className="space-y-2">
            {ingredients.map(ingredient => (
              <label key={ingredient.id} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.ingredients.includes(ingredient.id)}
                  onChange={(e) => {
                    const newIngredients = e.target.checked
                      ? [...filters.ingredients, ingredient.id]
                      : filters.ingredients.filter(i => i !== ingredient.id);
                    handleFilterChange('ingredients', newIngredients);
                  }}
                  className="rounded border-gray-300 text-[#FF6F61] focus:ring-[#FF6F61]"
                />
                <span className="text-sm text-gray-700">{ingredient.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Range Filter */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('price')}
          className="flex items-center justify-between w-full text-left font-medium text-[#333333] mb-3"
        >
          Price Range
          {expandedSections.price ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {expandedSections.price && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">${filters.priceRange[0]}</span>
              <span className="text-sm text-gray-600">${filters.priceRange[1]}</span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              step="1"
              value={filters.priceRange[1]}
              onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], parseInt(e.target.value)])}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-20">
      {/* Breadcrumb */}
      <div className="sticky top-20 bg-white border-b z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3">
          <nav className="text-sm text-gray-600">
            <a href="/" className="hover:text-[#FF6F61]">Home</a>
            <span className="mx-2">/</span>
            <span className="text-[#333333] font-medium">Shop</span>
          </nav>
        </div>
      </div>

      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#333333] mb-4">
            Shop All Products
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our full range of nutritious, plant-powered snacks
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <FilterSection />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filter Button & Sort */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setShowMobileFilters(true)}
                className="lg:hidden flex items-center space-x-2 px-4 py-2 bg-white rounded-lg border shadow-sm"
              >
                <Filter className="w-4 h-4" />
                <span>Show Filters</span>
              </button>

              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  {filteredProducts.length} products
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 bg-white border rounded-lg focus:outline-none focus:border-[#FF6F61]"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {paginatedProducts.map(product => (
                <div
                  key={product.id}
                  className="group bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                  onClick={() => window.location.href = `/product/${product.id}`}
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    {product.bestseller && (
                      <div className="absolute top-3 left-3 bg-[#FF6F61] text-white text-xs px-2 py-1 rounded-full">
                        Bestseller
                      </div>
                    )}
                    <button
                      className="absolute bottom-3 right-3 w-10 h-10 bg-[#FF6F61] text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-[#FF6F61]/90"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Add to cart logic
                      }}
                      aria-label="Add to cart"
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="p-4">
                    <h4 className="font-semibold text-[#333333] mb-1 text-lg">
                      {product.name}
                    </h4>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-1">
                      {product.description}
                    </p>
                    <p className="text-[#FF6F61] font-bold text-lg">
                      ${product.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 text-sm border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 text-sm rounded-lg ${
                      currentPage === page
                        ? 'bg-[#FF6F61] text-white'
                        : 'border hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 text-sm border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowMobileFilters(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-80 bg-white overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Filters</h3>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <FilterSection />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};