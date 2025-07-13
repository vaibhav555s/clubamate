import React, { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { db } from "../../firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useToast } from "./ToastContainer";

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEventCreated: () => void;
}

interface EventFormData {
  name: string;
  date: string;
  time: string;
  location: string;
  description: string;
  clubName: string;
  capacity: number;
  category: string;
}

const CreateEventModal: React.FC<CreateEventModalProps> = ({
  isOpen,
  onClose,
  onEventCreated,
}) => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState<EventFormData>({
    name: "",
    date: "",
    time: "",
    location: "",
    description: "",
    clubName: "",
    capacity: 50,
    category: "tech",
  });
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const eventData = {
        title: formData.name,
        date: formData.date,
        time: formData.time,
        location: formData.location,
        description: formData.description,
        club: formData.clubName,
        capacity: formData.capacity,
        category: formData.category,
        registered: 0,
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "events"), eventData);

      showToast("🎉 Event created successfully!", "success");
      onEventCreated();
      onClose();

      // Reset form
      setFormData({
        name: "",
        date: "",
        time: "",
        location: "",
        description: "",
        clubName: "",
        capacity: 50,
        category: "tech",
      });
    } catch (error) {
      console.error("Error creating event:", error);
      showToast("❌ Failed to create event", "error");
    } finally {
      setIsLoading(false);
    }
  };

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
      <div className="relative w-full max-w-2xl bg-white rounded-2xl p-12 shadow-xl max-h-[90vh] overflow-y-auto">
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
            Create New Event
          </h2>
          <p className="text-base text-muted-foreground">
            Add a new event for students to discover
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Event Name */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-500 mb-2">
                Event Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                className="w-full h-12 bg-gray-50 border border-gray-200 rounded-lg px-4 focus:border-black focus:bg-white focus:outline-none transition-all duration-200"
                required
                placeholder="Enter event name"
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">
                Date
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, date: e.target.value }))
                }
                className="w-full h-12 bg-gray-50 border border-gray-200 rounded-lg px-4 focus:border-black focus:bg-white focus:outline-none transition-all duration-200"
                required
              />
            </div>

            {/* Time */}
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">
                Time
              </label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, time: e.target.value }))
                }
                className="w-full h-12 bg-gray-50 border border-gray-200 rounded-lg px-4 focus:border-black focus:bg-white focus:outline-none transition-all duration-200"
                required
              />
            </div>

            {/* Location */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-500 mb-2">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, location: e.target.value }))
                }
                className="w-full h-12 bg-gray-50 border border-gray-200 rounded-lg px-4 focus:border-black focus:bg-white focus:outline-none transition-all duration-200"
                required
                placeholder="Enter event location"
              />
            </div>

            {/* Club Name */}
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">
                Club Name
              </label>
              <input
                type="text"
                value={formData.clubName}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, clubName: e.target.value }))
                }
                className="w-full h-12 bg-gray-50 border border-gray-200 rounded-lg px-4 focus:border-black focus:bg-white focus:outline-none transition-all duration-200"
                required
                placeholder="Enter organizing club"
              />
            </div>

            {/* Capacity */}
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">
                Capacity
              </label>
              <input
                type="number"
                value={formData.capacity}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    capacity: parseInt(e.target.value),
                  }))
                }
                className="w-full h-12 bg-gray-50 border border-gray-200 rounded-lg px-4 focus:border-black focus:bg-white focus:outline-none transition-all duration-200"
                required
                min="1"
              />
            </div>

            {/* Category */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-500 mb-2">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, category: e.target.value }))
                }
                className="w-full h-12 bg-gray-50 border border-gray-200 rounded-lg px-4 focus:border-black focus:bg-white focus:outline-none transition-all duration-200"
                required
              >
                <option value="tech">Technology</option>
                <option value="cultural">Cultural</option>
                <option value="sports">Sports</option>
                <option value="academic">Academic</option>
              </select>
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-500 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                className="w-full h-24 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:border-black focus:bg-white focus:outline-none transition-all duration-200 resize-none"
                required
                placeholder="Enter event description"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-4 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 bg-black text-white rounded-lg font-medium hover:opacity-95 transition-all duration-200 flex items-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Event"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEventModal;
