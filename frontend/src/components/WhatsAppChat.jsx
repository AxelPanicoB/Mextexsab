import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { X, PaperPlaneRight, Gift } from '@phosphor-icons/react';
import { useCart } from '../context/CartContext';
import { useWhatsAppChat } from '../context/WhatsAppChatContext';
import WhatsAppIcon from './WhatsAppIcon.jsx';

const PHONE = '524422180650';
const BASE = import.meta.env.BASE_URL;

// Lista de productos elegidos para muestras, lista para pegar en el mensaje
function productList(cart) {
  return cart
    .map((p) => `• ${p.name}${p.selectedFlavors?.length ? ` (${p.selectedFlavors.join(', ')})` : ''}`)
    .join('\n');
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
//
// Los productos elegidos para muestras NO se copian dentro del texto: se leen del carrito
// en vivo y se agregan al final al enviar. Así, si el visitante agrega o quita productos
// con el chat abierto, el mensaje se actualiza solo.
function WhatsAppChat() {
  const { pathname } = useLocation();
  const { cart, openPanel } = useCart();
  const { open, setOpen, prefill } = useWhatsAppChat();
  const [message, setMessage] = useState('');
  const [includeProducts, setIncludeProducts] = useState(false);
  const textareaRef = useRef(null);

  const hasProducts = cart.length > 0;
  const attach = includeProducts && hasProducts;

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    textareaRef.current?.focus();
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  // al cambiar de página el chat se cierra
  useEffect(() => { setOpen(false); }, [pathname]);

  // si se abre desde otro lugar con un mensaje (ej. tarjeta de producto), se escribe solo
  useEffect(() => {
    if (prefill.id > 0 && prefill.text) pickReply(prefill.text, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefill.id]);

  const pickReply = (text, withProducts) => {
    setMessage(text);
    setIncludeProducts(withProducts);
    // el cursor queda al final para que el visitante complete o ajuste el mensaje
    requestAnimationFrame(() => {
      const ta = textareaRef.current;
      if (!ta) return;
      ta.focus();
      ta.setSelectionRange(text.length, text.length);
    });
  };

  // Las muestras no se piden por WhatsApp: se lleva al visitante al formulario de
  // "Solicitud de muestras", que llega por correo para tener mejor control.
  const openSamples = () => {
    setOpen(false);
    openPanel();
  };

  const send = (e) => {
    e.preventDefault();
    let text = message.trim() || (attach ? 'Hola, me gustaría solicitar una cotización.' : defaultMessage(pathname));
    if (attach) text += `\n\nProductos:\n${productList(cart)}`;
    const url = `https://wa.me/${PHONE}/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setMessage('');
    setIncludeProducts(false);
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
              <button
                type="button"
                onClick={() => pickReply('Hola, me gustaría solicitar una cotización.', true)}
              >
                Quiero cotizar
              </button>
              <button type="button" onClick={openSamples}>
                <Gift size={15} weight="fill" />
                Solicitar muestras
              </button>
              {/* Termina en "en " para que el visitante complete la frase */}
              <button type="button" onClick={() => pickReply('Hola, me gustaría asesoría en ', false)}>
                Me gustaría asesoría en…
              </button>
            </div>
          </div>

          <form className="wa-chat-form" onSubmit={send}>
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={onKeyDown}
              rows={Math.min(6, Math.max(2, Math.ceil(message.length / 34) + message.split('\n').length - 1))}
              maxLength={1000}
              placeholder="Escribe tu mensaje…"
              aria-label="Tu mensaje"
            />

            {hasProducts && (
              <div className="wa-chat-products">
                <label className="wa-chat-products-toggle">
                  <input
                    type="checkbox"
                    checked={includeProducts}
                    onChange={(e) => setIncludeProducts(e.target.checked)}
                  />
                  Incluir mis {cart.length} {cart.length === 1 ? 'producto seleccionado' : 'productos seleccionados'}
                </label>
                {attach && <pre className="wa-chat-products-list">{productList(cart)}</pre>}
              </div>
            )}

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
