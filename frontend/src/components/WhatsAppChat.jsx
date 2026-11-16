import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { X, PaperPlaneRight, Gift } from '@phosphor-icons/react';
import { useCart } from '../context/CartContext';
import WhatsAppIcon from './WhatsAppIcon.jsx';

const PHONE = '524422180650';
const BASE = import.meta.env.BASE_URL;

// Lista de productos elegidos para muestras, lista para pegar en el mensaje
function productList(cart) {
  return cart
    .map((p) => `• ${p.name}${p.selectedFlavors?.length ? ` (${p.selectedFlavors.join(', ')})` : ''}`)
    .join('\n');
}

// Respuestas rápidas: rellenan el mensaje para que el visitante lo revise antes de enviarlo.
// Si ya eligió productos para muestras, se incluyen en el mensaje de cotización.
function quickReplies(cart) {
  const list = cart.length > 0 ? `\n${productList(cart)}` : '';
  return [
    {
      label: 'Quiero cotizar',
      text: cart.length > 0
        ? `Hola, me gustaría solicitar una cotización de los siguientes productos:${list}`
        : 'Hola, me gustaría solicitar una cotización.',
    },
    // Las muestras no se piden por WhatsApp: se lleva al visitante al formulario de
    // "Solicitud de muestras", que llega por correo para tener mejor control.
    { label: 'Solicitar muestras', action: 'samples' },
    // Termina en "en " para que el visitante complete la frase
    { label: 'Me gustaría asesoría en…', text: 'Hola, me gustaría asesoría en ' },
  ];
}

// Mensaje por defecto según la sección que está viendo el visitante
function defaultMessage(pathname) {
  if (pathname.startsWith('/productos')) {
    return 'Hola, vengo del catálogo de productos y me gustaría recibir más información';
  }
  if (pathname.startsWith('/nosotros')) {
    return 'Hola, conocí su empresa en la sección Nosotros y me gustaría recibir más información';
  }
  return 'Hola, visité su página web y me gustaría recibir más información';
}

// Mini chat: el visitante escribe aquí y al enviar se abre WhatsApp con el mensaje ya listo.
// (WhatsApp exige que el visitante pulse "enviar" en su app; no se puede saltar ese paso.)
function WhatsAppChat() {
  const { pathname } = useLocation();
  const { cart, openPanel } = useCart();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    textareaRef.current?.focus();
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  // al cambiar de página el chat se cierra
  useEffect(() => { setOpen(false); }, [pathname]);

  const pickReply = (text) => {
    setMessage(text);
    // el cursor queda al final para que el visitante complete o ajuste el mensaje
    requestAnimationFrame(() => {
      const ta = textareaRef.current;
      if (!ta) return;
      ta.focus();
      ta.setSelectionRange(text.length, text.length);
    });
  };

  // Abre el formulario de solicitud de muestras (llega por correo) y cierra el chat
  const openSamples = () => {
    setOpen(false);
    openPanel();
  };

  const send = (e) => {
    e.preventDefault();
    const text = message.trim() || defaultMessage(pathname);
    const url = `https://wa.me/${PHONE}/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setMessage('');
    setOpen(false);
  };

  const onKeyDown = (e) => {
    // Enter envía; Shift+Enter hace salto de línea
    if (e.key === 'Enter' && !e.shiftKey) send(e);
  };

  return (
    <>
      {open && (
        <section className="wa-chat" role="dialog" aria-label="Chat de WhatsApp con Metexsab">
          <header className="wa-chat-header">
            <span className="wa-chat-avatar">
              <img src={`${BASE}img/favicon-180.png`} alt="" />
            </span>
            <div className="wa-chat-id">
              <strong>Metexsab</strong>
              <small>Atención Lun–Vie, 9:00–18:00</small>
            </div>
            <button type="button" className="wa-chat-close" onClick={() => setOpen(false)} aria-label="Cerrar chat">
              <X size={20} weight="bold" />
            </button>
          </header>

          <div className="wa-chat-body">
            <p className="wa-chat-bubble">
              ¡Hola! 👋<br />
              ¿En qué podemos ayudarte?
            </p>
            <div className="wa-chat-replies">
              {quickReplies(cart).map((r) => (
                <button
                  type="button"
                  key={r.label}
                  onClick={() => (r.action === 'samples' ? openSamples() : pickReply(r.text))}
                >
                  {r.action === 'samples' && <Gift size={15} weight="fill" />}
                  {r.label}
                </button>
              ))}
            </div>
            {cart.length > 0 && (
              <p className="wa-chat-hint">
                <Gift size={16} weight="fill" />
                Tienes {cart.length} {cart.length === 1 ? 'producto seleccionado' : 'productos seleccionados'}.
                Se incluirán en tu mensaje al elegir "Quiero cotizar".
              </p>
            )}
          </div>

          <form className="wa-chat-form" onSubmit={send}>
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={onKeyDown}
              rows={message.includes('\n') ? 5 : 2}
              maxLength={1500}
              placeholder="Escribe tu mensaje…"
              aria-label="Tu mensaje"
            />
            <button type="submit" className="wa-chat-send">
              <PaperPlaneRight size={20} weight="fill" /> Enviar por WhatsApp
            </button>
            <p className="wa-chat-note">Se abrirá WhatsApp con tu mensaje listo para enviar.</p>
          </form>
        </section>
      )}

      <button
        type="button"
        className="whatsapp"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Cerrar chat de WhatsApp' : 'Abrir chat de WhatsApp'}
        aria-expanded={open}
        title="Contáctanos por WhatsApp"
      >
        <span className="whatsapp-pulse" />
        {open ? <X size={28} weight="bold" /> : <WhatsAppIcon size={28} />}
      </button>
    </>
  );
}

export default WhatsAppChat;
