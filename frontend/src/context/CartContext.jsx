import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);

// Chime corto al agregar una muestra (generado con Web Audio, sin assets)
function playAddSound() {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    const ctx = playAddSound._ctx || (playAddSound._ctx = new Ctx());
    const go = () => {
      const now = ctx.currentTime;
      [[660, 0], [880, 0.09]].forEach(([freq, t]) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.0001, now + t);
        gain.gain.exponentialRampToValueAtTime(0.18, now + t + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + t + 0.22);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + t);
        osc.stop(now + t + 0.25);
      });
    };
    if (ctx.state === 'suspended') ctx.resume().then(go);
    else go();
  } catch { /* audio no disponible */ }
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem('mtx_cart')) || []; }
    catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem('mtx_cart', JSON.stringify(cart));
  }, [cart]);

  const add = (product, selectedFlavors = []) => {
    if (cart.some((p) => p.id === product.id)) return;
    playAddSound();
    setCart((prev) =>
      prev.some((p) => p.id === product.id)
        ? prev
        : [...prev, { id: product.id, name: product.name, sku: product.sku || null, selectedFlavors }]
    );
  };

  const updateFlavors = (id, selectedFlavors) =>
    setCart((prev) =>
      prev.map((p) => (p.id === id ? { ...p, selectedFlavors } : p))
    );

  const [panelOpen, setPanelOpen] = useState(false);
  const [hintDismissed, setHintDismissed] = useState(false);

  useEffect(() => {
    if (panelOpen) setHintDismissed(true);
  }, [panelOpen]);

  useEffect(() => {
    if (cart.length === 0) setHintDismissed(false);
  }, [cart.length]);

  const remove = (id) => setCart((prev) => prev.filter((p) => p.id !== id));
  const clear = () => setCart([]);
  const inCart = (id) => cart.some((p) => p.id === id);
  const getItem = (id) => cart.find((p) => p.id === id) || null;
  const openPanel = () => setPanelOpen(true);
  const closePanel = () => setPanelOpen(false);

  return (
    <CartContext.Provider value={{ cart, add, updateFlavors, remove, clear, inCart, getItem, panelOpen, openPanel, closePanel, hintDismissed }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
