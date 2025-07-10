
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
  const getCategoryColor = () => {
    switch (club.category) {
      case 'Technology': return 'bg-blue-100 text-blue-800';
      case 'Cloud': return 'bg-cyan-100 text-cyan-800';
      case 'Security': return 'bg-red-100 text-red-800';
      case 'Development': return 'bg-purple-100 text-purple-800';
      case 'Research': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer hover:scale-105">
      {/* Header Section */}
      <div className="p-6 pb-4">
        <div className="text-4xl mb-4 text-center">
          {club.logo}
        </div>
        
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mb-3 ${getCategoryColor()}`}>
          {club.category}
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors leading-tight">
          {club.name}
        </h3>
        
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          {club.description}
        </p>
      </div>

      {/* Stats Section */}
      <div className="px-6 pb-4">
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            <span>{club.members} members</span>
          </div>
          <span className="text-xs text-gray-400">Est. {club.established}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <Mail className="w-4 h-4 mr-2 text-gray-400" />
          <span className="text-xs">{club.contact}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 pb-6">
        <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105">
          Join Club
        </button>
      </div>
    </div>
  );
};

export default ClubCard;
