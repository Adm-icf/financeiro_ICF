
import React from 'react';
import { DailySummary } from '../types';

interface SummaryProps {
  data: DailySummary;
  onBack: () => void;
}

const Summary: React.FC<SummaryProps> = ({ data, onBack }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <button onClick={onBack} className="p-2 -ml-2 text-black">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="text-2xl font-bold">Resumo do Dia</h2>
      </div>

      <div className="flex flex-col gap-4">
        <div className="bg-white border-2 border-gray-100 p-6 rounded-3xl shadow-sm">
          <span className="text-sm font-semibold text-gray-400 uppercase tracking-widest block mb-1">Entradas (Culto)</span>
          <span className="text-3xl font-bold text-green-600">{formatCurrency(data.entradas)}</span>
        </div>

        <div className="bg-white border-2 border-gray-100 p-6 rounded-3xl shadow-sm">
          <span className="text-sm font-semibold text-gray-400 uppercase tracking-widest block mb-1">Despesas</span>
          <span className="text-3xl font-bold text-red-600">{formatCurrency(data.despesas)}</span>
        </div>

        <div className="bg-black p-8 rounded-3xl shadow-xl mt-2">
          <span className="text-sm font-semibold text-gray-400 uppercase tracking-widest block mb-1">Saldo Final</span>
          <span className={`text-4xl font-bold ${data.saldo >= 0 ? 'text-white' : 'text-red-400'}`}>
            {formatCurrency(data.saldo)}
          </span>
        </div>
      </div>

      <div className="mt-4 p-4 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
        <p className="text-center text-sm text-gray-500 italic">
          “Para detalhes completos, acesse a planilha financeira da igreja.”
        </p>
      </div>

      <button
        onClick={onBack}
        className="w-full py-5 bg-gray-100 text-black rounded-2xl font-bold text-lg mt-4 active:bg-gray-200 transition-colors"
      >
        VOLTAR AO INÍCIO
      </button>
    </div>
  );
};

export default Summary;
