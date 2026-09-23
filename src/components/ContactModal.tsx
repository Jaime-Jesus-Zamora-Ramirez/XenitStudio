import React, { useState } from 'react';
import { X, Check, Send, Mail, MessageSquare } from 'lucide-react';
import { sound } from './AudioController';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [type, setType] = useState('Publisher / Inversión');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Por favor completa todos los campos requeridos.');
      return;
    }
    if (!email.includes('@') || !email.includes('.')) {
      setError('Introduce una dirección de correo electrónico válida.');
      return;
    }

    sound.playClick();
    setError('');
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setName('');
    setEmail('');
    setMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-lg rounded-2xl border border-white/15 bg-[#0b0b10] p-6 text-neutral-200 shadow-2xl overflow-y-auto max-h-[90vh]"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-start justify-between border-b border-white/10 pb-4 mb-4">
          <div>
            <h3 className="font-display text-xl font-bold text-white tracking-tight">
              Contacto XENIT STUDIO
            </h3>
            <p className="text-xs text-neutral-400 mt-1">
              Inversión, distribución, alianzas tecnológicas y prensa especializada.
            </p>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="rounded-lg p-1.5 text-neutral-400 hover:bg-white/10 hover:text-white transition-colors"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white">
              <Check className="h-6 w-6" />
            </div>
            <h4 className="font-display text-lg font-bold text-white">
              Mensaje Transmitido con Éxito
            </h4>
            <p className="text-xs text-neutral-400 max-w-xs mx-auto leading-relaxed">
              Gracias por conectar con XENIT STUDIO. Nuestro equipo de producción y desarrollo responderá en menos de 24 horas hábiles.
            </p>
            <button
              onClick={handleReset}
              className="mt-4 rounded-lg bg-white px-5 py-2 text-xs font-semibold text-black hover:bg-neutral-200 transition-colors"
            >
              Cerrar Ventana
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-lg bg-red-950/40 border border-red-800/60 p-3 text-xs text-red-300">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                Nombre / Organización
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej. Kojima Productions / Valve Partner / Jaime"
                className="w-full rounded-lg border border-white/10 bg-black/60 px-3.5 py-2.5 text-xs text-white placeholder:text-neutral-600 focus:border-white/50 focus:outline-none focus:ring-1 focus:ring-white"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                Correo Electrónico
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="contacto@estudio.com"
                className="w-full rounded-lg border border-white/10 bg-black/60 px-3.5 py-2.5 text-xs text-white placeholder:text-neutral-600 focus:border-white/50 focus:outline-none focus:ring-1 focus:ring-white"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                Tipo de Consulta
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-neutral-900 px-3.5 py-2.5 text-xs text-white focus:border-white/50 focus:outline-none"
              >
                <option value="Publisher / Inversión">Publisher / Editorial / Financiación</option>
                <option value="Prensa / Cobertura">Prensa / Medios / Entrevistas</option>
                <option value="Plataformas / Porting">Plataformas (Sony / Microsoft / Valve)</option>
                <option value="Carreras / Contratación">Carreras / Portafolios de Artistas y Programadores</option>
                <option value="Comunidad / Feedback">Comunidad / Playtest Feedback</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                Mensaje o Propuesta
              </label>
              <textarea
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe tu propuesta, proyecto o solicitud de reunión..."
                className="w-full rounded-lg border border-white/10 bg-black/60 px-3.5 py-2.5 text-xs text-white placeholder:text-neutral-600 focus:border-white/50 focus:outline-none focus:ring-1 focus:ring-white resize-none"
              />
            </div>

            <div className="pt-2 flex items-center justify-between">
              <div className="flex items-center gap-2 text-[11px] text-neutral-500">
                <Mail className="h-3.5 w-3.5" />
                <span>contact@xenitstudio.games</span>
              </div>

              <button
                type="submit"
                className="flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-xs font-bold text-black hover:bg-neutral-200 transition-colors"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Enviar Propuesta</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
