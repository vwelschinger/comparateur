import { X, Send, Calendar, Mail, Phone, User } from 'lucide-react';
import { useState } from 'react';
import type { ContactForm } from '../types';

interface Props {
  open: boolean;
  onClose: () => void;
}

const fieldClass =
  'flex items-center gap-3 bg-dark-bg/60 border border-dark-border rounded-xl transition-all focus-within:border-deluxe focus-within:ring-2 focus-within:ring-deluxe/20';

const inputClass =
  'flex-1 bg-transparent text-[15px] text-gray-200 focus:outline-none placeholder-gray-600';

export default function ContactModal({ open, onClose }: Props) {
  const [form, setForm] = useState<ContactForm>({
    nom: '',
    email: '',
    telephone: '',
    disponibilite: '',
  });
  const [submitted, setSubmitted] = useState(false);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subject = encodeURIComponent(`Demande d'Audit Deluxe — ${form.nom}`);
    const body = encodeURIComponent(
      `Bonjour Victor,\n\nUne nouvelle demande d'audit vient d'être soumise via le comparateur RH.\n\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `Nom       : ${form.nom}\n` +
      `Email     : ${form.email}\n` +
      `Téléphone : ${form.telephone}\n` +
      `Disponibilité : ${form.disponibilite || 'Non précisée'}\n` +
      `━━━━━━━━━━━━━━━━━━━━\n\n` +
      `Cordialement,\nComparateur Arbitrage RH`
    );

    window.location.href = `mailto:victor.welschinger@deluxe-conseil.fr?subject=${subject}&body=${body}`;

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
      setForm({ nom: '', email: '', telephone: '', disponibilite: '' });
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ padding: '1rem' }}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative glass-strong rounded-2xl w-full max-w-lg animate-fade-in" style={{ padding: '2.5rem' }}>
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-500 hover:text-white transition-colors"
          style={{ padding: '0.25rem' }}
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold text-white mb-2">Réserver un Audit</h2>
        <p className="text-[14px] text-gray-400" style={{ marginBottom: '2rem' }}>
          Un expert Deluxe Conseil vous contactera sous 24h.
        </p>

        {submitted ? (
          <div className="text-center animate-fade-in" style={{ padding: '2rem 0' }}>
            <div className="w-16 h-16 rounded-full bg-deluxe/20 flex items-center justify-center mx-auto" style={{ marginBottom: '1rem' }}>
              <Send size={24} className="text-deluxe-light" />
            </div>
            <p className="text-lg font-semibold text-white">Demande envoyée !</p>
            <p className="text-sm text-gray-400" style={{ marginTop: '0.375rem' }}>Votre client mail s'est ouvert avec la demande pré-remplie.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

            <div className={fieldClass} style={{ padding: '0.75rem 1rem' }}>
              <User size={17} className="text-gray-500 flex-shrink-0" />
              <input
                type="text"
                required
                placeholder="Nom complet"
                value={form.nom}
                onChange={(e) => setForm({ ...form, nom: e.target.value })}
                className={inputClass}
              />
            </div>

            <div className={fieldClass} style={{ padding: '0.75rem 1rem' }}>
              <Mail size={17} className="text-gray-500 flex-shrink-0" />
              <input
                type="email"
                required
                placeholder="Email professionnel"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={inputClass}
              />
            </div>

            <div className={fieldClass} style={{ padding: '0.75rem 1rem' }}>
              <Phone size={17} className="text-gray-500 flex-shrink-0" />
              <input
                type="tel"
                required
                placeholder="Téléphone"
                value={form.telephone}
                onChange={(e) => setForm({ ...form, telephone: e.target.value })}
                className={inputClass}
              />
            </div>

            <div className={fieldClass} style={{ padding: '0.75rem 1rem' }}>
              <Calendar size={17} className="text-gray-500 flex-shrink-0" />
              <input
                type="text"
                placeholder="Disponibilité (ex : Lundi 14h)"
                value={form.disponibilite}
                onChange={(e) => setForm({ ...form, disponibilite: e.target.value })}
                className={inputClass}
              />
            </div>

            <button
              type="submit"
              className="btn-primary w-full text-[15px]"
              style={{ marginTop: '0.5rem', padding: '0.875rem' }}
            >
              <Send size={17} />
              Envoyer ma demande
            </button>

          </form>
        )}
      </div>
    </div>
  );
}
