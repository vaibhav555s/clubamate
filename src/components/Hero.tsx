import React, { useState } from "react";
import { Search } from "lucide-react";

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);

    const eventsSection = document.getElementById("events");
    if (eventsSection) {
      eventsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleExploreEvents = () => {
    const eventsSection = document.getElementById("events");
    if (eventsSection) {
      eventsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-background to-muted flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-8 text-center">
        {/* Main Headline */}
        <h1 className="text-[72px] md:text-[72px] sm:text-[48px] font-semibold text-foreground leading-[1.1] mb-6 mt-12 md:mt-0">
          Discover campus events
          <br />
          that matter
        </h1>

        {/* Subheadline */}
        <p className="text-xl md:text-xl sm:text-lg font-normal text-muted-foreground leading-[1.6] mb-12 max-w-2xl mx-auto">
          Your personalized guide to campus life
        </p>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="relative max-w-[500px] mx-auto mb-8"
        >
          <input
            type="text"
            placeholder="Search events, clubs, or topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-14 bg-card border border-border rounded-xl px-5 pr-12 text-base font-normal text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors duration-200"
          />
          <button
            type="submit"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>
        </form>

        {/* CTA Button */}
        <button
          onClick={handleExploreEvents}
          className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium text-base hover:opacity-95 transition-opacity hover-lift"
        >
          Explore Events
        </button>
      </div>
    </section>
  );
};

export default Hero;
