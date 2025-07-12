
import React from 'react';
import { Users, Mail } from 'lucide-react';

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
  return (
    <div className="bg-card border border-border rounded-xl p-8 hover:border-primary transition-colors duration-200 group">
      {/* Club Logo */}
      <div className="text-4xl text-center mb-6">
        {club.logo}
      </div>
      
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
      <button className="w-full bg-primary text-primary-foreground h-11 rounded-lg font-medium text-base hover:opacity-95 transition-opacity hover-lift">
        Join Club
      </button>
    </div>
  );
};

export default ClubCard;
