import { createContext, useContext, useState } from 'react';

const ContactModalContext = createContext(null);

export function ContactModalProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [prefill, setPrefill] = useState('');
  const [productName, setProductName] = useState('');
  const [prefillMessage, setPrefillMessage] = useState('');

  // interest: texto o lista de áreas a marcar; product: nombre del producto; message: texto inicial del mensaje
  const openContactModal = (interest = '', product = '', message = '') => {
    // Algunos botones pasan el evento del clic como primer argumento (onClick={openContactModal}):
    // solo se aceptan textos y listas, lo demás se ignora.
    setPrefill(typeof interest === 'string' || Array.isArray(interest) ? interest : '');
    setProductName(typeof product === 'string' ? product : '');
    setPrefillMessage(typeof message === 'string' ? message : '');
    setOpen(true);
  };
  const closeContactModal = () => { setOpen(false); setProductName(''); setPrefillMessage(''); };

  return (
    <ContactModalContext.Provider value={{ open, openContactModal, closeContactModal, prefill, productName, prefillMessage }}>
      {children}
    </ContactModalContext.Provider>
  );
}

export const useContactModal = () => useContext(ContactModalContext);
