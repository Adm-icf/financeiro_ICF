
import React, { useState } from 'react';
import { DespesaFixaData, DespesaVariavelData, FinancialRecord } from '../types';

interface DespesaFormProps {
  onSave: (data: FinancialRecord) => void;
  onBack: () => void;
  isSubmitting: boolean;
}

const DespesaForm: React.FC<DespesaFormProps> = ({ onSave, onBack, isSubmitting }) => {
  const [expenseType, setExpenseType] = useState<'fixa' | 'variavel'>('fixa');

  // Unified form state for ease of use in UI
  const [formData, setFormData] = useState({
    data: new Date().toISOString().split('T')[0],
    categoria: 'Outras' as DespesaFixaData['categoria'],
    descricao: '',
    valor: 0,
    status_pagamento: 'Pendente' as DespesaFixaData['status_pagamento'],
    responsavel: '',
    observacao: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.valor <= 0) {
      alert('Por favor, insira um valor válido.');
      return;
    }

    if (expenseType === 'fixa') {
      const payload: DespesaFixaData = {
        tipo: 'despesa_fixa',
        data: formData.data,
        categoria: formData.categoria,
        descricao: formData.descricao || formData.categoria,
        valor: formData.valor,
        status_pagamento: formData.status_pagamento,
        comprovante: '',
      };
      onSave(payload);
    } else {
      const payload: DespesaVariavelData = {
        tipo: 'despesa_variavel',
        data: formData.data,
        descricao: formData.descricao,
        valor: formData.valor,
        responsavel: formData.responsavel,
        observacao: formData.observacao,
      };
      onSave(payload);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <button onClick={onBack} className="p-2 -ml-2 text-black">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="text-2xl font-bold">Registrar Despesa</h2>
      </div>

      <div className="flex bg-gray-100 p-1 rounded-2xl">
        <button
          onClick={() => setExpenseType('fixa')}
          className={`flex-1 py-3 rounded-xl font-bold transition-all ${
            expenseType === 'fixa' ? 'bg-white shadow-sm text-black' : 'text-gray-500'
          }`}
        >
          Fixa
        </button>
        <button
          onClick={() => setExpenseType('variavel')}
          className={`flex-1 py-3 rounded-xl font-bold transition-all ${
            expenseType === 'variavel' ? 'bg-white shadow-sm text-black' : 'text-gray-500'
          }`}
        >
          Variável
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold uppercase text-gray-500">Data</label>
          <input
            type="date"
            required
            value={formData.data}
            onChange={e => setFormData({ ...formData, data: e.target.value })}
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-black outline-none"
          />
        </div>

        {expenseType === 'fixa' ? (
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold uppercase text-gray-500">Categoria</label>
            <select
              value={formData.categoria}
              onChange={e => setFormData({ ...formData, categoria: e.target.value as any })}
              className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white focus:border-black outline-none"
            >
              <option value="Aluguel">Aluguel</option>
              <option value="Luz">Luz</option>
              <option value="Água">Água</option>
              <option value="Internet">Internet</option>
              <option value="Telefone">Telefone</option>
              <option value="Outras">Outras</option>
            </select>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold uppercase text-gray-500">Descrição</label>
            <input
              type="text"
              required
              placeholder="Ex: Material de limpeza"
              value={formData.descricao}
              onChange={e => setFormData({ ...formData, descricao: e.target.value })}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-black outline-none"
            />
          </div>
        )}

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold uppercase text-gray-500">Valor (R$)</label>
          <input
            type="number"
            inputMode="decimal"
            step="0.01"
            required
            placeholder="0,00"
            value={formData.valor || ''}
            onChange={e => setFormData({ ...formData, valor: parseFloat(e.target.value) })}
            className="w-full p-4 border-2 border-gray-200 rounded-xl text-3xl font-bold focus:border-black outline-none"
          />
        </div>

        {expenseType === 'fixa' ? (
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold uppercase text-gray-500">Status</label>
            <div className="flex gap-2">
              {(['Pago', 'Pendente'] as const).map(status => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setFormData({ ...formData, status_pagamento: status })}
                  className={`flex-1 py-4 border-2 rounded-xl font-bold transition-all ${
                    formData.status_pagamento === status 
                      ? 'border-black bg-black text-white' 
                      : 'border-gray-200 bg-white text-gray-400'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold uppercase text-gray-500">Responsável</label>
            <input
              type="text"
              required
              placeholder="Quem realizou a compra"
              value={formData.responsavel}
              onChange={e => setFormData({ ...formData, responsavel: e.target.value })}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-black outline-none"
            />
          </div>
        )}

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold uppercase text-gray-500">Observações (Opcional)</label>
          <textarea
            rows={2}
            value={formData.observacao}
            onChange={e => setFormData({ ...formData, observacao: e.target.value })}
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-black outline-none resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-5 bg-black text-white rounded-2xl font-bold text-lg shadow-lg active:scale-95 transition-all flex items-center justify-center gap-3 ${isSubmitting ? 'opacity-70' : ''}`}
        >
          {isSubmitting ? (
            <span className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></span>
          ) : 'SALVAR DESPESA'}
        </button>
      </form>
    </div>
  );
};

export default DespesaForm;
