
import React, { useState, useEffect } from 'react';
import { View, FinancialRecord, DailySummary } from './types';
import Home from './components/Home';
import CultoForm from './components/CultoForm';
import DespesaForm from './components/DespesaForm';
import Summary from './components/Summary';
import SuccessMessage from './components/SuccessMessage';
import Header from './components/Header';
import AccessGate from './components/AccessGate';

const API_ENDPOINT = "https://script.google.com/macros/s/AKfycbxKP-7AdDKzgRG156bTBgoZqxaOhjGKsFgJwLGVKr3tA0swWO-rXArsQE_7VqERhlLG/exec";

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('HOME');
  const [lastAction, setLastAction] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pendingView, setPendingView] = useState<View | null>(null);
  
  // Mock de dados para visualização inicial estratégica
  const [summaryData, setSummaryData] = useState<DailySummary>({
    entradas: 0,
    despesas: 0,
    saldo: 0,
    mesAtualEntradas: 12450.80,
    mesAnteriorEntradas: 10800.00,
    tendenciaDiaria: [450, 0, 1200, 300, 0, 800, 2100, 400, 150, 0, 950, 2800]
  });

  useEffect(() => {
    const saved = localStorage.getItem('icf_summary_day_v2');
    if (saved) {
      setSummaryData(JSON.parse(saved));
    }
    // Opcional: Persistir autenticação por um curto período (ex: 30 min)
    const authStatus = sessionStorage.getItem('icf_auth');
    if (authStatus === 'true') setIsAuthenticated(true);
  }, []);

  const handleNavigate = (view: View) => {
    const restrictedViews: View[] = ['REGISTRAR_DESPESA', 'RESUMO'];
    
    if (restrictedViews.includes(view) && !isAuthenticated) {
      setPendingView(view);
    } else {
      setCurrentView(view);
    }
  };

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem('icf_auth', 'true');
    if (pendingView) {
      setCurrentView(pendingView);
      setPendingView(null);
    }
  };

  const handleSave = async (data: FinancialRecord) => {
    setIsSubmitting(true);
    try {
      // Integração real com Google Apps Script
      // Nota: O modo 'no-cors' é utilizado para garantir o envio sem erros de preflight 
      // em endpoints simples de Google Macros que não possuem cabeçalhos CORS explícitos.
      await fetch(API_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      // Atualização do estado local para manter o dashboard sincronizado
      const newSummary = { ...summaryData };
      if (data.tipo === 'culto') {
        newSummary.entradas += data.valor;
        newSummary.mesAtualEntradas += data.valor;
        newSummary.tendenciaDiaria = [...newSummary.tendenciaDiaria, data.valor];
      } else {
        newSummary.despesas += data.valor;
      }
      newSummary.saldo = newSummary.entradas - newSummary.despesas;
      
      setSummaryData(newSummary);
      localStorage.setItem('icf_summary_day_v2', JSON.stringify(newSummary));

      setLastAction(data.tipo === 'culto' ? 'Culto registrado com sucesso' : 'Despesa registrada com sucesso');
      setCurrentView('SUCCESS');
    } catch (error) {
      console.error('Erro na integração:', error);
      alert('Erro ao salvar registro. Verifique sua conexão e tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderView = () => {
    if (pendingView) {
      return <AccessGate onSuccess={handleAuthSuccess} onCancel={() => setPendingView(null)} />;
    }

    switch (currentView) {
      case 'HOME':
        return <Home onNavigate={handleNavigate} isAuthenticated={isAuthenticated} />;
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
        return <Home onNavigate={handleNavigate} isAuthenticated={isAuthenticated} />;
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
