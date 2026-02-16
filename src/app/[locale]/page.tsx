import { getTranslations, setRequestLocale } from "next-intl/server";
import { ChatWidget } from "../components/ChatWidget";
import { OpenChatLink } from "../components/OpenChatLink";
import { SiteHeader } from "../components/SiteHeader";

const WHATSAPP_URL =
  "https://wa.me/5551995580969?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20os%20serviços%20da%20Cynix";

function ChevronRight({ className, size = 16 }: { className?: string; size?: number }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function Globe({ className, size = 24 }: { className?: string; size?: number }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      <path d="M2 12h20" />
    </svg>
  );
}

function Layers({ className, size = 24 }: { className?: string; size?: number }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
      <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" />
      <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" />
    </svg>
  );
}

function Zap({ className, size = 24 }: { className?: string; size?: number }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
    </svg>
  );
}

function TrendingUp({ className, size = 24 }: { className?: string; size?: number }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}

function Cpu({ className, size = 24 }: { className?: string; size?: number }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect width="16" height="16" x="4" y="4" rx="2" ry="2" />
      <rect width="6" height="6" x="9" y="9" rx="1" />
      <path d="M15 2v2M15 20v2M9 2v2M9 20v2M2 15h2M2 9h2M20 15h2M20 9h2" />
    </svg>
  );
}

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const tFooter = await getTranslations("footer");

  const segmentos = [
    { nome: t("segmentos.miniMercados"), desc: t("segmentos.miniMercadosDesc") },
    { nome: t("segmentos.restaurantes"), desc: t("segmentos.restaurantesDesc") },
    { nome: t("segmentos.padarias"), desc: t("segmentos.padariasDesc") },
    { nome: t("segmentos.postos"), desc: t("segmentos.postosDesc") },
    { nome: t("segmentos.financeiro"), desc: t("segmentos.financeiroDesc") },
  ];

  return (
    <div className="min-h-screen bg-transparent text-zinc-100">
      <SiteHeader />

      <main>
        <section className="mx-auto max-w-6xl px-6 pt-32 pb-20 md:pt-40 md:pb-28">
          <div className="max-w-3xl rounded-2xl bg-black/50 px-6 py-8 backdrop-blur-sm md:px-8 md:py-10">
            <h1 className="text-contrast-strong text-neon-strong mb-6 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
              {t("hero.title")}
            </h1>
            <p className="text-contrast text-neon mb-10 text-lg leading-relaxed text-zinc-200 md:text-xl">
              {t("hero.subtitle")}
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#solucoes"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700"
              >
                {t("hero.viewSolutions")}
                <ChevronRight />
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-600 bg-transparent px-6 py-3 text-sm font-medium text-white transition-colors hover:border-zinc-500 hover:bg-zinc-800/50"
              >
                {t("hero.talkToConsultant")}
              </a>
            </div>
          </div>
        </section>

        <section id="solucoes" className="border-t border-zinc-800/80 bg-zinc-950/50 py-20">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-contrast text-neon mb-3 text-2xl font-semibold text-white md:text-3xl">
              {t("solutions.title")}
            </h2>
            <p className="text-contrast mb-14 max-w-xl text-zinc-300">
              {t("solutions.subtitle")}
            </p>

            <div className="mb-20">
              <div className="mb-8 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/20 text-blue-400">
                  <Globe size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">{t("solutions.sites.title")}</h3>
                  <p className="text-sm text-zinc-400">{t("solutions.sites.subtitle")}</p>
                </div>
              </div>
              <p className="mb-8 max-w-2xl text-zinc-400">
                {t("solutions.sites.description")}
              </p>
              <ul className="mb-8 grid gap-3 sm:grid-cols-2">
                <li className="flex items-start gap-2 text-sm text-zinc-300">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                  {t("solutions.sites.item1")}
                </li>
                <li className="flex items-start gap-2 text-sm text-zinc-300">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                  {t("solutions.sites.item2")}
                </li>
                <li className="flex items-start gap-2 text-sm text-zinc-300">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                  {t("solutions.sites.item3")}
                </li>
                <li className="flex items-start gap-2 text-sm text-zinc-300">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                  {t("solutions.sites.item4")}
                </li>
              </ul>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300"
              >
                {t("solutions.sites.cta")}
                <ChevronRight size={14} />
              </a>
            </div>

            <div>
              <div className="mb-8 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600/20 text-emerald-400">
                  <Layers size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">{t("solutions.apps.title")}</h3>
                  <p className="text-sm text-zinc-400">{t("solutions.apps.subtitle")}</p>
                </div>
              </div>
              <p className="mb-6 max-w-2xl text-zinc-400">
                {t("solutions.apps.description")}
              </p>
              <p className="mb-4 text-sm font-medium text-zinc-300">{t("solutions.apps.segmentLabel")}</p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {segmentos.map((s) => (
                  <div
                    key={s.nome}
                    className="rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-4 transition-colors hover:border-zinc-700"
                  >
                    <h4 className="mb-1 font-medium text-white">{s.nome}</h4>
                    <p className="text-xs text-zinc-400">{s.desc}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-emerald-400 hover:text-emerald-300"
                >
                  {t("solutions.apps.cta")}
                  <ChevronRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="diferenciais" className="border-t border-zinc-800/80 py-20">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-contrast text-neon mb-3 text-2xl font-semibold text-white md:text-3xl">
              {t("diferenciais.title")}
            </h2>
            <p className="text-contrast mb-14 max-w-xl text-zinc-300">
              {t("diferenciais.subtitle")}
            </p>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/30 p-6">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-blue-600/10 text-blue-400">
                  <Cpu size={22} />
                </div>
                <h3 className="mb-2 font-semibold text-white">{t("diferenciais.tech")}</h3>
                <p className="text-sm text-zinc-400">{t("diferenciais.techDesc")}</p>
              </div>
              <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/30 p-6">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-600/10 text-emerald-400">
                  <TrendingUp size={22} />
                </div>
                <h3 className="mb-2 font-semibold text-white">{t("diferenciais.profit")}</h3>
                <p className="text-sm text-zinc-400">{t("diferenciais.profitDesc")}</p>
              </div>
              <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/30 p-6">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-amber-600/10 text-amber-400">
                  <Zap size={22} />
                </div>
                <h3 className="mb-2 font-semibold text-white">{t("diferenciais.automation")}</h3>
                <p className="text-sm text-zinc-400">{t("diferenciais.automationDesc")}</p>
              </div>
              <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/30 p-6">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-violet-600/10 text-violet-400">
                  <Layers size={22} />
                </div>
                <h3 className="mb-2 font-semibold text-white">{t("diferenciais.scale")}</h3>
                <p className="text-sm text-zinc-400">{t("diferenciais.scaleDesc")}</p>
              </div>
            </div>
          </div>
        </section>

        <section id="metodologia" className="border-t border-zinc-800/80 bg-zinc-950/50 py-20">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-contrast text-neon mb-3 text-2xl font-semibold text-white md:text-3xl">
              {t("metodologia.title")}
            </h2>
            <p className="text-contrast mb-14 max-w-xl text-zinc-300">
              {t("metodologia.subtitle")}
            </p>
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
              <div>
                <span className="mb-3 block text-2xl font-bold text-blue-500">1.</span>
                <h3 className="mb-2 font-semibold text-white">{t("metodologia.step1")}</h3>
                <p className="text-sm leading-relaxed text-zinc-400">{t("metodologia.step1Desc")}</p>
              </div>
              <div>
                <span className="mb-3 block text-2xl font-bold text-blue-500">2.</span>
                <h3 className="mb-2 font-semibold text-white">{t("metodologia.step2")}</h3>
                <p className="text-sm leading-relaxed text-zinc-400">{t("metodologia.step2Desc")}</p>
              </div>
              <div>
                <span className="mb-3 block text-2xl font-bold text-blue-500">3.</span>
                <h3 className="mb-2 font-semibold text-white">{t("metodologia.step3")}</h3>
                <p className="text-sm leading-relaxed text-zinc-400">{t("metodologia.step3Desc")}</p>
              </div>
              <div>
                <span className="mb-3 block text-2xl font-bold text-blue-500">4.</span>
                <h3 className="mb-2 font-semibold text-white">{t("metodologia.step4")}</h3>
                <p className="text-sm leading-relaxed text-zinc-400">{t("metodologia.step4Desc")}</p>
              </div>
            </div>
          </div>
        </section>

        <section id="contato" className="border-t border-zinc-800/80 py-20">
          <div className="mx-auto max-w-6xl px-6 text-center">
            <h2 className="text-contrast text-neon text-2xl font-semibold text-white md:text-3xl">
              {t("cta.title")}
            </h2>
            <p className="text-contrast mx-auto mt-3 max-w-md text-zinc-300">
              {t("cta.subtitle")}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700"
              >
                {t("cta.whatsapp")}
              </a>
              <OpenChatLink />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-800/80 py-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="mb-2 text-lg font-semibold text-white">Cynix</p>
              <p className="text-sm text-zinc-500">{tFooter("tagline")}</p>
            </div>
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">{tFooter("navTitle")}</p>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li><a href="#solucoes" className="hover:text-white">{tFooter("solutions")}</a></li>
                <li><a href="#diferenciais" className="hover:text-white">{tFooter("differentiators")}</a></li>
                <li><a href="#metodologia" className="hover:text-white">{tFooter("howWeWork")}</a></li>
                <li><a href="#contato" className="hover:text-white">{tFooter("contact")}</a></li>
              </ul>
            </div>
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">{tFooter("contactTitle")}</p>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-sm text-zinc-400 hover:text-white">
                {tFooter("requestQuote")}
              </a>
            </div>
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">{tFooter("solutionsTitle")}</p>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li>{tFooter("sites")}</li>
                <li>{tFooter("apps")}</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-zinc-800/80 pt-8 text-center text-sm text-zinc-500">
            © {new Date().getFullYear()} Cynix. {tFooter("rights")}
          </div>
        </div>
      </footer>

      <ChatWidget />
    </div>
  );
}
