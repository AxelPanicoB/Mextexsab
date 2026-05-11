import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function CartBar() {
  const { cart, remove } = useCart();
  if (cart.length === 0) return null;

  return (
    <div className="cart-bar">
      <div className="cart-bar-inner">
        <div className="cart-bar-left">
          <i className="fa-solid fa-flask"></i>
          <span>
            <strong>{cart.length}</strong>{' '}
            {cart.length === 1 ? 'producto seleccionado' : 'productos seleccionados'}
          </span>
        </div>
        <div className="cart-chips">
          {cart.map((p) => (
            <span key={p.id} className="cart-chip">
              <span className="cart-chip-content">
                <span className="cart-chip-name">{p.name}</span>
                {p.selectedFlavors && p.selectedFlavors.length > 0 && (
                  <span className="cart-chip-flavors">{p.selectedFlavors.join(' · ')}</span>
                )}
              </span>
              <button type="button" onClick={() => remove(p.id)} aria-label="Quitar">
                <i className="fa-solid fa-xmark"></i>
              </button>
            </span>
          ))}
        </div>
        <Link to="/contacto" className="cart-bar-btn">
          Solicitar información <i className="fa-solid fa-arrow-right"></i>
        </Link>
      </div>
    </div>
  );
}

export default CartBar;
