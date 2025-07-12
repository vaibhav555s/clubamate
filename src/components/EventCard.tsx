
import React, { useState, useEffect } from 'react';
import { useToast } from './ToastContainer';
import { useAuth } from '../contexts/AuthContext';
import EventRegistrationModal from './EventRegistrationModal';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig"; 

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  club: string;
  description: string;
  registered: number;
  capacity: number;
  category: string;
}

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const [currentRegistered, setCurrentRegistered] = useState(event.registered);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const { showToast } = useToast();
  const { user, signInWithGoogle } = useAuth();

  const registrationPercentage = (currentRegistered / event.capacity) * 100;
  const isNearlyFull = registrationPercentage > 80;
  const isFull = registrationPercentage >= 100;

  const getProgressBarColor = () => {
    if (isFull) return 'bg-red-500';
    if (isNearlyFull) return 'bg-amber-500';
    return 'bg-emerald-500';
  };

  const handleRegistration = () => {
    if (isFull) return;
    
    if (!user) {
      signInWithGoogle().catch(() => {
        showToast('Please sign in to register for events', 'error');
      });
      return;
    }
    
    setShowRegistrationModal(true);
  };

  const handleRegistrationSuccess = () => {
    setCurrentRegistered(prev => prev + 1);
  };

  useEffect(() => {
    const checkRegistration = async () => {
      if (!user) return;

      const q = query(
        collection(db, "registrations"),
        where("eventId", "==", event.id),
        where("userId", "==", user.uid)
      );

      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        setAlreadyRegistered(true);
      }
    };

    checkRegistration();
  }, [user, event.id]);

  return (
    <>
      <div className="bg-card border border-border rounded-xl p-8 hover:border-primary transition-colors duration-200 group">
        {/* Club Badge */}
        <div className="bg-muted text-muted-foreground px-3 py-1.5 rounded-md text-xs font-medium mb-4 inline-block">
          {event.club}
        </div>

        {/* Event Title */}
        <h3 className="text-2xl font-semibold text-foreground mb-2 leading-[1.3] group-hover:text-primary transition-colors">
          {event.title}
        </h3>

        {/* Date & Time */}
        <div className="text-base font-medium text-muted-foreground mb-1">
          {event.date} • {event.time}
        </div>

        {/* Location */}
        <div className="text-base font-normal text-tertiary mb-6">
          {event.location}
        </div>

        {/* Description */}
        <p className="text-base font-normal text-muted-foreground leading-[1.5] mb-8 line-clamp-3">
          {event.description}
        </p>

        {/* Registration Status */}
        <div className="text-sm font-medium text-muted-foreground mb-4">
          {currentRegistered} / {event.capacity} registered
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-muted rounded-sm h-1 mb-8">
          <div
            className={`h-1 rounded-sm transition-all duration-300 ${getProgressBarColor()}`}
            style={{ width: `${Math.min(registrationPercentage, 100)}%` }}
          ></div>
        </div>

        {/* Register Button */}
        <button
          onClick={handleRegistration}
          disabled={isFull || alreadyRegistered}
          className={`w-full h-11 rounded-lg font-medium text-base transition-opacity duration-200 hover-lift ${
            isFull || alreadyRegistered
              ? "bg-muted text-muted-foreground cursor-not-allowed"
              : "bg-primary text-primary-foreground hover:opacity-95"
          }`}
        >
          {isFull
            ? "Full"
            : alreadyRegistered
            ? "Registered"
            : "Register"}
        </button>
      </div>

      <EventRegistrationModal
        event={event}
        isOpen={showRegistrationModal}
        onClose={() => setShowRegistrationModal(false)}
        onSuccess={handleRegistrationSuccess}
      />
    </>
  );
};

export default EventCard;
