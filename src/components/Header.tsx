import React, { useState } from 'react';
import { Search, ShoppingCart, Menu, X, Leaf } from 'lucide-react';
import { useScrollSpy } from '../hooks/useScrollSpy';
import type { NavigationItem } from '../types';

const navigationItems: NavigationItem[] = [
  { label: 'Shop', href: '/shop' },
  { label: 'E-Gifts', href: '/e-gifts' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
];

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [cartCount] = useState(3);
  const scrolled = useScrollSpy();

  return (
    <header className={`
      fixed top-0 left-0 right-0 z-50 bg-white shadow-sm transition-all duration-300 ease-in-out
      ${scrolled ? 'h-14' : 'h-20'}
    `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#2F5D38] rounded-full flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-[#2F5D38]">NourishRoots</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-[#333333] hover:text-[#2F5D38] transition-colors duration-150 relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#2F5D38] group-hover:w-full transition-all duration-150 ease-in"></span>
              </a>
            ))}
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <button
                onClick={() => setIsSearchExpanded(!isSearchExpanded)}
                className="p-2 text-[#333333] hover:text-[#2F5D38] transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>
              {isSearchExpanded && (
                <input
                  type="text"
                  placeholder="Search products..."
                  className="absolute right-0 top-full mt-2 w-64 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#FF6F61]"
                  autoFocus
                />
              )}
            </div>

            {/* Cart */}
            <button className="relative p-2 text-[#333333] hover:text-[#2F5D38] transition-colors">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#FF6F61] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-[#333333] hover:text-[#2F5D38] transition-colors"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t">
            <nav className="px-4 py-4 space-y-4">
              {navigationItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block text-[#333333] hover:text-[#2F5D38] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};