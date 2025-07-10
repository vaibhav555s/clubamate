
import React, { useState } from 'react';
import { Search } from 'lucide-react';

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'2\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center py-20 lg:py-32">
        {/* Main Heading */}
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight animate-fade-in">
          Discover Amazing
          <span className="block bg-gradient-to-r from-emerald-300 to-emerald-400 bg-clip-text text-transparent">
            Campus Events
          </span>
        </h1>

        {/* Subtext */}
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
          Connect with student clubs, discover exciting events, and never miss
          out on campus activities that matter to you.
        </p>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="relative max-w-xl mx-auto mb-8"
        >
          <input
            type="text"
            placeholder="Search events, clubs, or topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-6 py-4 pr-12 rounded-2xl border-0 bg-white/10 backdrop-blur-sm text-white placeholder-blue-200 focus:ring-2 focus:ring-blue-400 focus:bg-white/20 transition-all duration-200"
          />
          <button
            type="submit"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-300 hover:text-white transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>
        </form>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105">
            Explore Events
          </button>
          <button className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 backdrop-blur-sm transition-all duration-300">
            View Clubs
          </button>
        </div>

        {/* AI Assistant Promotion */}
        <div className="text-blue-200 text-sm font-medium animate-pulse">
          💬 Need help finding events? Try our AI assistant powered by Gemini!
        </div>
      </div>
    </section>
  );
};

export default Hero;
