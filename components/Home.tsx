
import React from 'react';
import { View } from '../types';

interface HomeProps {
  onNavigate: (view: View) => void;
  isAuthenticated: boolean;
}

const Home: React.FC<HomeProps> = ({ onNavigate, isAuthenticated }) => {
  return (
    <div className="flex flex-col gap-6 pt-4 h-full justify-center">
      {/* Botão Público: Registrar Culto */}
      <button
        onClick={() => onNavigate('REGISTRAR_CULTO')}
        className="w-full flex flex-col items-center justify-center gap-2 py-10 px-6 bg-white border-2 border-black text-black rounded-3xl active:bg-gray-100 transition-all shadow-sm group"
      >
        <span className="text-4xl mb-1 group-active:scale-110 transition-transform">💒</span>
        <span className="text-xl font-bold uppercase tracking-wide leading-tight">Registrar Ofertas e Dízimos</span>
        <span className="text-xs font-medium text-gray-500 lowercase tracking-normal">aqui voce deve registrar data e valores</span>
      </button>

      {/* Botão Restrito: Registrar Despesa */}
      <button
        onClick={() => onNavigate('REGISTRAR_DESPESA')}
        className={`w-full flex flex-col items-center justify-center gap-2 py-10 px-6 border-2 rounded-3xl transition-all shadow-sm group relative overflow-hidden ${
          isAuthenticated 
            ? 'bg-white border-black text-black' 
            : 'bg-white border-gray-200 text-gray-500 opacity-80'
        }`}
      >
        {!isAuthenticated && (
          <div className="absolute top-4 right-4 text-xs opacity-40">🔒</div>
        )}
        <span className="text-4xl mb-1 group-active:scale-110 transition-transform grayscale-[0.5]">💸</span>
        <span className="text-xl font-bold uppercase tracking-wide leading-tight">Registrar Despesa</span>
        <span className="text-xs font-medium text-gray-400 lowercase tracking-normal">aqui voce deve inserir despesas em geral</span>
      </button>

      {/* Botão Restrito: Resumo */}
      <button
        onClick={() => onNavigate('RESUMO')}
        className={`w-full flex flex-col items-center justify-center gap-2 py-10 px-6 border-2 rounded-3xl transition-all shadow-sm group relative overflow-hidden ${
          isAuthenticated 
            ? 'bg-gray-50 border-black text-black' 
            : 'bg-gray-50 border-transparent text-gray-400 opacity-60'
        }`}
      >
        {!isAuthenticated && (
          <div className="absolute top-4 right-4 text-xs opacity-30">🔒</div>
        )}
        <span className="text-4xl mb-1 group-active:scale-110 transition-transform grayscale">📊</span>
        <span className="text-xl font-bold uppercase tracking-wide leading-tight">Resumo Geral</span>
        <span className="text-xs font-medium text-gray-400 lowercase tracking-normal">acompanhe aqui a saude financeira</span>
      </button>

      {!isAuthenticated && (
        <p className="text-[9px] text-center text-gray-400 font-bold uppercase tracking-widest mt-2">
          Áreas com ícone 🔒 são restritas a pastores e ADM
        </p>
      )}
    </div>
  );
};

export default Home;
