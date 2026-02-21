import { createContext, useContext, useState, ReactNode, useEffect } from "react";

export type UserRole = "MANAGER" | "DISPATCHER" | "SAFETY_OFFICER" | "FINANCIAL_ANALYST";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<User>;
  logout: () => void;
  isAuthenticated: boolean;
  hasRole: (allowedRoles: UserRole[]) => boolean;
}

// Mock user database
const MOCK_USERS: Record<string, Omit<User, "id">> = {
  "manager@transcope.com": {
    name: "Alex Morgan",
    email: "manager@transcope.com",
    role: "MANAGER",
  },
  "dispatch@transcope.com": {
    name: "Jordan Smith",
    email: "dispatch@transcope.com",
    role: "DISPATCHER",
  },
  "safety@transcope.com": {
    name: "Sam Rivera",
    email: "safety@transcope.com",
    role: "SAFETY_OFFICER",
  },
  "finance@transcope.com": {
    name: "Taylor Chen",
    email: "finance@transcope.com",
    role: "FINANCIAL_ANALYST",
  },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    // Initialize from localStorage
    const savedUser = localStorage.getItem("transcope_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Persist to localStorage whenever user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("transcope_user", JSON.stringify(user));
      localStorage.setItem("transcope_role", user.role);
    } else {
      localStorage.removeItem("transcope_user");
      localStorage.removeItem("transcope_role");
    }
  }, [user]);

  const login = async (email: string, password: string): Promise<User> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const mockUserData = MOCK_USERS[email.toLowerCase()];
    
    if (!mockUserData) {
      throw new Error("Invalid credentials");
    }

    const authenticatedUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      ...mockUserData,
    };

    setUser(authenticatedUser);
    return authenticatedUser;
  };

  const logout = () => {
    setUser(null);
  };

  const hasRole = (allowedRoles: UserRole[]): boolean => {
    if (!user) return false;
    return allowedRoles.includes(user.role);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, hasRole }}>
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

// Helper function to get role display name
export function getRoleDisplayName(role: UserRole): string {
  const roleNames: Record<UserRole, string> = {
    MANAGER: "Fleet Manager",
    DISPATCHER: "Dispatcher",
    SAFETY_OFFICER: "Safety Officer",
    FINANCIAL_ANALYST: "Financial Analyst",
  };
  return roleNames[role];
}

// Helper function to get role color
export function getRoleColor(role: UserRole): string {
  const roleColors: Record<UserRole, string> = {
    MANAGER: "bg-[#3B82F6]/20 text-[#3B82F6]",
    DISPATCHER: "bg-[#10B981]/20 text-[#10B981]",
    SAFETY_OFFICER: "bg-[#F59E0B]/20 text-[#F59E0B]",
    FINANCIAL_ANALYST: "bg-[#06B6D4]/20 text-[#06B6D4]",
  };
  return roleColors[role];
}