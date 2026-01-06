
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

  // Funções auxiliares para os gráficos SVG
  const maxValueDaily = Math.max(data.entradas, data.despesas, Math.abs(data.saldo), 100);
  const getDailyHeight = (val: number) => (Math.abs(val) / maxValueDaily) * 100;

  const maxMonthValue = Math.max(data.mesAtualEntradas, data.mesAnteriorEntradas, 1);
  const monthActualHeight = (data.mesAtualEntradas / maxMonthValue) * 100;
  const monthPrevHeight = (data.mesAnteriorEntradas / maxMonthValue) * 100;

  // Cálculo de projeção simples
  const diasPassados = data.tendenciaDiaria.length || 1;
  const mediaDiaria = data.mesAtualEntradas / diasPassados;
  const projecaoFinal = data.mesAtualEntradas + (mediaDiaria * (30 - diasPassados));

  return (
    <div className="flex flex-col gap-6 animate-fade-in pb-10">
      <div className="flex items-center gap-2 mb-2">
        <button onClick={onBack} className="p-2 -ml-2 text-black active:scale-90 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="text-2xl font-black uppercase tracking-tight">Análise Estratégica</h2>
      </div>

      {/* CARD 1: RESUMO FINANCEIRO DO DIA */}
      <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
        <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">Resumo Financeiro do Dia</h3>
        
        <div className="flex justify-around items-end h-40 gap-4 mb-6">
          <div className="flex flex-col items-center flex-1 gap-2">
            <div className="w-full bg-gray-100 rounded-lg relative overflow-hidden" style={{ height: '100%' }}>
              <div 
                className="absolute bottom-0 w-full bg-black transition-all duration-1000" 
                style={{ height: `${getDailyHeight(data.entradas)}%` }}
              ></div>
            </div>
            <span className="text-[10px] font-bold text-gray-500 uppercase">Entradas</span>
          </div>

          <div className="flex flex-col items-center flex-1 gap-2">
            <div className="w-full bg-gray-100 rounded-lg relative overflow-hidden" style={{ height: '100%' }}>
              <div 
                className="absolute bottom-0 w-full bg-gray-400 transition-all duration-1000" 
                style={{ height: `${getDailyHeight(data.despesas)}%` }}
              ></div>
            </div>
            <span className="text-[10px] font-bold text-gray-500 uppercase">Saídas</span>
          </div>

          <div className="flex flex-col items-center flex-1 gap-2">
            <div className="w-full bg-gray-100 rounded-lg relative overflow-hidden" style={{ height: '100%' }}>
              <div 
                className={`absolute bottom-0 w-full transition-all duration-1000 ${data.saldo >= 0 ? 'bg-black opacity-30' : 'bg-red-500'}`} 
                style={{ height: `${getDailyHeight(data.saldo)}%` }}
              ></div>
            </div>
            <span className="text-[10px] font-bold text-gray-500 uppercase">Saldo</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-50">
          <div className="text-center">
            <p className="text-[8px] font-bold text-gray-400 uppercase">Entradas</p>
            <p className="text-xs font-black">{formatCurrency(data.entradas)}</p>
          </div>
          <div className="text-center">
            <p className="text-[8px] font-bold text-gray-400 uppercase">Saídas</p>
            <p className="text-xs font-black">{formatCurrency(data.despesas)}</p>
          </div>
          <div className="text-center">
            <p className="text-[8px] font-bold text-gray-400 uppercase">Saldo</p>
            <p className={`text-xs font-black ${data.saldo < 0 ? 'text-red-600' : ''}`}>{formatCurrency(data.saldo)}</p>
          </div>
        </div>
      </div>

      {/* CARD 2: COMPARATIVO MENSAL */}
      <div className="bg-black rounded-3xl p-6 shadow-xl text-white">
        <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-6">Mês Atual x Mês Anterior</h3>
        
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-end gap-4 h-32 px-4">
             <div className="flex flex-col items-center w-16 gap-2">
                <div className="w-12 bg-gray-800 rounded-t-xl relative overflow-hidden" style={{ height: '100%' }}>
                  <div className="absolute bottom-0 w-full bg-gray-600 transition-all duration-1000" style={{ height: `${monthPrevHeight}%` }}></div>
                </div>
                <span className="text-[9px] font-bold text-gray-400">ANTERIOR</span>
             </div>
             <div className="flex flex-col items-center w-16 gap-2">
                <div className="w-12 bg-gray-800 rounded-t-xl relative overflow-hidden" style={{ height: '100%' }}>
                  <div className="absolute bottom-0 w-full bg-white transition-all duration-1000" style={{ height: `${monthActualHeight}%` }}></div>
                </div>
                <span className="text-[9px] font-bold text-white">ATUAL</span>
             </div>
          </div>
          
          <div className="flex justify-between items-center bg-gray-900 rounded-2xl p-4">
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase">Crescimento Período</p>
              <p className="text-xl font-black">
                {((data.mesAtualEntradas / data.mesAnteriorEntradas - 1) * 100).toFixed(1)}%
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-gray-500 uppercase">Diferença</p>
              <p className="text-sm font-bold">{formatCurrency(data.mesAtualEntradas - data.mesAnteriorEntradas)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* CARD 3: TENDÊNCIA DE ENTRADAS */}
      <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
        <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">Tendência de Entradas Diárias</h3>
        
        <div className="h-40 w-full relative mb-4">
          <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible">
            {/* Grid horizontal */}
            <line x1="0" y1="10" x2="100" y2="10" stroke="#f3f4f6" strokeWidth="0.5" />
            <line x1="0" y1="20" x2="100" y2="20" stroke="#f3f4f6" strokeWidth="0.5" />
            <line x1="0" y1="30" x2="100" y2="30" stroke="#f3f4f6" strokeWidth="0.5" />
            
            {/* Linha de Tendência Real */}
            <path
              d={`M ${data.tendenciaDiaria.map((val, i) => `${(i / 11) * 70},${35 - (val / 3000) * 30}`).join(' L ')}`}
              fill="none"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            
            {/* Projeção Tracejada */}
            <line
              x1="70"
              y1={35 - (data.tendenciaDiaria[data.tendenciaDiaria.length-1] / 3000) * 30}
              x2="100"
              y2="15"
              stroke="black"
              strokeWidth="1"
              strokeDasharray="2,2"
              opacity="0.4"
            />
            
            {/* Ponto Atual */}
            <circle 
              cx="70" 
              cy={35 - (data.tendenciaDiaria[data.tendenciaDiaria.length-1] / 3000) * 30} 
              r="2" 
              fill="black" 
            />
          </svg>
        </div>

        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl">
          <div>
            <p className="text-[9px] font-bold text-gray-400 uppercase">Projeção Fim do Mês</p>
            <p className="text-lg font-black">{formatCurrency(projecaoFinal)}</p>
          </div>
          <span className="text-[8px] bg-white border px-2 py-1 rounded-full font-bold text-gray-400 italic">
            Estimado via média diária
          </span>
        </div>
      </div>

      <div className="p-4 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
        <p className="text-center text-[10px] text-gray-500 uppercase font-bold tracking-tight">
          “Administração transparente para o crescimento da obra.”
        </p>
      </div>

      <button
        onClick={onBack}
        className="w-full py-5 bg-black text-white rounded-2xl font-bold text-lg mt-2 active:scale-95 transition-all shadow-lg"
      >
        VOLTAR AO INÍCIO
      </button>
    </div>
  );
};

export default Summary;
