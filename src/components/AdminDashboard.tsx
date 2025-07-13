
import React, { useState } from 'react';
import { Plus, Users, Calendar, TrendingUp, FileText } from 'lucide-react';

interface DashboardStats {
  totalEvents: number;
  totalClubs: number;
  eventRegistrations: number;
  clubMembers: number;
}

interface AdminDashboardProps {
  onCreateEvent: () => void;
  onCreateClub: () => void;
  onViewRegistrations: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onCreateEvent,
  onCreateClub,
  onViewRegistrations
}) => {
  // Mock data - in real app, this would come from Firebase
  const [stats] = useState<DashboardStats>({
    totalEvents: 24,
    totalClubs: 12,
    eventRegistrations: 347,
    clubMembers: 156
  });

  const statsData = [
    {
      label: 'Total Events',
      value: stats.totalEvents,
      change: '+3 from last week',
      icon: Calendar
    },
    {
      label: 'Total Clubs',
      value: stats.totalClubs,
      change: '+1 from last week',
      icon: Users
    },
    {
      label: 'Event Registrations',
      value: stats.eventRegistrations,
      change: '+47 from last week',
      icon: TrendingUp
    },
    {
      label: 'Club Members',
      value: stats.clubMembers,
      change: '+23 from last week',
      icon: FileText
    }
  ];

  const actionButtons = [
    {
      label: 'Create Event',
      icon: Plus,
      onClick: onCreateEvent
    },
    {
      label: 'Create Club Opening',
      icon: Plus,
      onClick: onCreateClub
    },
    {
      label: 'View Registrations',
      icon: FileText,
      onClick: onViewRegistrations
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-8 py-32">
        {/* Dashboard Header */}
        <div className="mb-16">
          <h1 className="text-5xl font-semibold text-foreground">
            Admin Dashboard
          </h1>
          <p className="text-xl text-muted-foreground mt-4">
            Manage events and clubs for your campus
          </p>
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {statsData.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-8 hover:border-black transition-colors duration-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <Icon className="w-6 h-6 text-gray-600" />
                  </div>
                </div>
                <div className="text-3xl font-semibold text-foreground mb-2">
                  {stat.value}
                </div>
                <div className="text-base text-muted-foreground mb-2">
                  {stat.label}
                </div>
                <div className="text-sm font-medium text-green-600">
                  {stat.change}
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {actionButtons.map((button, index) => {
            const Icon = button.icon;
            return (
              <button
                key={index}
                onClick={button.onClick}
                className="h-12 w-full bg-black text-white rounded-lg font-medium hover:opacity-95 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Icon className="w-5 h-5" />
                {button.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
