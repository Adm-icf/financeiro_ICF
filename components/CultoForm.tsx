
import React, { useState } from 'react';
import { CultoData } from '../types';

interface CultoFormProps {
  onSave: (data: CultoData) => void;
  onBack: () => void;
  isSubmitting: boolean;
}

const CultoForm: React.FC<CultoFormProps> = ({ onSave, onBack, isSubmitting }) => {
  const [formData, setFormData] = useState<Omit<CultoData, 'tipo'>>({
    data_culto: new Date().toISOString().split('T')[0],
    tipo_entrada: 'Dízimos',
    valor: 0,
    conferente_1: '',
    conferente_2: '',
    conferentes_extra: [],
    observacao: ''
  });

  const [extraConferente, setExtraConferente] = useState('');
  const [showExtraInput, setShowExtraInput] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.valor <= 0) {
      alert('Por favor, insira um valor válido.');
      return;
    }
    if (!formData.conferente_1 || !formData.conferente_2) {
      alert('Por favor, informe pelo menos dois conferentes.');
      return;
    }
    onSave({ ...formData, tipo: 'culto' });
  };

  const addExtraConferente = () => {
    if (extraConferente.trim()) {
      setFormData(prev => ({
        ...prev,
        conferentes_extra: [...prev.conferentes_extra, extraConferente.trim()]
      }));
      setExtraConferente('');
      setShowExtraInput(false);
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
        <h2 className="text-2xl font-bold">Registrar Culto</h2>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold uppercase text-gray-500">Data do Culto</label>
          <input
            type="date"
            required
            value={formData.data_culto}
            onChange={e => setFormData({ ...formData, data_culto: e.target.value })}
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-black outline-none transition-colors"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold uppercase text-gray-500">Tipo de Entrada</label>
          <div className="flex gap-2">
            {(['Dízimos', 'Ofertas'] as const).map(type => (
              <button
                key={type}
                type="button"
                onClick={() => setFormData({ ...formData, tipo_entrada: type })}
                className={`flex-1 py-4 border-2 rounded-xl font-bold transition-all ${
                  formData.tipo_entrada === type 
                    ? 'border-black bg-black text-white' 
                    : 'border-gray-200 bg-white text-gray-400'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

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
            className="w-full p-4 border-2 border-gray-200 rounded-xl text-3xl font-bold focus:border-black outline-none transition-colors"
          />
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold uppercase text-gray-500">Conferente 1</label>
            <input
              type="text"
              required
              value={formData.conferente_1}
              onChange={e => setFormData({ ...formData, conferente_1: e.target.value })}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-black outline-none"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold uppercase text-gray-500">Conferente 2</label>
            <input
              type="text"
              required
              value={formData.conferente_2}
              onChange={e => setFormData({ ...formData, conferente_2: e.target.value })}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-black outline-none"
            />
          </div>
        </div>

        {formData.conferentes_extra.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {formData.conferentes_extra.map((name, i) => (
              <span key={i} className="px-3 py-1 bg-gray-100 text-sm rounded-full flex items-center gap-2">
                {name}
                <button 
                  type="button" 
                  onClick={() => setFormData(prev => ({ ...prev, conferentes_extra: prev.conferentes_extra.filter((_, idx) => idx !== i) }))}
                  className="text-gray-400"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        )}

        {showExtraInput ? (
          <div className="flex gap-2">
            <input
              type="text"
              autoFocus
              value={extraConferente}
              onChange={e => setExtraConferente(e.target.value)}
              placeholder="Nome do conferente"
              className="flex-1 p-3 border-2 border-gray-200 rounded-xl focus:border-black outline-none"
            />
            <button
              type="button"
              onClick={addExtraConferente}
              className="px-4 py-3 bg-black text-white rounded-xl font-bold"
            >
              Adicionar
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setShowExtraInput(true)}
            className="text-left text-sm font-bold text-gray-600 flex items-center gap-2"
          >
            <span className="text-xl">+</span> Adicionar conferente
          </button>
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
          ) : 'SALVAR REGISTRO'}
        </button>
      </form>
    </div>
  );
};

export default CultoForm;
