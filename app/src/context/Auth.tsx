import { useLazyQuery, useMutation } from '@apollo/client';
import { createContext, useState, type ReactNode, useEffect, useContext } from "react";
import { ME_QUERY } from '../graphql/query/user';
import type { MeQuery, SignOutMutation, UserDto } from '../generated/graphql';
import { SIGN_OUT_MUTATION } from '../graphql/mutation/auth';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserDto | null;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  loading: true,
  login: async () => { },
  logout: async () => { },
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ _id: string; name: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  const [getMe] = useLazyQuery<MeQuery>(ME_QUERY, { fetchPolicy: "network-only" });
  const [signOut] = useMutation<SignOutMutation>(SIGN_OUT_MUTATION);

  const fetchMe = async () => {
    try {
      const result = await getMe();
      if (!result.data?.me) {
        setUser(null);
      } else {
        setUser(result.data.me);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
      navigate("/admin")
    }
  };

  const login = async () => {
    await fetchMe();
  };

  const logout = async () => {
    try {
      await signOut();
      setUser(null);
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  useEffect(() => {
    fetchMe();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};