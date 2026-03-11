import { Link } from "react-router-dom";
import type { ProductResponse } from "../types/product";
import { useCart } from "../context/useCart"; 
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  product: ProductResponse;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { dispatch } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch({
      type: "ADD_TO_CART",
      payload: {
        productId: product.id,
        productName: product.name ?? "Unknown Product",
        price: product.price,
        imageUrl: product.imageUrl ?? undefined,
      },
    });
  };

  return (
    <Link to={`/products/${product.id}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name ?? "Product"}
            className={styles.image}
          />
        ) : (
          <div className={styles.placeholder}>
            <span>📦</span>
          </div>
        )}
      </div>
      <div className={styles.body}>
        <span className={styles.category}>{product.categoryName}</span>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.price}>${product.price.toFixed(2)}</p>
        <button
          onClick={handleAddToCart}
          className={styles.addButton}
          aria-label={`Add ${product.name} to cart`}
        >
          Add to Cart
        </button>
      </div>
    </Link>
  );
}
