const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem("authToken");
};

// Helper function to handle API responses
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ message: "An error occurred" }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

// Helper function to make authenticated requests
const authenticatedFetch = (url: string, options: RequestInit = {}) => {
  const token = getAuthToken();
  return fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });
};

// Auth APIs
export const authApi = {
  signup: async (data: {
    fullName: string;
    email: string;
    password: string;
    location?: string;
    skillsOffered: string[];
    skillsWanted: string[];
    availability: string[];
  }) => {
    const response = await fetch(`${baseURL}/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  login: async (email: string, password: string) => {
    const response = await fetch(`${baseURL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    return handleResponse(response);
  },

  forgotPassword: async (email: string) => {
    const response = await fetch(`${baseURL}/api/auth/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    return handleResponse(response);
  },

  resetPassword: async (token: string, password: string) => {
    const response = await fetch(
      `${baseURL}/api/auth/reset-password/${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      },
    );
    return handleResponse(response);
  },

  changePassword: async (currentPassword: string, newPassword: string) => {
    const response = await authenticatedFetch(
      `${baseURL}/api/auth/change-password`,
      {
        method: "POST",
        body: JSON.stringify({ currentPassword, newPassword }),
      },
    );
    return handleResponse(response);
  },
};

// User APIs
export const userApi = {
  getDashboard: async () => {
    const response = await authenticatedFetch(`${baseURL}/api/user/dashboard`);
    return handleResponse(response);
  },

  updateProfile: async (data: {
    fullName?: string;
    email?: string;
    location?: string;
    skillsOffered?: string[];
    skillsWanted?: string[];
    availability?: string[];
  }) => {
    const response = await authenticatedFetch(`${baseURL}/api/user/profile`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  uploadProfilePicture: async (file: File) => {
    const formData = new FormData();
    formData.append("profilePicture", file);

    const token = getAuthToken();
    const response = await fetch(`${baseURL}/api/user/profile-picture`, {
      method: "POST",
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: formData,
    });
    return handleResponse(response);
  },

  searchUsers: async (skill?: string) => {
    const params = new URLSearchParams();
    if (skill) params.append("skill", skill);

    const response = await authenticatedFetch(
      `${baseURL}/api/users${params.toString() ? `?${params.toString()}` : ""}`,
    );
    return handleResponse(response);
  },
};

// Swap APIs
export const swapApi = {
  sendRequest: async (data: {
    toUserId: string;
    offeredSkill: string;
    wantedSkill: string;
    availability: string[];
    message?: string;
  }) => {
    const response = await authenticatedFetch(`${baseURL}/api/swap/request`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  getRequests: async () => {
    const response = await authenticatedFetch(`${baseURL}/api/swap/requests`);
    return handleResponse(response);
  },

  updateRequestStatus: async (
    requestId: string,
    status: "accepted" | "rejected",
  ) => {
    const response = await authenticatedFetch(
      `${baseURL}/api/swap/requests/${requestId}`,
      {
        method: "PATCH",
        body: JSON.stringify({ status }),
      },
    );
    return handleResponse(response);
  },

  deleteRequest: async (requestId: string) => {
    const response = await authenticatedFetch(
      `${baseURL}/api/swap/requests/${requestId}`,
      {
        method: "DELETE",
      },
    );
    return handleResponse(response);
  },
};

// Feedback APIs
export const feedbackApi = {
  submitFeedback: async (data: {
    toUserId: string;
    swapRequestId: string;
    rating: number;
    message: string;
    skill: string;
  }) => {
    const response = await authenticatedFetch(`${baseURL}/api/feedback`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  getFeedback: async () => {
    const response = await authenticatedFetch(`${baseURL}/api/feedback`);
    return handleResponse(response);
  },
};

// Export base URL for any custom fetch calls
export { baseURL };
