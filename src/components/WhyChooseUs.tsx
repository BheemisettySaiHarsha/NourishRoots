import React from 'react';
import { Zap, Leaf, RefreshCw } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useScrollSpy';

const benefits = [
  {
    icon: Zap,
    title: 'High-Protein Recipes',
    description: '25g+ protein per serving.'
  },
  {
    icon: Leaf,
    title: 'Local Superfoods',
    description: 'Amla & moringa from certified farms.'
  },
  {
    icon: RefreshCw,
    title: 'Eco-Friendly Packaging',
    description: '100% compostable wrappers.'
  }
];

export const WhyChooseUs: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver(0.2);

  return (
    <section className="py-16 md:py-24 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#333333] mb-4">
            Why Choose NourishRoots?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're committed to providing you with the highest quality, most nutritious snacks
          </p>
        </div>
        
        <div 
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
        >
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className={`
                  text-center group transition-all duration-300 ease-out
                  ${isVisible 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-5 opacity-0'
                  }
                `}
                style={{ 
                  transitionDelay: isVisible ? `${index * 100}ms` : '0ms' 
                }}
              >
                <div className="w-20 h-20 mx-auto mb-6 bg-[#2F5D38] rounded-full flex items-center justify-center group-hover:bg-[#FF6F61] transition-colors duration-300">
                  <Icon className="w-10 h-10 text-white" />
                </div>
                
                <h4 className="text-xl font-semibold text-[#333333] mb-3">
                  {benefit.title}
                </h4>
                
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};