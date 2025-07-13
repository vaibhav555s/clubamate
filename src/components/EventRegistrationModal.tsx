import React, { useState } from 'react';
import { X, Calendar, MapPin, Clock, Mail } from 'lucide-react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from './ToastContainer';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
}

interface EventRegistrationModalProps {
  event: Event;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const EventRegistrationModal: React.FC<EventRegistrationModalProps> = ({ 
  event, 
  isOpen, 
  onClose, 
  onSuccess 
}) => {
  const { user, signInWithGoogle } = useAuth();
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    phone: '',
    branch: '',
    year: new Date().getFullYear()
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      try {
        await signInWithGoogle();
        return;
      } catch (error) {
        showToast('Please sign in to register for events', 'error');
        return;
      }
    }

    if (!formData.phone.trim()) {
      showToast('Please enter your phone number', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      const registrationData = {
        eventId: event.id,
        eventName: event.title,
        eventDate: event.date,
        eventTime: event.time,
        eventLocation: event.location,
        userId: user.uid,
        userName: user.name,
        userEmail: user.email,
        userPhone: formData.phone,
        userBranch: formData.branch,
        userYear: formData.year,
        registeredAt: new Date(),
        status: 'confirmed'
      };

      await addDoc(collection(db, 'registrations'), registrationData);

      showToast('Registration successful! 🎉 Check your email for confirmation.', 'success');
      onSuccess?.();
      onClose();
      
      // Reset form
      setFormData({
        phone: '',
        branch: '',
        year: new Date().getFullYear()
      });

    } catch (error) {
      console.error('Registration error:', error);
      showToast('Registration failed. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAuthAndRegister = async () => {
    try {
      await signInWithGoogle();
      // Modal will stay open and form will be available after sign-in
    } catch (error) {
      showToast('Sign-in failed. Please try again.', 'error');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Event Registration</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Event Info */}
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-900">{event.title}</h3>
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="w-4 h-4 mr-2" />
              <span>{event.date}</span>
              <Clock className="w-4 h-4 ml-4 mr-2" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="w-4 h-4 mr-2" />
              <span>{event.location}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {!user ? (
            /* Sign-in prompt */
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <Mail className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Sign in to Register</h3>
                <p className="text-gray-600 mb-6">Please sign in with your Google account to register for this event.</p>
              </div>
              <button
                onClick={handleAuthAndRegister}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
              >
                Sign in with Google
              </button>
            </div>
          ) : (
            /* Registration form */
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Pre-filled user info */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={user.name}
                    disabled
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={user.email}
                    disabled
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="Enter your phone number"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Branch/Department
                  </label>
                  <input
                    type="text"
                    value={formData.branch}
                    onChange={(e) => setFormData(prev => ({ ...prev, branch: e.target.value }))}
                    placeholder="e.g., Computer Science"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Year
                  </label>
                  <select
                    value={formData.year}
                    onChange={(e) => setFormData(prev => ({ ...prev, year: parseInt(e.target.value) }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value={2024}>1st Year</option>
                    <option value={2025}>2nd Year</option>
                    <option value={2026}>3nd Year</option>
                    <option value={2027}>4th Year</option>
                  </select>
                </div>
              </div>

              {/* Email confirmation note */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start">
                  <Mail className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                  <p className="text-sm text-blue-800">
                    📩 A confirmation email will be sent to you after successful registration.
                  </p>
                </div>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-emerald-600 text-white py-3 rounded-xl font-semibold hover:bg-emerald-700 transition-colors shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Registering...' : 'Complete Registration'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventRegistrationModal;