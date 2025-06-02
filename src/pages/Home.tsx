import {useEffect, useState} from "react";
import Header from "../components/Header";
import MensCarousel from "../components/MensCarousel";
import api from "../services/api";
import ProductsList from "../components/ProductsList";
import ViewBar from "../components/ViewBar";
import type {Product} from "../types/Product";
import CartDrawer from "../components/CartDrawer";

function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    api
      .get("/products")
      .then((response) => setProducts(response.data))
      .catch((error) => {
        console.error("Erro ao buscar produtos:", error);
      });
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <Header onSearch={setSearchTerm} onCartClick={() => setCartOpen(true)} />
      <ViewBar
        viewMode={viewMode}
        setViewMode={setViewMode}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
      />
      <MensCarousel products={filteredProducts} />
      <ProductsList
        products={filteredProducts}
        viewMode={viewMode}
        itemsPerPage={itemsPerPage}
      />
    </>
  );
}

export default Home;
