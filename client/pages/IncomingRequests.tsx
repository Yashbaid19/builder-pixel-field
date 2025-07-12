import { useState } from "react";
import { Header } from "../components/Header";
import {
  Clock,
  User,
  CheckCircle,
  XCircle,
  MessageCircle,
  Star,
} from "lucide-react";

interface SwapRequest {
  id: string;
  requesterName: string;
  requesterAvatar: string;
  requesterRating: number;
  skillOffered: string;
  skillWanted: string;
  message: string;
  timeAgo: string;
  status: "pending" | "accepted" | "declined" | "completed";
  requestDate: string;
  tags: string[];
}

const mockRequests: SwapRequest[] = [
  {
    id: "1",
    requesterName: "Alex Martinez",
    requesterAvatar: "AM",
    requesterRating: 4.8,
    skillOffered: "Spanish Language",
    skillWanted: "Web Development",
    message:
      "Hi! I'd love to learn web development from you. I'm a native Spanish speaker and have taught Spanish for 3 years. I can help you become conversational in Spanish!",
    timeAgo: "2 hours ago",
    status: "pending",
    requestDate: "2024-01-15",
    tags: ["Spanish", "Language", "Teaching"],
  },
  {
    id: "2",
    requesterName: "Emily Chen",
    requesterAvatar: "EC",
    requesterRating: 4.9,
    skillOffered: "Photography",
    skillWanted: "React Development",
    message:
      "I'm a professional photographer looking to transition into tech. I can teach you portrait photography, lighting, and photo editing in exchange for React lessons.",
    timeAgo: "1 day ago",
    status: "pending",
    requestDate: "2024-01-14",
    tags: ["Photography", "Portrait", "Editing"],
  },
  {
    id: "3",
    requesterName: "Michael Johnson",
    requesterAvatar: "MJ",
    requesterRating: 4.6,
    skillOffered: "Guitar Lessons",
    skillWanted: "JavaScript",
    message:
      "Hey! I've been playing guitar for 10 years and would love to teach you. I'm looking to learn JavaScript fundamentals. Would you be interested in a skill swap?",
    timeAgo: "3 days ago",
    status: "accepted",
    requestDate: "2024-01-12",
    tags: ["Guitar", "Music", "Acoustic"],
  },
  {
    id: "4",
    requesterName: "Sarah Kim",
    requesterAvatar: "SK",
    requesterRating: 4.7,
    skillOffered: "Yoga Instruction",
    skillWanted: "Database Design",
    message:
      "I'm a certified yoga instructor looking to learn database design for a personal project. I can teach you various yoga styles and help you build flexibility and mindfulness.",
    timeAgo: "5 days ago",
    status: "declined",
    requestDate: "2024-01-10",
    tags: ["Yoga", "Mindfulness", "Fitness"],
  },
  {
    id: "5",
    requesterName: "David Park",
    requesterAvatar: "DP",
    requesterRating: 4.9,
    skillOffered: "Digital Marketing",
    skillWanted: "Python Programming",
    message:
      "I run a successful digital marketing agency and would love to share my knowledge in exchange for Python programming lessons. I can help you grow your online presence!",
    timeAgo: "1 week ago",
    status: "completed",
    requestDate: "2024-01-08",
    tags: ["Marketing", "SEO", "Social Media"],
  },
];

export default function IncomingRequests() {
  const [requests, setRequests] = useState(mockRequests);
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  const handleAccept = (requestId: string) => {
    setRequests(
      requests.map((req) =>
        req.id === requestId ? { ...req, status: "accepted" as const } : req,
      ),
    );
  };

  const handleDecline = (requestId: string) => {
    setRequests(
      requests.map((req) =>
        req.id === requestId ? { ...req, status: "declined" as const } : req,
      ),
    );
  };

  const filteredRequests =
    selectedStatus === "all"
      ? requests
      : requests.filter((req) => req.status === selectedStatus);

  const getStatusBadge = (status: string) => {
    const badgeStyles = {
      pending: "bg-yellow-100 text-yellow-800",
      accepted: "bg-green-100 text-green-800",
      declined: "bg-red-100 text-red-800",
      completed: "bg-blue-100 text-blue-800",
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${badgeStyles[status as keyof typeof badgeStyles]}`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const pendingCount = requests.filter(
    (req) => req.status === "pending",
  ).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            My Swap Requests
          </h1>
          <p className="text-xl text-gray-600">
            Manage incoming skill swap requests from other users
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-yellow-500" />
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {pendingCount}
                </h3>
                <p className="text-gray-600">Pending</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-green-500" />
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {requests.filter((req) => req.status === "accepted").length}
                </h3>
                <p className="text-gray-600">Accepted</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <XCircle className="w-8 h-8 text-red-500" />
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {requests.filter((req) => req.status === "declined").length}
                </h3>
                <p className="text-gray-600">Declined</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <Star className="w-8 h-8 text-blue-500" />
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {requests.filter((req) => req.status === "completed").length}
                </h3>
                <p className="text-gray-600">Completed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex flex-wrap gap-4">
            <label className="block text-sm font-medium text-gray-700">
              Filter by status:
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-skillswap-black"
            >
              <option value="all">All Requests</option>
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="declined">Declined</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Requests List */}
        <div className="space-y-6">
          {filteredRequests.length > 0 ? (
            filteredRequests.map((request) => (
              <div
                key={request.id}
                className="bg-white rounded-lg shadow-sm border overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-skillswap-yellow rounded-full flex items-center justify-center text-xl font-bold text-skillswap-black">
                        {request.requesterAvatar}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">
                          {request.requesterName}
                        </h3>
                        <div className="flex items-center gap-2 mb-2">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600">
                            {request.requesterRating}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">
                          {request.timeAgo}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      {getStatusBadge(request.status)}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-green-50 rounded-lg p-4">
                      <h4 className="font-semibold text-green-800 mb-2">
                        They want to teach you:
                      </h4>
                      <p className="text-green-700">{request.skillOffered}</p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-2">
                        They want to learn:
                      </h4>
                      <p className="text-blue-700">{request.skillWanted}</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Message:
                    </h4>
                    <p className="text-gray-700">{request.message}</p>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {request.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {request.status === "pending" && (
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => handleDecline(request.id)}
                        className="flex-1 flex items-center justify-center gap-2 py-3 px-4 border border-red-300 text-red-700 rounded-md hover:bg-red-50 transition-colors"
                      >
                        <XCircle className="w-5 h-5" />
                        Decline
                      </button>
                      <button
                        onClick={() => handleAccept(request.id)}
                        className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                      >
                        <CheckCircle className="w-5 h-5" />
                        Accept
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-skillswap-yellow text-skillswap-black rounded-md hover:bg-yellow-400 transition-colors">
                        <MessageCircle className="w-5 h-5" />
                        Message
                      </button>
                    </div>
                  )}

                  {request.status === "accepted" && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <p className="text-green-800 font-medium">
                        ✅ Request accepted! You can now start coordinating your
                        skill swap.
                      </p>
                      <button className="mt-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors text-sm">
                        Start Conversation
                      </button>
                    </div>
                  )}

                  {request.status === "declined" && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <p className="text-red-800">❌ Request declined</p>
                    </div>
                  )}

                  {request.status === "completed" && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-blue-800 font-medium">
                        🎉 Skill swap completed! Don't forget to rate your
                        experience.
                      </p>
                      <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm">
                        Leave Review
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No requests found
              </h3>
              <p className="text-gray-600">
                {selectedStatus === "all"
                  ? "You haven't received any skill swap requests yet."
                  : `No ${selectedStatus} requests found.`}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
