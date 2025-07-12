
import React from 'react';
import ClubCard from './ClubCard';

const ClubsSection = () => {
  const clubs = [
    {
      id: "gdsc-001",
      name: "Google Developer Student Club",
      description: "Learn, build, and connect with Google technologies through hands-on workshops and projects.",
      logo: "🚀",
      category: "Technology",
      members: 150,
      established: "2020",
      contact: "gdsc@college.edu"
    },
    {
      id: "csi-001", 
      name: "Computer Society of India",
      description: "Advancing IT professionals and knowledge sharing through seminars and networking events.",
      logo: "💻",
      category: "Technology",
      members: 120,
      established: "2018",
      contact: "csi@college.edu"
    },
    {
      id: "aws-001",
      name: "AWS Cloud Club",
      description: "Cloud computing and AWS certification training with industry experts and practical labs.",
      logo: "☁️",
      category: "Cloud",
      members: 85,
      established: "2021",
      contact: "aws@college.edu"
    },
    {
      id: "cyber-001",
      name: "CyberSec Society",
      description: "Cybersecurity awareness and ethical hacking workshops for digital security enthusiasts.",
      logo: "🔒",
      category: "Security",
      members: 95,
      established: "2019",
      contact: "cyber@college.edu"
    }
  ];

  return (
    <section id="clubs" className="bg-secondary py-[120px]">
      <div className="max-w-7xl mx-auto px-8">
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-5xl font-semibold text-foreground text-left">
            Join Clubs
          </h2>
        </div>

        {/* Clubs Grid */}
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
      </div>
    </section>
  );
};

export default ClubsSection;
