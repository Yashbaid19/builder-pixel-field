import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { useAuth } from "../contexts/AuthContext";
import {
  User,
  Mail,
  MapPin,
  Star,
  Edit3,
  Check,
  X,
  Clock,
  Target,
  Users,
  TrendingUp,
  Award,
  MessageCircle,
  Trash2,
  Calendar,
  Badge,
} from "lucide-react";

// Mock data types
interface SwapRequest {
  id: string;
  fromUser: {
    name: string;
    email: string;
    skillsOffered: string[];
  };
  skillWanted: string;
  message?: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
}

interface OutgoingRequest {
  id: string;
  toUser: {
    name: string;
    email: string;
  };
  skillOffered: string;
  skillWanted: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
}

interface Feedback {
  id: string;
  type: "given" | "received";
  user: string;
  skill: string;
  rating: number;
  message: string;
  date: string;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [processingRequest, setProcessingRequest] = useState<string | null>(
    null,
  );

  // Mock incoming requests - initialize all hooks first
  const [incomingRequests, setIncomingRequests] = useState<SwapRequest[]>([
    {
      id: "1",
      fromUser: {
        name: "Alice Johnson",
        email: "alice@example.com",
        skillsOffered: ["Python", "Data Science"],
      },
      skillWanted: "React",
      message:
        "Hi! I'd love to learn React from you. I can teach you Python and data analysis in return.",
      status: "pending",
      createdAt: "2024-01-15",
    },
    {
      id: "2",
      fromUser: {
        name: "Bob Smith",
        email: "bob@example.com",
        skillsOffered: ["UI/UX Design", "Figma"],
      },
      skillWanted: "JavaScript",
      message:
        "Looking to improve my JavaScript skills. Can help with design work!",
      status: "pending",
      createdAt: "2024-01-14",
    },
  ]);

  // Mock user data
  const userData = {
    fullName: "John Doe",
    email: "john.doe@example.com",
    location: "San Francisco, CA",
    skillsOffered: ["React", "JavaScript", "Node.js"],
    skillsWanted: ["Python", "UI/UX Design"],
    availability: ["Weekends", "Evenings"],
    profilePicture: null,
  };

  // Mock outgoing requests
  const outgoingRequests: OutgoingRequest[] = [
    {
      id: "1",
      toUser: {
        name: "Sarah Wilson",
        email: "sarah@example.com",
      },
      skillOffered: "React",
      skillWanted: "Machine Learning",
      status: "pending",
      createdAt: "2024-01-10",
    },
    {
      id: "2",
      toUser: {
        name: "Mike Chen",
        email: "mike@example.com",
      },
      skillOffered: "JavaScript",
      skillWanted: "Photography",
      status: "accepted",
      createdAt: "2024-01-08",
    },
  ];

  // Mock feedback data
  const feedbackData: Feedback[] = [
    {
      id: "1",
      type: "received",
      user: "Emma Davis",
      skill: "React",
      rating: 5,
      message: "Excellent teacher! Very patient and clear explanations.",
      date: "2024-01-12",
    },
    {
      id: "2",
      type: "given",
      user: "Tom Anderson",
      skill: "Python",
      rating: 4,
      message: "Great session, learned a lot about data structures!",
      date: "2024-01-10",
    },
  ];

  // Stats calculation
  const stats = {
    swapsCompleted:
      outgoingRequests.filter((r) => r.status === "accepted").length +
      incomingRequests.filter((r) => r.status === "accepted").length,
    averageRating:
      feedbackData
        .filter((f) => f.type === "received")
        .reduce((acc, f) => acc + f.rating, 0) /
        feedbackData.filter((f) => f.type === "received").length || 0,
    skillsShared: userData.skillsOffered.length,
    skillsGained: userData.skillsWanted.length,
  };

  const handleAcceptRequest = async (requestId: string) => {
    setProcessingRequest(requestId);
    // Simulate API call
    setTimeout(() => {
      setIncomingRequests((prev) =>
        prev.map((req) =>
          req.id === requestId ? { ...req, status: "accepted" as const } : req,
        ),
      );
      setProcessingRequest(null);
    }, 1000);
  };

  const handleRejectRequest = async (requestId: string) => {
    setProcessingRequest(requestId);
    // Simulate API call
    setTimeout(() => {
      setIncomingRequests((prev) =>
        prev.map((req) =>
          req.id === requestId ? { ...req, status: "rejected" as const } : req,
        ),
      );
      setProcessingRequest(null);
    }, 1000);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p className="text-xl text-gray-600">
              Manage your skill swaps and track your progress
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Profile & Stats */}
            <div className="lg:col-span-1 space-y-6">
              {/* User Profile Section */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <div className="flex items-start justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Your Profile
                  </h2>
                  <button
                    onClick={() => navigate("/settings")}
                    className="flex items-center gap-1 px-3 py-1 text-sm text-skillswap-black border border-skillswap-black rounded-lg hover:bg-skillswap-black hover:text-white transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                    Edit
                  </button>
                </div>

                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    {userData.profilePicture ? (
                      <img
                        src={userData.profilePicture}
                        alt="Profile"
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <User className="w-8 h-8 text-gray-400" />
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {userData.fullName}
                  </h3>
                  <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">{userData.email}</span>
                  </div>
                  {userData.location && (
                    <div className="flex items-center justify-center gap-1 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{userData.location}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-gray-700">
                        Skills Offered
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {userData.skillsOffered.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-gray-700">
                        Skills Wanted
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {userData.skillsWanted.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-medium text-gray-700">
                        Availability
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {userData.availability.map((time) => (
                        <span
                          key={time}
                          className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full"
                        >
                          {time}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats Section */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Quick Stats
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {stats.swapsCompleted}
                    </div>
                    <div className="text-xs text-green-600">
                      Swaps Completed
                    </div>
                  </div>
                  <div className="text-center p-3 bg-yellow-50 rounded-lg">
                    <div className="flex items-center justify-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-2xl font-bold text-yellow-600">
                        {stats.averageRating
                          ? stats.averageRating.toFixed(1)
                          : "N/A"}
                      </span>
                    </div>
                    <div className="text-xs text-yellow-600">Avg Rating</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {stats.skillsShared}
                    </div>
                    <div className="text-xs text-blue-600">Skills Shared</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      {stats.skillsGained}
                    </div>
                    <div className="text-xs text-purple-600">
                      Skills Learning
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Requests & Feedback */}
            <div className="lg:col-span-2 space-y-6">
              {/* Incoming Swap Requests */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Incoming Requests
                  </h2>
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm">
                    {
                      incomingRequests.filter((r) => r.status === "pending")
                        .length
                    }{" "}
                    pending
                  </span>
                </div>

                <div className="space-y-4">
                  {incomingRequests.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      No incoming requests yet
                    </div>
                  ) : (
                    incomingRequests.map((request) => (
                      <div
                        key={request.id}
                        className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-medium text-gray-900">
                              {request.fromUser.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                              Wants to learn:{" "}
                              <span className="font-medium">
                                {request.skillWanted}
                              </span>
                            </p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {request.fromUser.skillsOffered.map((skill) => (
                                <span
                                  key={skill}
                                  className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {request.status === "pending" && (
                              <>
                                <button
                                  onClick={() =>
                                    handleAcceptRequest(request.id)
                                  }
                                  disabled={processingRequest === request.id}
                                  className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 text-sm"
                                >
                                  <Check className="w-4 h-4" />
                                  Accept
                                </button>
                                <button
                                  onClick={() =>
                                    handleRejectRequest(request.id)
                                  }
                                  disabled={processingRequest === request.id}
                                  className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 text-sm"
                                >
                                  <X className="w-4 h-4" />
                                  Reject
                                </button>
                              </>
                            )}
                            {request.status !== "pending" && (
                              <span
                                className={`px-2 py-1 rounded text-sm ${
                                  request.status === "accepted"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {request.status}
                              </span>
                            )}
                          </div>
                        </div>
                        {request.message && (
                          <div className="bg-gray-50 rounded p-3 mt-3">
                            <p className="text-sm text-gray-700">
                              "{request.message}"
                            </p>
                          </div>
                        )}
                        <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />
                          {request.createdAt}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Outgoing Swap Requests */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Your Sent Requests
                </h2>

                <div className="space-y-4">
                  {outgoingRequests.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      No outgoing requests yet
                    </div>
                  ) : (
                    outgoingRequests.map((request) => (
                      <div
                        key={request.id}
                        className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium text-gray-900">
                              To: {request.toUser.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                              Offering:{" "}
                              <span className="font-medium text-green-600">
                                {request.skillOffered}
                              </span>{" "}
                              → Learning:{" "}
                              <span className="font-medium text-blue-600">
                                {request.skillWanted}
                              </span>
                            </p>
                            <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                              <Clock className="w-3 h-3" />
                              {request.createdAt}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span
                              className={`px-2 py-1 rounded text-sm ${
                                request.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : request.status === "accepted"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                              }`}
                            >
                              {request.status}
                            </span>
                            {request.status === "pending" && (
                              <button className="flex items-center gap-1 px-2 py-1 text-red-600 border border-red-300 rounded hover:bg-red-50 text-sm">
                                <Trash2 className="w-3 h-3" />
                                Cancel
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Feedback Section */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Feedback
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Received Feedback */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
                      <Award className="w-4 h-4 text-green-600" />
                      Feedback Received
                    </h3>
                    <div className="space-y-3">
                      {feedbackData
                        .filter((f) => f.type === "received")
                        .map((feedback) => (
                          <div
                            key={feedback.id}
                            className="border border-gray-200 rounded-lg p-3"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium text-sm">
                                {feedback.user}
                              </span>
                              <div className="flex">
                                {renderStars(feedback.rating)}
                              </div>
                            </div>
                            <p className="text-xs text-gray-600 mb-1">
                              Skill: {feedback.skill}
                            </p>
                            <p className="text-sm text-gray-700">
                              "{feedback.message}"
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {feedback.date}
                            </p>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Given Feedback */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
                      <MessageCircle className="w-4 h-4 text-blue-600" />
                      Feedback Given
                    </h3>
                    <div className="space-y-3">
                      {feedbackData
                        .filter((f) => f.type === "given")
                        .map((feedback) => (
                          <div
                            key={feedback.id}
                            className="border border-gray-200 rounded-lg p-3"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium text-sm">
                                {feedback.user}
                              </span>
                              <div className="flex">
                                {renderStars(feedback.rating)}
                              </div>
                            </div>
                            <p className="text-xs text-gray-600 mb-1">
                              Skill: {feedback.skill}
                            </p>
                            <p className="text-sm text-gray-700">
                              "{feedback.message}"
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {feedback.date}
                            </p>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
