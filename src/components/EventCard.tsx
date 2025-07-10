
import React, { useState } from 'react';
import { Calendar, MapPin, Users } from 'lucide-react';
import { useToast } from './ToastContainer';
import { useAuth } from '../contexts/AuthContext';
import EventRegistrationModal from './EventRegistrationModal';

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
  const { showToast } = useToast();
  const { user, signInWithGoogle } = useAuth();

  const registrationPercentage = (currentRegistered / event.capacity) * 100;
  const isNearlyFull = registrationPercentage > 80;
  const isFull = registrationPercentage >= 100;

  const getProgressBarColor = () => {
    if (isFull) return 'bg-red-500';
    if (isNearlyFull) return 'bg-orange-500';
    return 'bg-gradient-to-r from-blue-500 to-blue-600';
  };

  const getCategoryColor = () => {
    switch (event.category) {
      case 'Workshop': return 'bg-blue-100 text-blue-800';
      case 'Hackathon': return 'bg-purple-100 text-purple-800';
      case 'Seminar': return 'bg-emerald-100 text-emerald-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleRegistration = () => {
    if (isFull) return;
    
    if (!user) {
      // Trigger sign-in first
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

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:scale-105">
      {/* Header Section */}
      <div className="p-6 pb-4">
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mb-3 ${getCategoryColor()}`}>
          {event.club}
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors leading-tight">
          {event.title}
        </h3>
        
        <div className="flex items-center text-sm text-gray-500 mb-1">
          <Calendar className="w-4 h-4 mr-2 text-gray-400" />
          <span>{event.date} • {event.time}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <MapPin className="w-4 h-4 mr-2 text-gray-400" />
          <span>{event.location}</span>
        </div>
      </div>

      {/* Description */}
      <div className="px-6 pb-4">
        <p className="text-gray-600 text-sm leading-relaxed">
          {event.description}
        </p>
      </div>

      {/* Registration Progress */}
      <div className="px-6 pb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center text-sm text-gray-500">
            <Users className="w-4 h-4 mr-1" />
            <span>{currentRegistered} / {event.capacity} registered</span>
          </div>
          <span className={`text-xs font-medium ${isNearlyFull ? 'text-orange-600' : 'text-blue-600'}`}>
            {Math.round(registrationPercentage)}%
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${getProgressBarColor()}`}
            style={{ width: `${Math.min(registrationPercentage, 100)}%` }}
          ></div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 pb-6">
        <button 
          onClick={handleRegistration}
          disabled={isFull}
          className={`w-full py-3 rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg ${
            isFull 
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
              : 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:from-emerald-600 hover:to-emerald-700 hover:scale-105'
          }`}
        >
          {isFull ? 'Registration Full' : 'Register Now'}
        </button>
      </div>
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
