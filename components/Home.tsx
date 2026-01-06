
import React from 'react';
import { View } from '../types';

interface HomeProps {
  onNavigate: (view: View) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col gap-6 pt-4 h-full justify-center">
      <button
        onClick={() => onNavigate('REGISTRAR_CULTO')}
        className="w-full flex flex-col items-center justify-center gap-3 py-10 px-6 bg-white border-2 border-black text-black rounded-2xl active:bg-gray-100 transition-colors shadow-sm"
      >
        <span className="text-4xl">💒</span>
        <span className="text-xl font-bold uppercase tracking-wide">Registrar Culto</span>
      </button>

      <button
        onClick={() => onNavigate('REGISTRAR_DESPESA')}
        className="w-full flex flex-col items-center justify-center gap-3 py-10 px-6 bg-white border-2 border-black text-black rounded-2xl active:bg-gray-100 transition-colors shadow-sm"
      >
        <span className="text-4xl">💸</span>
        <span className="text-xl font-bold uppercase tracking-wide">Registrar Despesa</span>
      </button>

      <button
        onClick={() => onNavigate('RESUMO')}
        className="w-full flex flex-col items-center justify-center gap-3 py-10 px-6 bg-gray-50 border-2 border-transparent text-black rounded-2xl active:bg-gray-200 transition-colors shadow-sm"
      >
        <span className="text-4xl">📊</span>
        <span className="text-xl font-bold uppercase tracking-wide">Resumo do Dia</span>
      </button>
    </div>
  );
};

export default Home;
