import { createContext, useContext, useState } from 'react';

const ContactModalContext = createContext(null);

export function ContactModalProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [prefill, setPrefill] = useState('');

  const openContactModal = (interest = '') => { setPrefill(interest); setOpen(true); };
  const closeContactModal = () => setOpen(false);

  return (
    <ContactModalContext.Provider value={{ open, openContactModal, closeContactModal, prefill }}>
      {children}
    </ContactModalContext.Provider>
  );
}

export const useContactModal = () => useContext(ContactModalContext);
