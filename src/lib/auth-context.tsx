import { createContext, useContext, useState, type ReactNode } from "react";

export type UserRole = "gerente" | "cocina" | "compras" | "sostenibilidad";

export interface User {
  email: string;
  name: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
}

const MOCK_USERS: Record<string, { password: string; name: string; role: UserRole }> = {
  "gerente@fullcycle.com": { password: "Gerente123!", name: "Miguel Ángel Feo", role: "gerente" },
  "cocina@fullcycle.com": { password: "Cocina123!", name: "Andres Sanchez", role: "cocina" },
  "compras@fullcycle.com": { password: "Compras123!", name: "Camilo Arciniegas", role: "compras" },
  "sostenibilidad@fullcycle.com": { password: "Sosten123!", name: "Juan Diego Martinez", role: "sostenibilidad" },
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string) => {
    const normalized = email.toLowerCase().trim();
    const mockUser = MOCK_USERS[normalized];
    if (!mockUser) return { success: false, error: "Usuario no encontrado" };
    if (mockUser.password !== password) return { success: false, error: "Contraseña incorrecta" };
    setUser({ email: normalized, name: mockUser.name, role: mockUser.role });
    return { success: true };
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}
