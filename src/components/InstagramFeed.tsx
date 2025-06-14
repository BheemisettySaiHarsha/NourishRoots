import React from 'react';
import { Heart, MessageCircle, Instagram } from 'lucide-react';
import type { InstagramPost } from '../types';

const instagramPosts: InstagramPost[] = [
  {
    id: '1',
    image: 'https://images.pexels.com/photos/4198843/pexels-photo-4198843.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    likes: 245,
    comments: 12
  },
  {
    id: '2',
    image: 'https://images.pexels.com/photos/5966629/pexels-photo-5966629.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    likes: 189,
    comments: 8
  },
  {
    id: '3',
    image: 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    likes: 321,
    comments: 24
  },
  {
    id: '4',
    image: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    likes: 156,
    comments: 6
  }
];

export const InstagramFeed: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-[#333333] mb-4 flex items-center justify-center space-x-3">
            <Instagram className="w-8 h-8 text-[#FF6F61]" />
            <span>@nourishroots on Instagram</span>
          </h3>
          <p className="text-lg text-gray-600">
            Follow us for daily inspiration and behind-the-scenes content
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {instagramPosts.map((post, index) => (
            <div
              key={post.id}
              className={`
                group relative overflow-hidden rounded-lg cursor-pointer
                ${index === 0 ? 'md:col-span-2 md:row-span-2' : ''}
              `}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={post.image}
                  alt={`Instagram post ${post.id}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="flex items-center space-x-6 text-white">
                  <div className="flex items-center space-x-2">
                    <Heart className="w-6 h-6" />
                    <span className="font-semibold">{post.likes}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MessageCircle className="w-6 h-6" />
                    <span className="font-semibold">{post.comments}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="https://instagram.com/nourishroots"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-shadow"
          >
            <Instagram className="w-5 h-5" />
            <span>Follow @nourishroots</span>
          </a>
        </div>
      </div>
    </section>
  );
};