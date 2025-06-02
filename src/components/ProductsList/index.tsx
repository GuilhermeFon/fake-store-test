import type {Product} from "../../types/Product";
import CardGridItem from "./components/CardGridIem";
import CardListItem from "./components/CardListItem";
import {useMemo, useState} from "react";
import {useNavigate} from "react-router-dom";

type ProductListProps = {
  products: Product[];
  viewMode: "list" | "grid";
  itemsPerPage: number;
};

const ProductsList = ({products, viewMode, itemsPerPage}: ProductListProps) => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const filteredProducts = useMemo(
    () => products.filter((item) => item.category !== "men's clothing"),
    [products]
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));
  const handlePage = (n: number) => setPage(n);

  return (
    <section className="container mx-auto p-3 mt-[86px]">
      <div
        className={`container mx-auto justify-between flex ${
          viewMode === "list" ? "flex-col" : "flex-row flex-wrap"
        } gap-16`}
      >
        {paginatedProducts.map((item, index) =>
          viewMode === "list" ? (
            <div
              key={index}
              onClick={() => navigate(`/produto/${item.id}`)}
              className="cursor-pointer"
            >
              <CardListItem product={item} />
            </div>
          ) : (
            <div
              key={index}
              onClick={() => navigate(`/produto/${item.id}`)}
              className="cursor-pointer"
            >
              <CardGridItem product={item} />
            </div>
          )
        )}
      </div>
      <div className="flex justify-center items-center mt-[61px] gap-2">
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className="w-8 h-8 rounded-xl border border-[#0B1A8E] flex items-center justify-center text-[#1F2445] disabled:opacity-50 cursor-pointer"
        >
          {"<"}
        </button>
        {Array.from({length: totalPages}, (_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePage(i + 1)}
            className={`w-8 h-8 rounded-xl border border-[#0B1A8E] flex items-center justify-center font-bold cursor-pointer ${
              page === i + 1
                ? "bg-[#1F2445] text-white"
                : "bg-white text-[#1F2445]"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={handleNext}
          disabled={page === totalPages}
          className="w-8 h-8 rounded-xl border border-[#0B1A8E] flex items-center justify-center text-[#1F2445] disabled:opacity-50 cursor-pointer"
        >
          {">"}
        </button>
      </div>
    </section>
  );
};

export default ProductsList;
