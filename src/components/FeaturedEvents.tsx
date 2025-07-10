import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig"; // Adjust path
import EventCard from "./EventCard";

const FeaturedEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "events"));
        const fetchedEvents = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Fetched Events →", fetchedEvents);

        setEvents(fetchedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
      
    };

    fetchEvents();
  }, []);

  return (
    <section id="events" className="bg-gray-50 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Featured Events
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the most popular and upcoming events happening across
            campus
          </p>
        </div>

        {events.length === 0 ? (
          <p className="text-center text-gray-500">Loading events...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <div
                key={event.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <EventCard event={event} />
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105">
            View All Events
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEvents;
