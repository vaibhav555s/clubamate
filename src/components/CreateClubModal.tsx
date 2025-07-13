import React, { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { useToast } from "./ToastContainer";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebaseConfig";

interface CreateClubModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClubCreated: () => void;
}

interface ClubFormData {
  name: string;
  description: string;
  logo: string;
  category: string;
  memberCount: number;
  establishedYear: number;
  contactEmail: string;
}

const CreateClubModal: React.FC<CreateClubModalProps> = ({
  isOpen,
  onClose,
  onClubCreated,
}) => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState<ClubFormData>({
    name: "",
    description: "",
    logo: "🎯",
    category: "tech",
    memberCount: 0,
    establishedYear: new Date().getFullYear(),
    contactEmail: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const clubData = {
        name: formData.name,
        description: formData.description,
        category: formData.category,
        logo: formData.logo,
        memberCount: formData.memberCount,
        establishedYear: formData.establishedYear,
        contactEmail: formData.contactEmail,
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "clubs"), clubData);

      showToast("🎉 Club created successfully!", "success");
      onClubCreated();
      onClose();

      setFormData({
        name: "",
        description: "",
        logo: "🎯",
        category: "tech",
        memberCount: 0,
        establishedYear: new Date().getFullYear(),
        contactEmail: "",
      });
    } catch (error) {
      console.error("Error creating club:", error);
      showToast("❌ Failed to create club", "error");
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
            Create Club Opening
          </h2>
          <p className="text-base text-muted-foreground">
            Add a new club for students to join
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Club Name */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-500 mb-2">
                Club Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                className="w-full h-12 bg-gray-50 border border-gray-200 rounded-lg px-4 focus:border-black focus:bg-white focus:outline-none transition-all duration-200"
                required
                placeholder="Enter club name"
              />
            </div>

            {/* Logo */}
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">
                Logo (Emoji or URL)
              </label>
              <input
                type="text"
                value={formData.logo}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, logo: e.target.value }))
                }
                className="w-full h-12 bg-gray-50 border border-gray-200 rounded-lg px-4 focus:border-black focus:bg-white focus:outline-none transition-all duration-200"
                required
                placeholder="🎯 or image URL"
              />
            </div>

            {/* Category */}
            <div>
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
                <option value="social">Social</option>
              </select>
            </div>

            {/* Member Count */}
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">
                Current Members
              </label>
              <input
                type="number"
                value={formData.memberCount}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    memberCount: parseInt(e.target.value),
                  }))
                }
                className="w-full h-12 bg-gray-50 border border-gray-200 rounded-lg px-4 focus:border-black focus:bg-white focus:outline-none transition-all duration-200"
                required
                min="0"
              />
            </div>

            {/* Established Year */}
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">
                Established Year
              </label>
              <input
                type="number"
                value={formData.establishedYear}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    establishedYear: parseInt(e.target.value),
                  }))
                }
                className="w-full h-12 bg-gray-50 border border-gray-200 rounded-lg px-4 focus:border-black focus:bg-white focus:outline-none transition-all duration-200"
                required
                min="1900"
                max={new Date().getFullYear()}
              />
            </div>

            {/* Contact Email */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-500 mb-2">
                Contact Email
              </label>
              <input
                type="email"
                value={formData.contactEmail}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    contactEmail: e.target.value,
                  }))
                }
                className="w-full h-12 bg-gray-50 border border-gray-200 rounded-lg px-4 focus:border-black focus:bg-white focus:outline-none transition-all duration-200"
                required
                placeholder="club@university.edu"
              />
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
                placeholder="Enter club description"
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
                "Create Club"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateClubModal;
