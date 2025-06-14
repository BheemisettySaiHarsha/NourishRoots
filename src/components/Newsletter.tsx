import React, { useState } from 'react';
import { Mail } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setShowToast(true);
      setEmail('');
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  return (
    <>
      <section className="py-12 md:py-16 bg-[#F5F0E6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-[#333333] mb-4">
                Join the Root Club
              </h3>
              <p className="text-lg text-gray-600">
                Get 10% off your first order & exclusive recipes delivered to your inbox.
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-0 py-3 text-lg bg-transparent border-0 border-b-2 border-gray-300 focus:border-[#FF6F61] focus:outline-none transition-colors"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-[#FF6F61] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#FF6F61]/90 transition-colors flex items-center justify-center space-x-2"
              >
                <Mail className="w-5 h-5" />
                <span>Subscribe</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-24 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
          Thanks for subscribing!
        </div>
      )}
    </>
  );
};