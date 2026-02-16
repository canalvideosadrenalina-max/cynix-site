export type Perfil = "pf" | "pj";

export type Objetivo = "landing" | "site" | "sistema" | "automacao";

export type ConversationStage =
  | "discovery"
  | "qualification"
  | "diagnosis"
  | "proposal"
  | "closing";

export interface ConversationState {
  businessType?: string;
  mainProblem?: string;
  isQualified: boolean;
  readyForProposal: boolean;
  readyToClose: boolean;
  stage: ConversationStage;
}

export interface LeadState {
  stage?: string;
  perfil?: Perfil;
  empresaNome?: string;
  segmento?: string;
  porte?: string;
  objetivo?: Objetivo;
  detalhesProjeto?: Record<string, unknown>;
  urgencia?: string;
  integracoes?: string[];
  identidadeVisual?: boolean;
  numeroPaginas?: number;
  funcionalidades?: string[];
  processo?: string;
  quantidadeUsuarios?: number;
  problemaPrincipal?: string;
  valorEstimado?: string;
  prazoEstimado?: string;
  nome?: string;
  email?: string;
  whatsapp?: string;
}
