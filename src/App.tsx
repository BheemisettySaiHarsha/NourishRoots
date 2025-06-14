import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FeaturedCategories } from './components/FeaturedCategories';
import { WhyChooseUs } from './components/WhyChooseUs';
import { BestSellers } from './components/BestSellers';
import { Newsletter } from './components/Newsletter';
import { InstagramFeed } from './components/InstagramFeed';
import { Footer } from './components/Footer';
import { Shop } from './components/Shop';
import { ProductDetail } from './components/ProductDetail';

function App() {
  // Simple routing based on URL path
  const path = window.location.pathname;
  
  if (path === '/shop') {
    return (
      <div className="min-h-screen">
        <Header />
        <main>
          <Shop />
        </main>
        <Footer />
      </div>
    );
  }

  if (path.startsWith('/product/')) {
    return (
      <div className="min-h-screen">
        <Header />
        <main>
          <ProductDetail />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <FeaturedCategories />
        <WhyChooseUs />
        <BestSellers />
        <Newsletter />
        <InstagramFeed />
      </main>
      <Footer />
    </div>
  );
}

export default App;