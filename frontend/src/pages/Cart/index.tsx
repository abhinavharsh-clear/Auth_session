import { useState, useEffect } from "react";
import { useApi } from "../../hooks/useApi";
import styles from "./Cart.module.css";

type CartItem = {
  productId: number;
  quantity: number;
};

const Cart = () => {
  const { apiFetch } = useApi();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await apiFetch("/cart");

        if (!response.ok) {
          if (response.status !== 401) {
            const data = await response.json();
            throw new Error(data.error || "Failed to fetch cart");
          }
          return;
        }

        const data = await response.json();
        setCart(data.cart);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [apiFetch]);

  if (loading) {
    return <div className={styles.loading}>Loading cart...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Cart</h1>
      {cart.length === 0 ? (
        <div className={styles.empty}>Your cart is empty</div>
      ) : (
        <div className={styles.list}>
          {cart.map((item) => (
            <div key={item.productId} className={styles.item}>
              <span className={styles.itemName}>Product #{item.productId}</span>
              <span className={styles.itemQty}>Qty: {item.quantity}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
