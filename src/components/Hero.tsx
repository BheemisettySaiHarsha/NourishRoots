import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed transform scale-105"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/4253312/pexels-photo-4253312.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-transparent" />
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
          style={{ textShadow: '0 2px 4px rgba(0,0,0,0.4)' }}
        >
          Powered by Plants, Crafted with Care
        </h1>
        
        <p className="text-lg md:text-xl mb-8 opacity-90 leading-relaxed">
          Discover our high-protein granola bars & nut butters infused with amla & moringa.
        </p>
        
        <button className="
          bg-[#FF6F61] text-white font-semibold uppercase tracking-wide
          px-8 py-4 rounded-full text-sm
          hover:shadow-lg hover:-translate-y-0.5 
          transition-all duration-200 ease-out
          focus:outline-none focus:ring-2 focus:ring-[#FF6F61] focus:ring-offset-2
        ">
          Shop Now
        </button>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};