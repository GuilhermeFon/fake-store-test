import type {Product} from "../../../../types/Product";
import CartImage from "../../../../assets/images/cart.png";

type CardListItemProps = {
  product: Product;
};

const CardListItem = ({product}: CardListItemProps) => {
  const {image, title, category, price, description} = product;
  return (
    <div className="bg-white shadow-xl flex overflow-hidden w-full">
      <img
        src={image}
        alt={title}
        className="w-[127px] h-[138px] object-contain self-center ml-[14px]"
      />
      <div className="flex-1 justify-items-start p-4 text-start">
        <h3 className="font-bold">{title}</h3>
        <p className="text-xs text-[#7A7A7A] uppercase font-bold">{category}</p>
        <div className="flex items-baseline gap-2 mt-2 mb-1">
          <span className="text-[40px] font-bold">R$</span>
          <span className="text-[40px]">
            {price.toFixed(2).replace(".", ",")}
          </span>
        </div>
        <p className="text-xs text-[#434141] line-clamp-2 font-bold text-start">
          {description}
        </p>
      </div>
      <div className="w-12 bg-[#0B1A8E] text-white flex items-center justify-center cursor-pointer">
        <button className="text-xl cursor-pointer">
          <img src={CartImage} alt="Ícone de carrinho" />
        </button>
      </div>
    </div>
  );
};

export default CardListItem;
