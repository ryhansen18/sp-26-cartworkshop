import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import ProductDetailPage from "./pages/ProductDetailPage";
import ProductListPage from "./pages/ProductListPage";
import { CartProvider } from "./context/CartContext";
import CartPage from "./pages/CartPage";

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<ProductListPage />} />
            <Route path="products/:id" element={<ProductDetailPage />} />
            <Route path="cart" element={<CartPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}
