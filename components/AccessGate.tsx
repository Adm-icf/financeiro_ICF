
import React, { useState } from 'react';

interface AccessGateProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const AccessGate: React.FC<AccessGateProps> = ({ onSuccess, onCancel }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const CORRECT_PASSWORD = 'financeiroicf2026';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      onSuccess();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
      setPassword('');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center p-8 animate-fade-in">
      <div className="w-full max-w-xs flex flex-col items-center gap-8">
        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-4xl shadow-inner border border-gray-100">
          🔒
        </div>
        
        <div className="text-center">
          <h2 className="text-2xl font-black uppercase tracking-tight text-black">Acesso Restrito</h2>
          <p className="text-sm font-medium text-gray-500 mt-2">Pastores e Administrativo ICF</p>
        </div>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <div className="relative">
            <input
              type="password"
              autoFocus
              placeholder="Digite a senha de acesso"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full p-5 bg-gray-50 border-2 rounded-2xl text-center text-lg font-bold outline-none transition-all ${
                error ? 'border-red-500 animate-shake' : 'border-gray-100 focus:border-black'
              }`}
            />
            {error && (
              <p className="text-red-500 text-[10px] font-bold uppercase mt-2 text-center animate-pulse">
                Senha Incorreta
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-5 bg-black text-white rounded-2xl font-bold text-lg shadow-lg active:scale-95 transition-all"
          >
            CONFIRMAR ACESSO
          </button>
          
          <button
            type="button"
            onClick={onCancel}
            className="w-full py-3 text-gray-400 font-bold text-xs uppercase tracking-widest active:text-black transition-colors"
          >
            Voltar ao Início
          </button>
        </form>
      </div>
      
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.2s ease-in-out 0s 2;
        }
      `}</style>
    </div>
  );
};

export default AccessGate;
