import { createContext, useContext, useState } from 'react';

// Permite abrir el mini chat de WhatsApp desde cualquier parte del sitio,
// opcionalmente con un mensaje ya escrito (por ejemplo, desde una tarjeta de producto).
const WhatsAppChatContext = createContext(null);

export function WhatsAppChatProvider({ children }) {
  const [open, setOpen] = useState(false);
  // "id" cambia en cada apertura para que el mismo mensaje se vuelva a aplicar
  const [prefill, setPrefill] = useState({ text: '', id: 0 });

  const openChat = (text = '') => {
    setPrefill((p) => ({ text, id: p.id + 1 }));
    setOpen(true);
  };

  return (
    <WhatsAppChatContext.Provider value={{ open, setOpen, openChat, prefill }}>
      {children}
    </WhatsAppChatContext.Provider>
  );
}

export const useWhatsAppChat = () => useContext(WhatsAppChatContext);
