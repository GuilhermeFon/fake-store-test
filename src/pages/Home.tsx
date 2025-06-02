import {useEffect, useState} from "react";
import Header from "../components/Header";
import MensCarousel from "../components/MensCarousel";
import api from "../services/api";
import ProductsList from "../components/ProductsList";
import ViewBar from "../components/ViewBar";
import type {Product} from "../types/Product";

function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

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
      <Header onSearch={setSearchTerm} />
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
