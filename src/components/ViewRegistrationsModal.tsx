import React, { useState, useEffect } from "react";
import { X, FileText } from "lucide-react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";

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
  eventName: string;
}

const ViewRegistrationsModal: React.FC<ViewRegistrationsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedEvent, setSelectedEvent] = useState("react-workshop");

  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRegistrations = async () => {
      setLoading(true);
      try {
        const snapshot = await getDocs(collection(db, "registrations"));
        const fetched = snapshot.docs.map((doc) => {
          const data = doc.data();
          console.log("Fetched registration data:", data);
          return {
            id: doc.id,
            studentName: data.userName || "",
            email: data.userEmail || "",
            phone: data.userPhone || "",
            branch: data.userBranch || "",
            year: data.userYear ? `${data.userYear}` : "",
            registrationDate: new Date(data.registeredAt).toLocaleDateString(),
            eventName: data.eventName || "",
          };
        });
        console.log("Fetched Registrations →", fetched);
        setRegistrations(fetched);
      } catch (error) {
        console.error("Error fetching registrations:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) fetchRegistrations();
  }, [selectedEvent, isOpen]);

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
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                      Event Name
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {registrations.map((registration, index) => (
                    <tr
                      key={registration.id}
                      className={`${
                        index % 2 === 1 ? "bg-gray-50" : ""
                      } border-b border-gray-200 last:border-b-0`}
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
                        {new Date(
                          registration.registrationDate
                        ).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {registration.eventName}
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
              Total registrations:{" "}
              <span className="font-medium text-foreground">
                {registrations.length}
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewRegistrationsModal;
