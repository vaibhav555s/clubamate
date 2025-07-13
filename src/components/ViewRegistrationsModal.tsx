
import React, { useState } from 'react';
import { X, FileText } from 'lucide-react';

interface ViewRegistrationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Registration {
  id: string;
  studentName: string;
  email: string;
  phone: string;
  branch: string;
  year: string;
  registrationDate: string;
}

const ViewRegistrationsModal: React.FC<ViewRegistrationsModalProps> = ({
  isOpen,
  onClose
}) => {
  const [selectedEvent, setSelectedEvent] = useState('react-workshop');
  
  // Mock data - in real app, this would come from Firebase
  const events = [
    { id: 'react-workshop', name: 'React Workshop' },
    { id: 'ai-seminar', name: 'AI & ML Seminar' },
    { id: 'coding-contest', name: 'Coding Contest' }
  ];

  const registrations: Registration[] = [
    {
      id: '1',
      studentName: 'John Doe',
      email: 'john.doe@university.edu',
      phone: '+1-234-567-8900',
      branch: 'Computer Science',
      year: '3rd Year',
      registrationDate: '2024-12-10'
    },
    {
      id: '2',
      studentName: 'Jane Smith',
      email: 'jane.smith@university.edu',
      phone: '+1-234-567-8901',
      branch: 'Information Technology',
      year: '2nd Year',
      registrationDate: '2024-12-11'
    },
    {
      id: '3',
      studentName: 'Mike Johnson',
      email: 'mike.johnson@university.edu',
      phone: '+1-234-567-8902',
      branch: 'Electronics',
      year: '4th Year',
      registrationDate: '2024-12-12'
    }
  ];

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={handleOverlayClick}
    >
      <div className="relative w-full max-w-5xl bg-white rounded-2xl p-12 shadow-xl max-h-[80vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-semibold text-foreground mb-2">
            Event Registrations
          </h2>
          <p className="text-base text-muted-foreground">
            View and manage student registrations
          </p>
        </div>

        {/* Event Filter */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-500 mb-2">
            Select Event
          </label>
          <select
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value)}
            className="w-full max-w-md h-12 bg-gray-50 border border-gray-200 rounded-lg px-4 focus:border-black focus:bg-white focus:outline-none transition-all duration-200"
          >
            {events.map(event => (
              <option key={event.id} value={event.id}>
                {event.name}
              </option>
            ))}
          </select>
        </div>

        {/* Registrations Table */}
        {registrations.length > 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                      Student Name
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                      Email
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                      Phone
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                      Branch
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                      Year
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                      Registration Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {registrations.map((registration, index) => (
                    <tr 
                      key={registration.id}
                      className={`${index % 2 === 1 ? 'bg-gray-50' : ''} border-b border-gray-200 last:border-b-0`}
                    >
                      <td className="py-3 px-4 text-sm text-foreground font-medium">
                        {registration.studentName}
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {registration.email}
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {registration.phone}
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {registration.branch}
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {registration.year}
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {new Date(registration.registrationDate).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="py-12 text-center">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No registrations yet
            </h3>
            <p className="text-muted-foreground">
              Registrations will appear here once students sign up
            </p>
          </div>
        )}

        {/* Summary */}
        {registrations.length > 0 && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-muted-foreground">
              Total registrations: <span className="font-medium text-foreground">{registrations.length}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewRegistrationsModal;
