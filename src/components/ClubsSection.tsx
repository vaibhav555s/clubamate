import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig"; // adjust path
import ClubCard from "./ClubCard";

const ClubsSection = () => {
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const snapshot = await getDocs(collection(db, "clubs"));
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setClubs(data);
      } catch (error) {
        console.error("Error fetching clubs:", error);
      }
    };

    fetchClubs();
  }, []);

  return (
    <section id="clubs" className="bg-secondary py-[120px]">
      <div className="max-w-7xl mx-auto px-8">
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-5xl font-semibold text-foreground text-left">
            Club Openings
          </h2>
        </div>

        {/* Clubs Grid */}
        {clubs.length === 0 ? (
          <p className="text-gray-500 text-center">Loading clubs...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {clubs.map((club, index) => (
              <div
                key={club.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ClubCard club={club} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ClubsSection;
