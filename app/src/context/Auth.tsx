import { jwtDecode, type JwtPayload } from 'jwt-decode';
import { createContext, useContext, useState, type ReactNode, useEffect } from "react";

interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  token: null,
  isAuthenticated: false,
  login: () => { },
  logout: () => { },
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("jwtToken"));

  const login = (newToken: string) => {
    localStorage.setItem("jwtToken", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("jwtToken");
    setToken(null);
  };

  useEffect(() => {
    if (token) {
      try {
        const { exp } = jwtDecode<JwtPayload>(token);
        if (!exp || exp < Date.now() / 1000) logout();
      } catch {
        logout();
      }
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, isAuthenticated: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};