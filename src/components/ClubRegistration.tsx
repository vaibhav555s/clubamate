import React, { useState } from "react";
import { X, Mail, User, BookOpen } from "lucide-react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "./ToastContainer";

interface Club {
  id: string;
  name: string;
  description: string;
  category: string;
  contact: string;
}

interface ClubRegistrationProps {
  club: Club;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const ClubRegistration: React.FC<ClubRegistrationProps> = ({
  club,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { user, signInWithGoogle } = useAuth();
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    phone: "",
    branch: "",
    year: new Date().getFullYear(),
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      try {
        await signInWithGoogle();
        return;
      } catch (error) {
        showToast("Please sign in to join a club", "error");
        return;
      }
    }

    if (!formData.phone.trim()) {
      showToast("Please enter your phone number", "error");
      return;
    }

    setIsSubmitting(true);

    try {
      const joinData = {
        clubId: club.id,
        clubName: club.name,
        userId: user.uid,
        userName: user.name,
        userEmail: user.email,
        userPhone: formData.phone,
        userBranch: formData.branch,
        userYear: formData.year,
        joinedAt: new Date(),
        status: "pending",
      };

      await addDoc(collection(db, "club-joins"), joinData);

      showToast("Request sent to join the club! 🎉", "success");
      onSuccess?.();
      onClose();

      setFormData({
        phone: "",
        branch: "",
        year: new Date().getFullYear(),
      });
    } catch (error) {
      console.error("Join error:", error);
      showToast("Failed to join. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAuthAndJoin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      showToast("Sign-in failed. Please try again.", "error");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-100 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              Join {club.name}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="text-sm text-gray-600">{club.description}</div>
        </div>

        <div className="p-6">
          {!user ? (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <Mail className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold">Sign in to Join</h3>
              <p className="text-gray-600">
                Use your Google account to proceed.
              </p>
              <button
                onClick={handleAuthAndJoin}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
              >
                Sign in with Google
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium">Full Name</label>
                  <input
                    type="text"
                    value={user.name}
                    disabled
                    className="w-full px-4 py-3 border bg-gray-50 text-gray-600 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Email</label>
                  <input
                    type="email"
                    value={user.email}
                    disabled
                    className="w-full px-4 py-3 border bg-gray-50 text-gray-600 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-4 py-3 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Branch</label>
                  <input
                    type="text"
                    value={formData.branch}
                    onChange={(e) =>
                      setFormData({ ...formData, branch: e.target.value })
                    }
                    className="w-full px-4 py-3 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">
                    Current Year
                  </label>
                  <select
                    value={formData.year}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        year: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-4 py-3 border rounded-lg"
                  >
                    <option value={2024}>1st Year</option>
                    <option value={2025}>2nd Year</option>
                    <option value={2026}>3rd Year</option>
                    <option value={2027}>4th Year</option>
                  </select>
                </div>
              </div>

              <div className="bg-blue-50 p-4 border rounded-lg text-blue-800 text-sm">
                📬 A confirmation will be sent after approval.
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-slate-950 text-white py-3 rounded-xl font-semibold hover:bg-slate-800 transition disabled:opacity-50"
              >
                {isSubmitting ? "Joining..." : "Join Club"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClubRegistration;
