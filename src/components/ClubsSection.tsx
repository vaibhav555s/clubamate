
import React from 'react';
import ClubCard from './ClubCard';

const ClubsSection = () => {
  const clubs = [
    {
      id: "gdsc-001",
      name: "Google Developer Student Club",
      description: "Learn, build, and connect with Google technologies",
      logo: "🚀",
      category: "Technology",
      members: 150,
      established: "2020",
      contact: "gdsc@college.edu"
    },
    {
      id: "csi-001", 
      name: "Computer Society of India",
      description: "Advancing IT professionals and knowledge sharing",
      logo: "💻",
      category: "Technology",
      members: 120,
      established: "2018",
      contact: "csi@college.edu"
    },
    {
      id: "aws-001",
      name: "AWS Cloud Club",
      description: "Cloud computing and AWS certification training",
      logo: "☁️",
      category: "Cloud",
      members: 85,
      established: "2021",
      contact: "aws@college.edu"
    },
    {
      id: "cyber-001",
      name: "CyberSec Society",
      description: "Cybersecurity awareness and ethical hacking",
      logo: "🔒",
      category: "Security",
      members: 95,
      established: "2019",
      contact: "cyber@college.edu"
    },
    {
      id: "github-001",
      name: "GitHub Campus",
      description: "Open source contribution and version control",
      logo: "🐙",
      category: "Development",
      members: 110,
      established: "2020",
      contact: "github@college.edu"
    },
    {
      id: "ai-001",
      name: "AI/ML Research Club",
      description: "Artificial intelligence and machine learning projects",
      logo: "🤖",
      category: "Research",
      members: 75,
      established: "2022",
      contact: "ai@college.edu"
    }
  ];

  return (
    <section id="clubs" className="bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Campus Clubs
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join vibrant communities of like-minded students and explore your interests
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105">
            View All Clubs
          </button>
        </div>
      </div>
    </section>
  );
};

export default ClubsSection;
