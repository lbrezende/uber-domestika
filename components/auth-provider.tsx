"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

type User = {
  id: string;
  name: string;
  email: string;
  image: string;
};

type AuthContextType = {
  user: User | null;
  login: () => void;
  logout: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  isLoading: true,
});

const MOCK_USER: User = {
  id: "user-1",
  name: "Maria Silva",
  email: "maria@example.com",
  image: "https://randomuser.me/api/portraits/women/44.jpg",
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const stored = document.cookie
      .split("; ")
      .find((c) => c.startsWith("ud-auth="));
    if (stored) {
      setUser(MOCK_USER);
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(() => {
    document.cookie = "ud-auth=1; path=/; max-age=604800";
    setUser(MOCK_USER);
    router.push("/dashboard");
  }, [router]);

  const logout = useCallback(() => {
    document.cookie = "ud-auth=; path=/; max-age=0";
    setUser(null);
    router.push("/");
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
