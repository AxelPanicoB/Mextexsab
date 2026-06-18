import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useContactModal } from '../context/ContactModalContext';
import Turnstile from './Turnstile';
import {
  Envelope, X, Flask, Check, PaperPlane, WarningCircle,
  Clock, ShieldCheck, CircleNotch, CheckCircle,
} from '@phosphor-icons/react';
import WhatsAppIcon from './WhatsAppIcon.jsx';

const BASE = import.meta.env.BASE_URL;

const INTEREST_OPTIONS = [
  'Quesos',
  'Cremas',
  'Yogurt',
  'Helados',
  'Bebidas',
  'Postres',
  'Tortillas',
  'Colorantes',
  'Saborizantes',
  'Texturizantes y Estabilizantes',
  'Auxiliares de Proceso',
  'Otro',
];

function ContactModal() {
  const { open, closeContactModal, prefill, productName } = useContactModal();
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', website: '' });
  const [interests, setInterests] = useState([]);
  const [turnstileToken, setTurnstileToken] = useState('');
  const [turnstileKey, setTurnstileKey] = useState(0);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (open) {
      const match = prefill
        ? INTEREST_OPTIONS.find(o => o === prefill || o.startsWith(prefill) || prefill.startsWith(o))
        : null;
      setInterests(match ? [match] : []);
      setStatus(null);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open, prefill]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const toggleInterest = (opt) =>
    setInterests(prev =>
      prev.includes(opt) ? prev.filter(i => i !== opt) : [...prev, opt]
    );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (interests.length === 0) {
      setStatus({ type: 'error', text: 'Selecciona al menos un área de interés.' });
      return;
    }
    setStatus({ type: 'loading' });
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, interest: interests.join(', '), turnstileToken }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Error al enviar.');
      setStatus({ type: 'success', text: '¡Listo! Te contactamos pronto.' });
      setForm({ name: '', email: '', phone: '', message: '', website: '' });
      setInterests([]);
      setTurnstileToken('');
      setTurnstileKey(k => k + 1);
    } catch (err) {
      setStatus({ type: 'error', text: err.message });
      setTurnstileKey(k => k + 1);
    }
  };

  return createPortal(
    <div className="cmodal-overlay" onClick={closeContactModal}>
      <div
        className="cmodal"
        role="dialog"
        aria-modal="true"
        aria-label="Contacto rápido"
        onClick={e => e.stopPropagation()}
      >
        <div className="cmodal-header">
          <div className="cmodal-header-icon">
            <Envelope size={30} weight="regular" />
          </div>
          <div className="cmodal-header-copy">
            <p className="cmodal-eyebrow">Contacto rápido</p>
            <h4>Cuéntanos de tu proyecto</h4>
          </div>
          <button
            type="button"
            className="cmodal-close"
            onClick={closeContactModal}
            aria-label="Cerrar"
          >
            <X size={30} weight="bold" />
          </button>
        </div>

        <div className="cmodal-body">
          {status?.type === 'success' ? (
            <div className="cmodal-success">
              <div className="cmodal-success-icon">
                <CheckCircle size={72} weight="fill" />
              </div>
              <h4>¡Mensaje enviado!</h4>
              <p>Un asesor técnico se pondrá en contacto contigo pronto.</p>
              <button type="button" className="cmodal-close-btn" onClick={closeContactModal}>
                Cerrar
              </button>
            </div>
          ) : (
            <form className="cmodal-form" onSubmit={handleSubmit}>
              {/* Honeypot — invisible para humanos, bots lo llenan */}
              <input
                name="website"
                value={form.website}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, width: 0, pointerEvents: 'none' }}
              />

              {productName && (
                <div className="cmodal-product-chip">
                  <Flask size={21} weight="regular" />
                  <span>{productName}</span>
                </div>
              )}
              <div className="cmodal-row">
                <label>
                  Nombre *
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Tu nombre"
                    required
                  />
                </label>
                <label>
                  Teléfono *
                  <input
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Teléfono"
                    required
                  />
                </label>
              </div>
              <label>
                Correo electrónico *
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="correo@empresa.com"
                  required
                />
              </label>
              <div className="cmodal-interests">
                <span className="cmodal-interests-label">
                  Áreas de interés * <small>(puedes elegir varias)</small>
                </span>
                <div className="cmodal-interest-chips" role="group" aria-label="Áreas de interés">
                  {INTEREST_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      className={`cmodal-interest-chip${interests.includes(opt) ? ' selected' : ''}`}
                      aria-pressed={interests.includes(opt)}
                      onClick={() => toggleInterest(opt)}
                    >
                      {interests.includes(opt) && <Check size={16} weight="bold" />}
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
              <label>
                Mensaje
                <textarea
                  name="message"
                  rows="2"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="¿Qué producto haces? ¿Qué necesitas mejorar? Cuéntanos con tus palabras, con gusto te asesoramos..."
                />
              </label>

              <Turnstile onVerify={setTurnstileToken} resetKey={turnstileKey} />

              <button
                type="submit"
                className="cmodal-submit"
                disabled={status?.type === 'loading'}
              >
                {status?.type === 'loading' ? (
                  <><CircleNotch size={24} weight="regular" className="icon-spin" /> Enviando...</>
                ) : (
                  <><PaperPlane size={24} weight="fill" /> Enviar mensaje</>
                )}
              </button>

              {status?.type === 'error' && (
                <p className="cmodal-status error">
                  <WarningCircle size={24} weight="fill" /> {status.text}
                </p>
              )}

            </form>
          )}
        </div>

        <div className="cmodal-footer">
          <span className="cmodal-footer-row">
            ¿Prefieres WhatsApp?{' '}
            <a
              className="flavors-note-btn flavors-note-btn--wa cmodal-wa-btn"
              href="https://wa.me/524422758979/?text=Hola%2C%20me%20gustar%C3%ADa%20recibir%20m%C3%A1s%20informaci%C3%B3n"
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon size={21} /> Escríbenos
            </a>
          </span>
          <span className="cmodal-footer-row cmodal-footer-hours">
            <Clock size={20} weight="regular" />
            Lun–Vie, 9:00–18:00
          </span>
          <span className="cmodal-footer-row cmodal-footer-privacy">
            <ShieldCheck size={20} weight="regular" />
            Tus datos son confidenciales.{' '}
            <a href={`${BASE}Documentos/Aviso_Privacidad_Integral_Metexsab.pdf`} target="_blank" rel="noopener noreferrer">
              Aviso de Privacidad
            </a>
          </span>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default ContactModal;
