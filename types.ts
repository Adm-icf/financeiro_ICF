
export type View = 'HOME' | 'REGISTRAR_CULTO' | 'REGISTRAR_DESPESA' | 'RESUMO' | 'SUCCESS';

export interface CultoData {
  tipo: 'culto';
  data_culto: string;
  tipo_entrada: 'Dízimos' | 'Ofertas';
  valor: number;
  conferente_1: string;
  conferente_2: string;
  conferentes_extra: string[];
  observacao: string;
}

export interface DespesaFixaData {
  tipo: 'despesa_fixa';
  data: string;
  categoria: 'Aluguel' | 'Luz' | 'Água' | 'Internet' | 'Telefone' | 'Outras';
  descricao: string;
  valor: number;
  status_pagamento: 'Pago' | 'Pendente';
  comprovante: string;
}

export interface DespesaVariavelData {
  tipo: 'despesa_variavel';
  data: string;
  descricao: string;
  valor: number;
  responsavel: string;
  observacao: string;
}

export type FinancialRecord = CultoData | DespesaFixaData | DespesaVariavelData;

export interface DailySummary {
  entradas: number;
  despesas: number;
  saldo: number;
  // Novos campos para gráficos
  mesAtualEntradas: number;
  mesAnteriorEntradas: number;
  tendenciaDiaria: number[]; // Valores dos últimos 7-30 dias
}
