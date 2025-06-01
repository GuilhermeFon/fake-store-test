import {useMemo} from "react";
import type {Product} from "../../types/Product";

type MensCarouselProps = {
  products: Product[];
};

const MensCarousel = ({products}: MensCarouselProps) => {
  const mensProducts = useMemo(
    () => products.filter((item) => item.category === "men's clothing"),
    [products]
  );

  return (
    <section className="bg-white p-3 shadow-md">
      <h5 className="text-[#0B1A8E] font-bold mb-3 place-self-start">
        MEN'S CLOTHING
      </h5>
      <div
        className="container mx-auto justify-between flex overflow-x-auto scrollbar-hide"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {mensProducts.map((item, index) => {
          const discountPrice = (item.price * 0.9).toFixed(2).replace(".", ",");
          return (
            <div key={index} className="text-center p-3 rounded">
              <div className="flex">
                <div className="border border-[#0B1A8E] w-[101px] h-[108px] rounded-2xl content-center place-items-center">
                  <img src={item.image} alt="" className="max-h-[91px]" />
                </div>
                <div className="flex flex-col items-end justify-between self-end ml-[14px] h-[108px]">
                  <div className="bg-[#5062F0] text-white w-[43px] h-[36px] rounded-full content-center justify-items-center justify-self-end">
                    <div className="flex flex-col max-w-[25px] max-h-[27px] text-xs font-bold">
                      <span>10%</span>
                      <span>OFF</span>
                    </div>
                  </div>
                  <div>
                    <p className="font-bold text-lg line-through">
                      DE: R${" "}
                      <span className="font-normal">
                        {item.price.toFixed(2).replace(".", ",")}
                      </span>
                    </p>
                    <p className="font-bold text-lg">
                      POR: R${" "}
                      <span className="font-normal">{discountPrice}</span>
                    </p>
                  </div>
                </div>
              </div>
              <button className="bg-[#0B1A8E] w-full h-[22px] text-white mt-[15px] rounded-2xl p-0 font-bold cursor-pointer">
                COMPRAR
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default MensCarousel;
