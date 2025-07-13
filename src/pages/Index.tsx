
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import FeaturedEvents from '../components/FeaturedEvents';
import AIAdvisorSection from '../components/AIAdvisorSection';
import ClubsSection from '../components/ClubsSection';
import FeedbackSection from '../components/FeedbackSection';
import Footer from '../components/Footer';
import AdminDashboard from '../components/AdminDashboard';
import CreateEventModal from '../components/CreateEventModal';
import CreateClubModal from '../components/CreateClubModal';
import ViewRegistrationsModal from '../components/ViewRegistrationsModal';
import { ToastProvider } from '../components/ToastContainer';
import { useAdmin } from '../contexts/AdminContext';

const Index = () => {
  const { isAdmin } = useAdmin();
  const [showCreateEventModal, setShowCreateEventModal] = useState(false);
  const [showCreateClubModal, setShowCreateClubModal] = useState(false);
  const [showRegistrationsModal, setShowRegistrationsModal] = useState(false);

  const handleEventCreated = () => {
    console.log('Event created successfully');
    // In real app, refresh events list
  };

  const handleClubCreated = () => {
    console.log('Club created successfully');
    // In real app, refresh clubs list
  };

  return (
    <ToastProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        
        {isAdmin ? (
          <>
            <AdminDashboard
              onCreateEvent={() => setShowCreateEventModal(true)}
              onCreateClub={() => setShowCreateClubModal(true)}
              onViewRegistrations={() => setShowRegistrationsModal(true)}
            />
            
            {/* Admin Modals */}
            <CreateEventModal
              isOpen={showCreateEventModal}
              onClose={() => setShowCreateEventModal(false)}
              onEventCreated={handleEventCreated}
            />
            <CreateClubModal
              isOpen={showCreateClubModal}
              onClose={() => setShowCreateClubModal(false)}
              onClubCreated={handleClubCreated}
            />
            <ViewRegistrationsModal
              isOpen={showRegistrationsModal}
              onClose={() => setShowRegistrationsModal(false)}
            />
          </>
        ) : (
          <>
            <Hero />
            <FeaturedEvents />
            <AIAdvisorSection />
            <ClubsSection />
            <FeedbackSection />
          </>
        )}
        
        <Footer />
      </div>
    </ToastProvider>
  );
};

export default Index;
