// Estrutura de precificação – base vazia para implementação futura

export type PlanId = string;

export interface Plan {
  id: PlanId;
  name: string;
  price: number;
  interval?: string;
}

export const plans: Plan[] = [];
