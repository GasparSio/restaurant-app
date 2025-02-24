import { createContext } from "react";

interface AuthContextType {
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<{ success: boolean; message: string }>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
