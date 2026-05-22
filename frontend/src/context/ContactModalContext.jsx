import { createContext, useContext, useState } from 'react';

const ContactModalContext = createContext(null);

export function ContactModalProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [prefill, setPrefill] = useState('');
  const [productName, setProductName] = useState('');

  const openContactModal = (interest = '', product = '') => {
    setPrefill(interest);
    setProductName(product);
    setOpen(true);
  };
  const closeContactModal = () => { setOpen(false); setProductName(''); };

  return (
    <ContactModalContext.Provider value={{ open, openContactModal, closeContactModal, prefill, productName }}>
      {children}
    </ContactModalContext.Provider>
  );
}

export const useContactModal = () => useContext(ContactModalContext);
