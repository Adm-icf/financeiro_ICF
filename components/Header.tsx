
import React from 'react';

interface HeaderProps {
  onHome: () => void;
}

const Header: React.FC<HeaderProps> = ({ onHome }) => {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      {/* Faixa decorativa preta fina no topo extremo para elegância */}
      <div className="h-1 bg-black w-full"></div>
      
      <div className="pt-6 pb-5 px-6 flex flex-col items-center">
        <div 
          className="cursor-pointer mb-4 active:scale-95 transition-transform" 
          onClick={onHome}
        >
          {/* O arquivo deve ser nomeado logo.png na raiz ou ajustado para a URL da imagem */}
          <img 
            src="logo.png" 
            alt="Logotipo Oficial ICF" 
            className="h-32 w-auto object-contain"
            onError={(e) => {
              // Fallback visual caso a imagem não carregue
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=ICF+LOGO';
              console.warn("Certifique-se de que a imagem oficial foi salva como 'logo.png'");
            }}
          />
        </div>
        
        <div className="text-center">
          <h1 className="text-xl font-black tracking-[0.25em] text-black uppercase">
            Financeiro ICF
          </h1>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
            Gestão Administrativa Diária
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
