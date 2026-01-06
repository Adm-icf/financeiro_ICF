
import React, { useState, useEffect } from 'react';
import { View, FinancialRecord, DailySummary } from './types';
import Home from './components/Home';
import CultoForm from './components/CultoForm';
import DespesaForm from './components/DespesaForm';
import Summary from './components/Summary';
import SuccessMessage from './components/SuccessMessage';
import Header from './components/Header';

// The endpoint provided by the user would be used here.
const API_ENDPOINT = "COLE_AQUI_A_API_FINANCEIRA_ICF_URL";

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('HOME');
  const [lastAction, setLastAction] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [summaryData, setSummaryData] = useState<DailySummary>({
    entradas: 0,
    despesas: 0,
    saldo: 0
  });

  useEffect(() => {
    const saved = localStorage.getItem('icf_summary_day');
    if (saved) {
      setSummaryData(JSON.parse(saved));
    }
  }, []);

  const handleSave = async (data: FinancialRecord) => {
    setIsSubmitting(true);
    try {
      // Simulation of API call as requested
      await new Promise(resolve => setTimeout(resolve, 800));

      const newSummary = { ...summaryData };
      if (data.tipo === 'culto') {
        newSummary.entradas += data.valor;
      } else {
        newSummary.despesas += data.valor;
      }
      newSummary.saldo = newSummary.entradas - newSummary.despesas;
      
      setSummaryData(newSummary);
      localStorage.setItem('icf_summary_day', JSON.stringify(newSummary));

      setLastAction(data.tipo === 'culto' ? 'Culto registrado com sucesso' : 'Despesa registrada com sucesso');
      setCurrentView('SUCCESS');
    } catch (error) {
      alert('Erro ao salvar registro. Verifique sua conexão.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderView = () => {
    switch (currentView) {
      case 'HOME':
        return <Home onNavigate={setCurrentView} />;
      case 'REGISTRAR_CULTO':
        return <CultoForm onSave={handleSave} onBack={() => setCurrentView('HOME')} isSubmitting={isSubmitting} />;
      case 'REGISTRAR_DESPESA':
        return <DespesaForm onSave={handleSave} onBack={() => setCurrentView('HOME')} isSubmitting={isSubmitting} />;
      case 'RESUMO':
        return <Summary data={summaryData} onBack={() => setCurrentView('HOME')} />;
      case 'SUCCESS':
        return (
          <SuccessMessage 
            message={lastAction} 
            onNew={() => setCurrentView(lastAction.includes('Culto') ? 'REGISTRAR_CULTO' : 'REGISTRAR_DESPESA')}
            onHome={() => setCurrentView('HOME')}
          />
        );
      default:
        return <Home onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col max-w-md mx-auto shadow-2xl relative">
      <Header onHome={() => setCurrentView('HOME')} />
      <main className="flex-1 overflow-y-auto px-6 py-6 pb-24">
        {renderView()}
      </main>
      <footer className="py-6 text-center text-[10px] text-gray-400 border-t bg-gray-50/30">
        <p className="font-bold text-gray-600 tracking-wider">IGREJA CRISTÃ FILADÉLFIA</p>
        <p>© 2026 - Administrativo ICF</p>
      </footer>
    </div>
  );
};

export default App;
