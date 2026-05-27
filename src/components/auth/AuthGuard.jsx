"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

/**
 * Wraps protected pages. If the user is not logged in after auth initialisation,
 * they are redirected to /login?redirect=<current path>.
 *
 * Usage:
 *   <AuthGuard>
 *     <YourPageComponent />
 *   </AuthGuard>
 */
export function AuthGuard({ children, redirectTo = "/login" }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isLoggedIn, initialized, isLoading } = useAuth();

  useEffect(() => {
    if (initialized && !isLoggedIn) {
      const target = `${redirectTo}?redirect=${encodeURIComponent(pathname)}`;
      router.replace(target);
    }
  }, [initialized, isLoggedIn, router, pathname, redirectTo]);

  // While we are still checking auth, show nothing (avoids flash of protected content)
  if (!initialized || isLoading) {
    return (
      <section className="container flex min-h-[300px] items-center justify-center py-16">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#0B5FAE] border-t-transparent" />
      </section>
    );
  }

  if (!isLoggedIn) {
    return null;
  }

  return <>{children}</>;
}

export default AuthGuard;
