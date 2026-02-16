"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/supabase/auth";
import { useLocale } from "next-intl";

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const locale = useLocale();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      const path = typeof window !== "undefined" ? window.location.pathname : `/${locale}/minha-area`;
      router.replace(`/${locale}/login?redirect=${encodeURIComponent(path)}`);
    }
  }, [user, loading, router, locale]);

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <p className="text-zinc-400">Carregando...</p>
      </div>
    );
  }

  if (!user) return null;

  return <>{children}</>;
}
