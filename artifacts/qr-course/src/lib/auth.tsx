import React, { createContext, useContext, useEffect, useState } from "react";
import { Redirect } from "wouter";
import { type ComponentType } from "react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface AuthUser {
  id: number;
  username: string;
  email: string | null;
  displayName: string | null;
}

export interface AuthState {
  loading: boolean;
  authenticated: boolean;
  user: AuthUser | null;
}

// ---------------------------------------------------------------------------
// Context + Provider
// ---------------------------------------------------------------------------

const AuthContext = createContext<AuthState>({
  loading: true,
  authenticated: false,
  user: null,
});

const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    loading: true,
    authenticated: false,
    user: null,
  });

  useEffect(() => {
    fetch(`${basePath}/api/auth/user`, { credentials: "include" })
      .then((r) => r.json())
      .then((data) =>
        setState({
          loading: false,
          authenticated: !!data.authenticated,
          user: data.user ?? null,
        })
      )
      .catch(() => setState({ loading: false, authenticated: false, user: null }));
  }, []);

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthState {
  return useContext(AuthContext);
}

// ---------------------------------------------------------------------------
// requireLoginIfMetered — shared handler for raw fetch() calls.
// When the server answers 401 { error: "login_required" } (anonymous free
// allowance spent), send the visitor through Google sign-in. Returns true if
// a redirect was started (callers should bail out).
// ---------------------------------------------------------------------------

export async function requireLoginIfMetered(res: Response): Promise<boolean> {
  if (res.status !== 401) return false;
  try {
    const data = (await res.clone().json()) as { error?: string };
    if (data?.error === "login_required") {
      window.location.href = `${basePath}/api/auth/google`;
      return true;
    }
  } catch {
    // Not JSON — fall through.
  }
  return false;
}

// ---------------------------------------------------------------------------
// Spinner — shown while the session check is in flight
// ---------------------------------------------------------------------------

export function Spinner() {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-background">
      <div className="w-6 h-6 rounded-full border-2 border-primary border-t-transparent animate-spin" />
    </div>
  );
}

// ---------------------------------------------------------------------------
// protectedComponent — redirects unauthenticated users to "/"
// In development, auth is bypassed entirely (no login wall).
// ---------------------------------------------------------------------------

const IS_DEV = import.meta.env.DEV;

export function protectedComponent(Component: ComponentType<any>) {
  // Dev: skip the login wall completely
  if (IS_DEV) return Component;

  return function Guarded(props: any) {
    const { loading, authenticated } = useAuth();
    if (loading) return <Spinner />;
    if (!authenticated) return <Redirect to="/" />;
    return <Component {...props} />;
  };
}

// ---------------------------------------------------------------------------
// GoogleSignInButton — plain <a> that kicks off the Google OAuth flow.
// Using an anchor (not fetch) so the browser follows the server-side redirect
// to Google's account chooser without any client-side state needed.
// ---------------------------------------------------------------------------

export function GoogleSignInButton({ className }: { className?: string }) {
  return (
    <a
      href={`${basePath}/api/auth/google`}
      className={className}
    >
      Sign in with Google
    </a>
  );
}

// ---------------------------------------------------------------------------
// LogoutButton — POSTs to /api/auth/logout and reloads the page on success
// ---------------------------------------------------------------------------

export function LogoutButton({ className, children }: { className?: string; children?: React.ReactNode }) {
  const handleLogout = async () => {
    await fetch(`${basePath}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    window.location.href = basePath + "/";
  };

  return (
    <button onClick={handleLogout} className={className}>
      {children ?? "Sign out"}
    </button>
  );
}
