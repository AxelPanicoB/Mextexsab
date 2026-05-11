import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem('mtx_cart')) || []; }
    catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem('mtx_cart', JSON.stringify(cart));
  }, [cart]);

  const add = (product, selectedFlavors = []) =>
    setCart((prev) =>
      prev.some((p) => p.id === product.id)
        ? prev
        : [...prev, { id: product.id, name: product.name, selectedFlavors }]
    );

  const updateFlavors = (id, selectedFlavors) =>
    setCart((prev) =>
      prev.map((p) => (p.id === id ? { ...p, selectedFlavors } : p))
    );

  const remove = (id) => setCart((prev) => prev.filter((p) => p.id !== id));
  const clear = () => setCart([]);
  const inCart = (id) => cart.some((p) => p.id === id);
  const getItem = (id) => cart.find((p) => p.id === id) || null;

  return (
    <CartContext.Provider value={{ cart, add, updateFlavors, remove, clear, inCart, getItem }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
