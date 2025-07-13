import React, { useEffect } from "react";
import { Users, Mail } from "lucide-react";
import ClubRegistraion from "./ClubRegistration";
import { useState } from "react";
import { db } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import { query, where } from "firebase/firestore";

interface Club {
  id: string;
  name: string;
  description: string;
  logo: string;
  category: string;
  members: number;
  established: string;
  contact: string;
}

interface ClubCardProps {
  club: Club;
}

const ClubCard: React.FC<ClubCardProps> = ({ club }) => {
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [clubJoined, setClubJoined] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const checkClubJoined = async () => {
      if (!user) return;

      try {
        const q = query(
          collection(db, "club-joins"),
          where("clubId", "==", club.id),
          where("userId", "==", user.uid)
        );

        const snapshot = await getDocs(q);
        setClubJoined(!snapshot.empty); // true if already joined
      } catch (error) {
        console.error("Error checking club registration:", error);
      }
    };

    checkClubJoined();
  }, [user, club.id]);

  return (
    <div className="bg-card border border-border rounded-xl p-8 hover:border-primary transition-colors duration-200 group flex flex-col items-center justify-between">
      {/* Club Logo */}
      <div className="text-4xl text-center mb-6">{club.logo}</div>

      {/* Club Name */}
      <h3 className="text-2xl font-semibold text-foreground text-center mb-2 group-hover:text-primary transition-colors">
        {club.name}
      </h3>

      {/* Member Count */}
      <div className="text-base font-normal text-muted-foreground text-center mb-4">
        {club.members} members
      </div>

      {/* Description */}
      <p className="text-base font-normal text-muted-foreground leading-[1.5] mb-8 line-clamp-3 text-center">
        {club.description}
      </p>

      {/* Join Button */}
      <button
        onClick={() => setShowJoinModal(true)}
        disabled={clubJoined}
        className={`w-full h-11 rounded-lg font-medium text-base transition-opacity duration-200 hover-lift ${
          clubJoined
            ? "bg-muted text-muted-foreground cursor-not-allowed"
            : "bg-primary text-primary-foreground hover:opacity-95"
        }`}
      >
        {clubJoined ? "Applied" : "Join Club"}
      </button>

      <ClubRegistraion
        club={club}
        isOpen={showJoinModal}
        onClose={() => setShowJoinModal(false)}
      />
    </div>
  );
};

export default ClubCard;
