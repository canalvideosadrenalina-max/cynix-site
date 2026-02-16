import type { ConversationState, ConversationStage, LeadState } from "./types";

const INITIAL_STATE: ConversationState = {
  isQualified: false,
  readyForProposal: false,
  readyToClose: false,
  stage: "discovery",
};

/** Padrões para detectar pergunta por preço ou orçamento */
const PRICE_INTEREST_PATTERNS = [
  /\b(quanto\s+custa|custa\s+quanto|qual\s+o\s+pre[cç]o|pre[cç]o\s+de|valor\s+do|valor\s+de)\b/i,
  /\b(or[cç]amento|quanto\s+fica|quanto\s+sai|quanto\s+cobram)\b/i,
  /\b(quero\s+saber\s+o\s+valor|passa\s+or[cç]amento|manda\s+or[cç]amento)\b/i,
];

/** Padrões para interesse claro em contratar */
const HIRING_INTEREST_PATTERNS = [
  /\b(quero\s+contratar|vamos\s+fechar|fechar\s+neg[oó]cio|como\s+contrato|como\s+contratamos)\b/i,
  /\b(quero\s+fechar|pode\s+mandar\s+proposta|aceito|fechado|combinado)\b/i,
  /\b(quero\s+come[cç]ar|iniciar\s+o\s+projeto|bora\s+fazer)\b/i,
];

/** Indica se a mensagem do usuário menciona preço/orçamento */
function askedPrice(message: string): boolean {
  const normalized = message.normalize("NFD").replace(/\u0300/g, "");
  return PRICE_INTEREST_PATTERNS.some((re) => re.test(normalized));
}

/** Indica se a mensagem demonstra interesse claro em contratar */
function showedHiringInterest(message: string): boolean {
  const normalized = message.normalize("NFD").replace(/\u0300/g, "");
  return HIRING_INTEREST_PATTERNS.some((re) => re.test(normalized));
}

/** Extrai tipo de negócio do LeadState (segmento/porte/empresa) ou deixa o anterior */
function getBusinessType(lead: LeadState, previous?: string): string | undefined {
  const parts: string[] = [];
  if (lead.segmento) parts.push(lead.segmento);
  if (lead.porte) parts.push(lead.porte);
  if (lead.empresaNome) parts.push(lead.empresaNome);
  const fromLead = parts.length > 0 ? parts.join(" — ") : undefined;
  return fromLead ?? previous;
}

/** Extrai problema principal do LeadState ou mantém o anterior */
function getMainProblem(lead: LeadState, previous?: string): string | undefined {
  if (typeof lead.problemaPrincipal === "string" && lead.problemaPrincipal.trim().length > 0) {
    return lead.problemaPrincipal.trim();
  }
  return previous;
}

/** Considera qualificado quando tem tipo de negócio e objetivo (e opcionalmente problema) */
function computeIsQualified(lead: LeadState, businessType?: string): boolean {
  const hasObjective = !!lead.objetivo;
  const hasBusiness = !!(businessType && businessType.trim().length > 0);
  return hasObjective && hasBusiness;
}

/** Pronto para proposta quando está qualificado e tem problema principal identificado */
function computeReadyForProposal(
  isQualified: boolean,
  mainProblem?: string
): boolean {
  return isQualified && !!(mainProblem && mainProblem.trim().length > 0);
}

export function createInitialConversationState(): ConversationState {
  return { ...INITIAL_STATE };
}

/**
 * Analisa a mensagem do usuário e o estado do lead para atualizar o estado da conversa.
 * Aplica as regras de progressão de estágio apenas no backend.
 */
export function updateConversationState(
  userMessage: string,
  leadState: LeadState,
  previous: ConversationState
): ConversationState {
  const trimmedMessage = userMessage.trim();
  const businessType = getBusinessType(leadState, previous.businessType);
  const mainProblem = getMainProblem(leadState, previous.mainProblem);
  const isQualified = computeIsQualified(leadState, businessType);
  const readyForProposal = computeReadyForProposal(isQualified, mainProblem);
  const askedPriceThisTurn = askedPrice(trimmedMessage);
  const showedInterestThisTurn = showedHiringInterest(trimmedMessage);

  let stage: ConversationStage = previous.stage ?? "discovery";
  let readyToClose = previous.readyToClose ?? false;

  // Regras de progressão (ordem de prioridade: fechamento > proposta > diagnóstico > qualificação > discovery)
  if (askedPriceThisTurn || showedInterestThisTurn) {
    stage = "closing";
    readyToClose = true;
  } else if (readyForProposal && (previous.readyForProposal || stage === "diagnosis")) {
    stage = "proposal";
  } else if (mainProblem && mainProblem.trim().length > 0) {
    stage = "diagnosis";
  } else if (businessType && businessType.trim().length > 0) {
    stage = "qualification";
  } else {
    stage = "discovery";
  }

  return {
    businessType,
    mainProblem,
    isQualified,
    readyForProposal,
    readyToClose,
    stage,
  };
}
