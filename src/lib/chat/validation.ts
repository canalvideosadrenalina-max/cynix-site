import type { LeadState } from "./types";

function hasContact(state: LeadState): boolean {
  const hasNome = typeof state.nome === "string" && state.nome.trim().length > 0;
  const hasEmail = typeof state.email === "string" && state.email.trim().length > 0;
  const hasWhatsapp = typeof state.whatsapp === "string" && state.whatsapp.trim().length > 0;
  return hasNome && (hasEmail || hasWhatsapp);
}

function hasPjBasics(state: LeadState): boolean {
  if (state.perfil !== "pj") return true;
  const hasEmpresa = typeof state.empresaNome === "string" && state.empresaNome.trim().length > 0;
  const hasSegmento = typeof state.segmento === "string" && state.segmento.trim().length > 0;
  const hasPorte = typeof state.porte === "string" && state.porte.trim().length > 0;
  return hasEmpresa && hasSegmento && hasPorte;
}

/**
 * Valida se o estado do lead tem os campos obrigatórios preenchidos
 * para permitir cálculo de preço, conforme o objetivo do projeto.
 */
export function canCalculatePrice(state: LeadState): boolean {
  if (!state.objetivo || !hasContact(state) || !hasPjBasics(state)) {
    return false;
  }

  switch (state.objetivo) {
    case "landing":
      return (
        typeof state.numeroPaginas === "number" &&
        state.numeroPaginas >= 1 &&
        typeof state.identidadeVisual === "boolean"
      );

    case "site":
      return (
        typeof state.numeroPaginas === "number" &&
        state.numeroPaginas >= 1 &&
        typeof state.identidadeVisual === "boolean" &&
        Array.isArray(state.funcionalidades)
      );

    case "sistema":
      return (
        typeof state.quantidadeUsuarios === "number" &&
        state.quantidadeUsuarios >= 1 &&
        typeof state.processo === "string" &&
        state.processo.trim().length > 0 &&
        typeof state.problemaPrincipal === "string" &&
        state.problemaPrincipal.trim().length > 0
      );

    case "automacao":
      return (
        Array.isArray(state.integracoes) &&
        typeof state.processo === "string" &&
        state.processo.trim().length > 0 &&
        typeof state.problemaPrincipal === "string" &&
        state.problemaPrincipal.trim().length > 0
      );

    default:
      return false;
  }
}
