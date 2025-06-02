import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import type {Product} from "../types/Product";
import api from "../services/api";
import CartImage from "../assets/images/cart.png";
import Header from "../components/Header";
import CartDrawer from "../components/CartDrawer";
import {useCart} from "../store/cart";

const ProductDetail = () => {
  const {id} = useParams<{id: string}>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [cartOpen, setCartOpen] = useState(false);
  const {add} = useCart();

  useEffect(() => {
    setLoading(true);

    api
      .get(`/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar produtos:", error);
        setLoading(false);
      });
  }, [id]);

  const addToCart = () => {
    if (!product) return;
    add(product);
    setCartOpen(true);
  };

  if (loading) return <div className="text-center py-10">Carregando...</div>;
  if (!product) return null;

  const hasDiscount = product?.category === "men's clothing";

  return (
    <>
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <Header />
      <div className="h-12 bg-[#F2F3F8] flex items-center">
        <div className="container mx-auto px-4">
          <h1 className="text-xs md:text-2xl font-bold">{product.title}</h1>
        </div>
      </div>
      <div className="container px-3 md:px-4 py-4 mx-auto mt-10">
        <div className="flex flex-col gap-4 lg:flex-row md:gap-10">
          <div className="flex justify-between items-center">
            <div className="flex justify-center items-center border-2 border-[#0B1A8E] rounded-[20px] p-6 sm:px-[37px] sm:py-[22px] max-w-[125px] max-h-[158px] lg:max-w-[358px] lg:max-h-[451px]">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full max-w-[340px] lg:max-h-[420px] object-contain"
              />
            </div>
            <div className="lg:hidden">
              {hasDiscount ? (
                <div className="rounded-[20px] p-4 pb-4 shadow-xl flex flex-col gap-2 relative min-w-[195px] min-h-[157px] max-w-sm">
                  <span className="text-xl font-bold line-through">
                    DE: {(product.price * 1.1).toFixed(2).replace(".", ",")}
                  </span>
                  <span className="flex text-2xl font-bold">
                    <span>POR: R$</span>
                    <span className="font-normal">
                      {product.price.toFixed(2).replace(".", ",")}
                    </span>
                  </span>
                  <button
                    className="bg-[#0B1A8E] flex items-center justify-center gap-1 text-white px-4 py-2 rounded-[10px] font-bold h-[38px] text-[15px] cursor-pointer"
                    onClick={addToCart}
                  >
                    <img
                      src={CartImage}
                      alt="Carrinho"
                      className="cursor-pointer w-[10px] h-3"
                    />
                    COMPRAR
                  </button>
                  <span className="absolute top-[-10px] right-[-10px] bg-[#5062F0] w-[55px] h-[46px] text-white text-xs px-2 py-1 rounded-full shadow">
                    <div className="flex flex-col items-center text-[15px] font-bold">
                      <span>10%</span>
                      <span>OFF</span>
                    </div>
                  </span>
                </div>
              ) : (
                <div className="rounded-[10px] p-3 shadow-lg flex flex-col items-center min-w-[140px] min-h-[110px] bg-white">
                  <span className="text-xs font-medium w-full text-left mb-[-8px]">
                    R$
                  </span>
                  <span className="text-[40px] font-normal leading-none mb-2">
                    {product.price.toFixed(2).replace(".", ",")}
                  </span>
                  <button
                    className="bg-[#0B1A8E] flex items-center justify-center gap-1 text-white px-3 py-1 rounded font-bold text-[15px] w-full cursor-pointer"
                    onClick={addToCart}
                  >
                    <img
                      src={CartImage}
                      alt="Carrinho"
                      className="cursor-pointer w-4 h-4"
                    />
                    COMPRAR
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="hidden lg:flex flex-col justify-between flex-1 space-y-4 ">
            <div className="flex flex-col gap-4 md:flex-row md:justify-between mb-0">
              <div>
                <div>
                  <span className="font-bold text-[32px]">
                    SKU {product.id}
                  </span>
                  <div className="flex flex-col gap-1 text-[#CFC248] text-[27px] font-bold">
                    {"★".repeat(Math.ceil(product.rating?.rate || 0)) +
                      "☆".repeat(5 - Math.ceil(product.rating?.rate || 0))}
                    <span className="text-black text-[13px]">
                      {product.rating?.rate || "-"} (
                      {product.rating?.count || 0} comentarios)
                    </span>
                  </div>
                </div>
                <div className="flex flex-col mt-10">
                  <span className="uppercase text-[32px] font-bold">
                    Categoria
                  </span>
                  <span className="text-2xl uppercase">{product.category}</span>
                </div>
              </div>

              {hasDiscount ? (
                <div className="rounded-[20px] p-6 pb-4 shadow-xl flex flex-col gap-2 relative max-w-sm mt-10">
                  <span className="text-4xl font-bold line-through">
                    DE: {(product.price * 1.1).toFixed(2).replace(".", ",")}
                  </span>
                  <span className="flex text-5xl font-bold">
                    <span>POR: R$</span>
                    <span className="font-normal">
                      {product.price.toFixed(2).replace(".", ",")}
                    </span>
                  </span>
                  <button
                    className="bg-[#0B1A8E] flex items-center justify-center gap-1 text-white px-4 py-2 rounded-[10px] font-bold h-[55px] text-2xl cursor-pointer"
                    onClick={addToCart}
                  >
                    <img
                      src={CartImage}
                      alt="Carrinho"
                      className="cursor-pointer w-6 h-6"
                    />
                    COMPRAR
                  </button>
                  <span className="absolute top-[-10px] right-[-10px] bg-[#5062F0] w-[91px] h-[77px] text-white text-xs px-2 py-1 rounded-full shadow">
                    <div className="flex flex-col items-center text-2xl font-bold">
                      <span>10%</span>
                      <span>OFF</span>
                    </div>
                  </span>
                </div>
              ) : (
                <div className="rounded-[10px] p-6 shadow-lg flex flex-col items-center min-w-[220px] min-h-[160px] bg-white mt-10">
                  <span className="text-base font-medium w-full text-left mb-[-8px]">
                    R$
                  </span>
                  <span className="text-[64px] font-normal leading-none mb-4">
                    {product.price.toFixed(2).replace(".", ",")}
                  </span>
                  <button
                    className="bg-[#0B1A8E] flex items-center justify-center gap-2 text-white px-4 py-2 rounded font-bold text-xl w-full cursor-pointer"
                    onClick={addToCart}
                  >
                    <img
                      src={CartImage}
                      alt="Carrinho"
                      className="cursor-pointer w-6 h-6"
                    />
                    COMPRAR
                  </button>
                </div>
              )}
            </div>

            <div className="">
              <h2 className="font-bold text-[32px]">Descrição</h2>
              <p className="bg-[#D9D9D9] p-4 rounded-[20px] text-xs font-bold ">
                {product.description}
              </p>
            </div>
          </div>
          <div className="lg:hidden flex justify-between mt-4">
            <div>
              <span className="font-bold text-2xl">SKU {product.id}</span>
              <div className="flex flex-col gap-1 text-[#CFC248] text-[27px] font-bold">
                {"★".repeat(Math.ceil(product.rating?.rate || 0)) +
                  "☆".repeat(5 - Math.ceil(product.rating?.rate || 0))}
                <span className="text-black text-[13px]">
                  {product.rating?.rate || "-"} ({product.rating?.count || 0}{" "}
                  comentarios)
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="uppercase text-[32px] font-bold">Categoria</span>
              <span className="text-2xl uppercase">{product.category}</span>
            </div>
          </div>
          <div className="lg:hidden">
            <h2 className="font-bold text-2xl">Descrição</h2>
            <p className="bg-[#D9D9D9] p-4 rounded-[20px] text-xs font-bold ">
              {product.description}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
