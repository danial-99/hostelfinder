import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
}

export const useAuth = () => {
    const router = useRouter();
  const [auth, setAuth] = useState<AuthState>(() => {
    // Initialize state from localStorage
    const storedAuth = localStorage.getItem('auth');
    return storedAuth ? JSON.parse(storedAuth) : { user: null, token: null };
  });

  useEffect(() => {
    // Update localStorage when auth state changes
    localStorage.setItem('auth', JSON.stringify(auth));
  }, [auth]);

  const loginHook = (userData: User, token: string) => {
    setAuth({ user: userData, token });
  };

  const logoutHook = () => {
    localStorage.removeItem("auth");
    router.push('/login');
  };

  return {
    user: auth.user,
    token: auth.token,
    isLoggedIn: !!auth.token,
    loginHook,
    logoutHook,
  };
};