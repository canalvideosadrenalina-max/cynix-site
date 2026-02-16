"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useAuth } from "@/lib/supabase/auth";
import { signOut } from "@/lib/supabase/auth";
import { useLocale } from "next-intl";
import { Link } from "../../i18n/navigation";
import { LanguageSelector } from "./LanguageSelector";

const WHATSAPP_URL =
  "https://wa.me/5551995580969?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20os%20serviços%20da%20Cynix";

export function SiteHeader() {
  const { user, loading } = useAuth();
  const locale = useLocale();
  const t = useTranslations("nav");

  return (
    <header className="fixed top-0 z-50 w-full border-b border-zinc-800/80 bg-black/50 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/Gemini_Generated_Image_h033tph033tph033.png"
            alt="Cynix"
            width={140}
            height={44}
            className="h-10 w-auto object-contain"
            priority
          />
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          <a href="#solucoes" className="text-sm font-medium text-zinc-400 transition-colors hover:text-white">
            {t("solutions")}
          </a>
          <a href="#diferenciais" className="text-sm font-medium text-zinc-400 transition-colors hover:text-white">
            {t("differentiators")}
          </a>
          <a href="#metodologia" className="text-sm font-medium text-zinc-400 transition-colors hover:text-white">
            {t("howWeWork")}
          </a>
          <a href="#contato" className="text-sm font-medium text-zinc-400 transition-colors hover:text-white">
            {t("contact")}
          </a>
        </nav>
        <div className="flex items-center gap-3">
          <LanguageSelector />
          {loading ? (
            <span className="text-sm text-zinc-500">...</span>
          ) : user ? (
            <>
              <Link
                href="/minha-area"
                className="rounded-lg border border-zinc-600 px-3 py-2 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white"
              >
                {t("myArea")}
              </Link>
              <button
                onClick={() => signOut().then(() => (window.location.href = `/${locale}`))}
                className="rounded-lg border border-zinc-600 px-3 py-2 text-sm text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
              >
                {t("logout")}
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-lg border border-zinc-600 px-3 py-2 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white"
              >
                {t("login")}
              </Link>
              <Link
                href="/cadastro"
                className="rounded-lg border border-blue-500/60 bg-blue-600/90 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600"
              >
                {t("register")}
              </Link>
            </>
          )}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            {t("requestQuote")}
          </a>
        </div>
      </div>
    </header>
  );
}
