"use client";

import { useLocale } from "next-intl";
import { usePathname, Link } from "../../i18n/navigation";

const LOCALES = [
  { code: "pt-BR" as const, flag: "🇧🇷", label: "PT" },
  { code: "en" as const, flag: "🇺🇸", label: "EN" },
  { code: "es" as const, flag: "🇪🇸", label: "ES" },
] as const;

export function LanguageSelector() {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-1 rounded-lg border border-zinc-600 bg-zinc-900/50 p-1">
      {LOCALES.map(({ code, flag, label }) => {
        const isActive = locale === code;
        return (
          <Link
            key={code}
            href={pathname}
            locale={code}
            className={`flex h-8 w-8 items-center justify-center rounded-md text-sm transition hover:bg-zinc-700 hover:text-white ${
              isActive ? "bg-blue-600 text-white" : "text-zinc-400"
            }`}
            title={label}
            aria-label={`Idioma: ${label}`}
          >
            {flag}
          </Link>
        );
      })}
    </div>
  );
}
