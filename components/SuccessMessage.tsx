
import React from 'react';

interface SuccessMessageProps {
  message: string;
  onNew: () => void;
  onHome: () => void;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ message, onNew, onHome }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-8 py-12 h-full">
      <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-5xl animate-bounce">
        ✓
      </div>
      
      <div>
        <h2 className="text-3xl font-bold mb-2">Sucesso!</h2>
        <p className="text-gray-500 text-lg">{message}</p>
      </div>

      <div className="flex flex-col gap-4 w-full mt-6">
        <button
          onClick={onNew}
          className="w-full py-5 bg-black text-white rounded-2xl font-bold text-lg shadow-lg active:scale-95 transition-all"
        >
          REGISTRAR NOVO
        </button>
        
        <button
          onClick={onHome}
          className="w-full py-5 bg-white border-2 border-black text-black rounded-2xl font-bold text-lg active:bg-gray-100 transition-all"
        >
          VOLTAR AO INÍCIO
        </button>
      </div>
    </div>
  );
};

export default SuccessMessage;
