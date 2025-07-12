import { createContext, useContext, useState, ReactNode } from "react";
import { authApi } from "../lib/api";

interface User {
  id: string;
  fullName: string;
  email: string;
  location?: string;
  skillsOffered: string[];
  skillsWanted: string[];
  availability: string[];
  profilePicture?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  isDemoMode: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check if user was previously logged in (stored in localStorage)
    return localStorage.getItem("authToken") !== null;
  });

  const [user, setUser] = useState<User | null>(() => {
    // Load user data from localStorage if available
    const savedUser = localStorage.getItem("userData");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [isDemoMode, setIsDemoMode] = useState(() => {
    // Check if we're in demo mode
    return localStorage.getItem("authToken") === "demo-token";
  });

  const login = async (email: string, password: string) => {
    try {
      const response = await authApi.login(email, password);

      // Store auth token
      localStorage.setItem("authToken", response.token);

      // Store user data
      localStorage.setItem("userData", JSON.stringify(response.user));

      setIsAuthenticated(true);
      setUser(response.user);
    } catch (error: any) {
      console.error("Login failed:", error);

      // Fallback demo login if backend is not available
      if (error.message?.includes("Cannot connect to backend")) {
        console.warn("Backend not available, using demo login mode");

        // Create demo user data
        const demoUser = {
          id: "demo-user",
          fullName: "Demo User",
          email: email,
          location: "San Francisco, CA",
          skillsOffered: ["React", "JavaScript", "Node.js"],
          skillsWanted: ["Python", "UI/UX Design"],
          availability: ["Weekends", "Evenings"],
        };

        // Store demo token and user data
        localStorage.setItem("authToken", "demo-token");
        localStorage.setItem("userData", JSON.stringify(demoUser));

        setIsAuthenticated(true);
        setUser(demoUser);
        setIsDemoMode(true);

        return;
      }

      throw error;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem("userData", JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
