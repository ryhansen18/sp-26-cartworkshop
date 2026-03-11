import { Link } from "react-router-dom";
import { useCart } from "../context/useCart";
import styles from "./CartPage.module.css";
import CheckoutForm from "../components/CheckoutForm";

export default function CartPage() {
  const { state, dispatch } = useCart();
  const cartTotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (state.items.length === 0) {
    return (
      <div className={styles.empty}>
        <p>Your cart is empty.</p>
        <Link to="/" className={styles.browseLink}>Browse Products</Link>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Your Cart</h1>
      <div className={styles.items}>
        {state.items.map((item) => (
          <div key={item.productId} className={styles.item}>
            <div className={styles.itemInfo}>
              <p className={styles.itemName}>{item.productName}</p>
              <p className={styles.itemPrice}>${item.price.toFixed(2)}</p>
            </div>
            <div className={styles.itemControls}>
              <button
                type="button"
                aria-label={`Decrease quantity of ${item.productName}`}
                disabled={item.quantity === 1}
                onClick={() => dispatch({ type: "UPDATE_QUANTITY", payload: { productId: item.productId, quantity: item.quantity - 1 } })}
              >−</button>
              <span>{item.quantity}</span>
              <button
                type="button"
                aria-label={`Increase quantity of ${item.productName}`}
                onClick={() => dispatch({ type: "UPDATE_QUANTITY", payload: { productId: item.productId, quantity: Math.min(item.quantity + 1, 99) } })}
              >+</button>
            </div>
            <p className={styles.lineTotal}>${(item.price * item.quantity).toFixed(2)}</p>
            <button
              type="button"
              className={styles.removeBtn}
              aria-label={`Remove ${item.productName} from cart`}
              onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: { productId: item.productId } })}
            >Remove</button>
          </div>
        ))}
      </div>
      <p className={styles.total}>Total: ${cartTotal.toFixed(2)}</p>
      {state.items.length > 0 && <CheckoutForm />}
    </div>
  );
}