import React from 'react';
import { Mail, Phone, Facebook, Instagram, Twitter, Leaf } from 'lucide-react';

const footerLinks = {
  shop: [
    { label: 'Granola Bars', href: '/shop/granola-bars' },
    { label: 'Nut Butters', href: '/shop/nut-butters' },
    { label: 'Gift Boxes', href: '/shop/gift-boxes' },
    { label: 'Subscriptions', href: '/shop/subscriptions' }
  ],
  resources: [
    { label: 'Blog', href: '/blog' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Sustainability', href: '/sustainability' },
    { label: 'Nutrition Guide', href: '/nutrition' }
  ],
  contact: [
    { label: 'hello@nourishroots.com', href: 'mailto:hello@nourishroots.com', icon: Mail },
    { label: '1-800-NOURISH', href: 'tel:1-800-668-7474', icon: Phone }
  ]
};

const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com/nourishroots', label: 'Facebook' },
  { icon: Instagram, href: 'https://instagram.com/nourishroots', label: 'Instagram' },
  { icon: Twitter, href: 'https://twitter.com/nourishroots', label: 'Twitter' }
];

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#2F5D38] text-[#F5F0E6]">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-[#F5F0E6] rounded-full flex items-center justify-center">
                <Leaf className="w-6 h-6 text-[#2F5D38]" />
              </div>
              <span className="text-2xl font-bold">NourishRoots</span>
            </div>
            
            <p className="text-[#F5F0E6]/90 leading-relaxed mb-6">
              Crafting plant-powered nutrition with locally sourced superfoods. 
              Every bite supports sustainable farming and your wellness journey.
            </p>
            
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-[#F5F0E6]/10 rounded-full flex items-center justify-center hover:bg-[#FF6F61] transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Shop</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[#F5F0E6]/90 hover:text-[#FF6F61] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[#F5F0E6]/90 hover:text-[#FF6F61] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact</h4>
            <ul className="space-y-3 mb-6">
              {footerLinks.contact.map((contact) => {
                const Icon = contact.icon;
                return (
                  <li key={contact.label}>
                    <a
                      href={contact.href}
                      className="flex items-center space-x-3 text-[#F5F0E6]/90 hover:text-[#FF6F61] transition-colors"
                    >
                      <Icon className="w-4 h-4" />
                      <span>{contact.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
            
            {/* Newsletter Signup */}
            <div>
              <h5 className="font-semibold mb-3">Stay Updated</h5>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-[#F5F0E6]/10 border border-[#F5F0E6]/20 rounded-l-lg focus:outline-none focus:border-[#FF6F61] text-sm"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#FF6F61] text-white rounded-r-lg hover:bg-[#FF6F61]/90 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#F5F0E6]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-[#F5F0E6]/70 text-sm">
              © 2025 NourishRoots. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="/privacy" className="text-[#F5F0E6]/70 hover:text-[#FF6F61] transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="text-[#F5F0E6]/70 hover:text-[#FF6F61] transition-colors">
                Terms of Service
              </a>
              <a href="/accessibility" className="text-[#F5F0E6]/70 hover:text-[#FF6F61] transition-colors">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};