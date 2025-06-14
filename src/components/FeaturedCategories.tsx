import React from 'react';
import type { Category } from '../types';

const categories: Category[] = [
  {
    id: '1',
    name: 'Granola Bars',
    image: 'https://images.pexels.com/photos/4198843/pexels-photo-4198843.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
    slug: 'granola-bars'
  },
  {
    id: '2',
    name: 'Nut Butters',
    image: 'https://images.pexels.com/photos/5966629/pexels-photo-5966629.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
    slug: 'nut-butters'
  },
  {
    id: '3',
    name: 'E-Gift Boxes',
    image: 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
    slug: 'gift-boxes'
  }
];

export const FeaturedCategories: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#333333] mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our carefully crafted collection of plant-powered nutrition
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              onClick={() => window.location.href = `/shop/${category.slug}`}
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#333333]/60 to-transparent flex items-end justify-center pb-4">
                  <h3 className="text-white text-xl md:text-2xl font-semibold">
                    {category.name}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};