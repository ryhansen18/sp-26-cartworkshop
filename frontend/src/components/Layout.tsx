import { Link, Outlet } from "react-router-dom";
import { useCart } from "../context/useCart";
import styles from "./Layout.module.css";

export default function Layout() {
  const { state } = useCart();
  const cartItemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link to="/" className={styles.logo}>
            <span className={styles.logoIcon}>🌰</span>
            <h1 className={styles.title}>Buckeye Marketplace</h1>
          </Link>
          <Link to="/cart" className={styles.cartButton} aria-label={`Shopping cart with ${cartItemCount} items`}>
            🛒
            {cartItemCount > 0 && (
              <span className={styles.badge}>{cartItemCount}</span>
            )}
          </Link>
        </div>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}