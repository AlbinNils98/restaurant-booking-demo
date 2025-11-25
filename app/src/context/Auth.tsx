import { useLazyQuery, useMutation } from '@apollo/client';
import { createContext, useState, type ReactNode, useEffect, useContext } from "react";
import { ME_QUERY } from '../graphql/query/user';
import type { MeQuery, RefreshMutation, SignOutMutation, UserDto } from '../generated/graphql';
import { REFRESH_MUTATION, SIGN_OUT_MUTATION } from '../graphql/mutation/auth';
import { setAccessToken } from '../apolloClient';
import { useLocation } from 'react-router-dom';

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserDto | null;
  loading: boolean;
  login: (acessToken?: string) => Promise<void>;
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
  const location = useLocation();
  const [user, setUser] = useState<{ _id: string; name: string } | null>(null);
  const [loading, setLoading] = useState(true);

  const [getMe] = useLazyQuery<MeQuery>(ME_QUERY, { fetchPolicy: "network-only" });
  const [signOut] = useMutation<SignOutMutation>(SIGN_OUT_MUTATION);


  const [refresh] = useMutation<RefreshMutation>(REFRESH_MUTATION);

  const refreshToken = async (): Promise<boolean> => {
    try {
      const result = await refresh();
      if (result.data?.refresh) {
        setAccessToken(result.data.refresh)
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const fetchMe = async () => {
    try {
      const result = await getMe();

      if (result.error) {
        const message = result.error.message;

        if (message.includes("Not authorized")) {
          const refreshed = await refreshToken();
          if (refreshed) {
            const retry = await getMe();
            setUser(retry.data?.me ?? null);
            return;
          }

          // Refresh failed -> log out
          await logout();
          return;
        }

        console.warn("GraphQL error:", message);
        return;
      }

      setUser(result.data?.me ?? null);

    } catch (err) {
      console.error("Network error:", err);
    } finally {
      setLoading(false);
    }
  };

  const login = async (accessToken?: string) => {
    if (accessToken) {
      setAccessToken(accessToken)
    }
    await fetchMe();
  };

  const logout = async () => {
    try {
      await signOut();
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      setUser(null);
      setAccessToken(null);
    }
  };

  useEffect(() => {
    const init = async () => {
      await fetchMe();
    };

    init();
  }, []);

  useEffect(() => {
    if (location.pathname.startsWith("/admin")) {
      const checkAuth = async () => {
        await fetchMe();
      };
      checkAuth();
    }
  }, [location.pathname]);

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};