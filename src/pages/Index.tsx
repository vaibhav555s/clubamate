
import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import FeaturedEvents from '../components/FeaturedEvents';
import AIAdvisorSection from '../components/AIAdvisorSection';
import ClubsSection from '../components/ClubsSection';
import FeedbackSection from '../components/FeedbackSection';
import Footer from '../components/Footer';
import { ToastProvider } from '../components/ToastContainer';

const Index = () => {
  return (
    <ToastProvider>
      <div className="min-h-screen bg-white">
        <Navbar />
        <Hero />
        <FeaturedEvents />
        <AIAdvisorSection />
        <ClubsSection />
        <FeedbackSection />
        <Footer />
      </div>
    </ToastProvider>
  );
};

export default Index;
