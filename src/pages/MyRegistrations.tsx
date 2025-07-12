
import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { useAuth } from '../contexts/AuthContext';
import { Calendar, MapPin, ArrowLeft, Clock, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ToastProvider } from '../components/ToastContainer';

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

interface Registration {
  id: string;
  eventId: string;
  userId: string;
  status: 'confirmed' | 'cancelled';
  registeredAt: any;
  event?: Event;
}

const MyRegistrations = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchRegistrations = async () => {
      if (!user) return;

      try {
        const q = query(
          collection(db, 'registrations'),
          where('userId', '==', user.uid)
        );

        const querySnapshot = await getDocs(q);
        const fetchedRegistrations: Registration[] = [];

        for (const docSnap of querySnapshot.docs) {
          const registrationData = {
            id: docSnap.id,
            ...docSnap.data()
          } as Registration;

          // Fetch event details
          const eventDoc = await getDoc(doc(db, 'events', registrationData.eventId));
          if (eventDoc.exists()) {
            registrationData.event = {
              id: eventDoc.id,
              ...eventDoc.data()
            } as Event;
          }

          fetchedRegistrations.push(registrationData);
        }

        setRegistrations(fetchedRegistrations);
      } catch (error) {
        console.error('Error fetching registrations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, [user]);

  const getCountdown = (eventDate: string, eventTime: string) => {
    const eventDateTime = new Date(`${eventDate} ${eventTime}`);
    const now = new Date();
    const timeDiff = eventDateTime.getTime() - now.getTime();

    if (timeDiff <= 0) {
      return 'Event has started';
    }

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!user) {
    return (
      <ToastProvider>
        <div className="min-h-screen bg-white">
          <Navbar />
          <div className="pt-16 flex items-center justify-center min-h-screen">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Please Sign In</h1>
              <p className="text-gray-600 mb-8">You need to be signed in to view your registrations.</p>
              <Link
                to="/"
                className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
              >
                Go to Home
              </Link>
            </div>
          </div>
          <Footer />
        </div>
      </ToastProvider>
    );
  }

  return (
    <ToastProvider>
      <div className="min-h-screen bg-white">
        <Navbar />
        
        <div className="pt-16 bg-gray-50 min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="mb-8">
              <Link
                to="/"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors mb-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Events
              </Link>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">My Registrations</h1>
              <p className="text-xl text-gray-600">
                Manage and view all your event registrations
              </p>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-2 text-gray-600">Loading your registrations...</span>
              </div>
            ) : registrations.length === 0 ? (
              /* Empty State */
              <div className="text-center py-16">
                <div className="mb-8">
                  <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    No registrations yet
                  </h2>
                  <p className="text-gray-600 max-w-md mx-auto mb-8">
                    You haven't registered for any events yet. Explore events and register to get started!
                  </p>
                </div>
                <Link
                  to="/#events"
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  Explore Events
                </Link>
              </div>
            ) : (
              /* Registrations Grid */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {registrations.map((registration) => {
                  if (!registration.event) return null;
                  
                  const event = registration.event;
                  const countdown = getCountdown(event.date, event.time);
                  
                  return (
                    <div
                      key={registration.id}
                      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:scale-105"
                    >
                      {/* Status Badge */}
                      <div className="p-6 pb-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {event.club}
                          </div>
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              registration.status === 'confirmed'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {registration.status === 'confirmed' ? 'Confirmed' : 'Cancelled'}
                          </span>
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

                        {/* Countdown Timer */}
                        <div className="flex items-center text-sm mb-3">
                          <Clock className="w-4 h-4 mr-2 text-orange-500" />
                          <span className={`font-medium ${countdown === 'Event has started' ? 'text-green-600' : 'text-orange-600'}`}>
                            {countdown === 'Event has started' ? 'Live Now!' : `Starts in: ${countdown}`}
                          </span>
                        </div>
                      </div>

                      {/* Description */}
                      <div className="px-6 pb-4">
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {event.description}
                        </p>
                      </div>

                      {/* Registration Info */}
                      <div className="px-6 pb-6">
                        <div className="flex items-center text-sm text-gray-500 mb-2">
                          <Users className="w-4 h-4 mr-1" />
                          <span>{event.registered} / {event.capacity} registered</span>
                        </div>
                        <div className="text-xs text-gray-400">
                          Registered on: {registration.registeredAt?.toDate?.()?.toLocaleDateString() || 'N/A'}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        
        <Footer />
      </div>
    </ToastProvider>
  );
};

export default MyRegistrations;
