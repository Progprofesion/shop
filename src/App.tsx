import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "./reset.scss";
import ListProductCard from "./components/listProductCard/ListProductCard";
import Cart from "./components/Cart/Cart";
import { lazy } from "react";

// Создаем экземпляр QueryClient
const queryClient = new QueryClient();

const CartLazy = lazy(() => import("./components/Cart/Cart.tsx"));
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ListProductCard />} />
          <Route path="/cart" element={<CartLazy />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
