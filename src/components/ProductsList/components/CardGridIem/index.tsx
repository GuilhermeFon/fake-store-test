import type {Product} from "../../../../types/Product";
import CartImage from "../../../../assets/images/cart.png";

type CardGridItemProps = {
  product: Product;
};

const CardGridItem = ({product}: CardGridItemProps) => {
  const {image, title, category, price, description} = product;
  return (
    <div className="bg-white shadow-md rounded-sm flex flex-col overflow-hidden w-full max-w-xs">
      <img src={image} alt={title} className="w-full h-40 object-contain p-3" />
      <div className="p-3 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold">{title}</h3>
          <p className="text-xs text-[#7A7A7A] uppercase">{category}</p>
        </div>

        <div className="mt-2 mb-2">
          <div className="flex items-baseline gap-1">
            <span className="text-[40px] font-bold">R$</span>
            <span className="text-[40px]">
              {price.toFixed(2).replace(".", ",")}
            </span>
          </div>
          <p className="text-xs text-[#434141] mt-1 line-clamp-2">
            {description}
          </p>
        </div>
      </div>

      <div className="bg-[#0B1A8E] text-white text-center py-2 cursor-pointer">
        <button className="text-lg cursor-pointer">
          <img src={CartImage} alt="Ícone de carrinho" />
        </button>
      </div>
    </div>
  );
};

export default CardGridItem;
