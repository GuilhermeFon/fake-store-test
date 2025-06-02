import React from "react";
import {FiTrash} from "react-icons/fi";
import {useCart} from "../store/cart";

type CartDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

const CartDrawer: React.FC<CartDrawerProps> = ({isOpen, onClose}) => {
  const {items: cartItems, remove} = useCart();
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div
      className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-lg transition-transform z-50 border-l border-gray-300 flex flex-col ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <h2 className="text-[#0B1A8E] text-xl font-bold">Carrinho</h2>
        <button
          onClick={onClose}
          className="text-[#0B1A8E] text-lg cursor-pointer  "
        >
          ✕
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex gap-4 p-3 rounded shadow-sm border border-gray-200"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-16 h-16 object-contain border border-blue-500 rounded"
            />
            <div className="flex-1">
              <p className="text-sm font-semibold leading-tight mb-1">
                {item.title}
              </p>
              {item.originalPrice && (
                <div className="text-xs text-gray-400 line-through">
                  DE: {item.originalPrice.toFixed(2).replace(".", ",")}
                </div>
              )}
              <div className="text-sm">
                POR:{" "}
                <span className="font-bold">
                  {item.price.toFixed(2).replace(".", ",")}
                </span>
              </div>
              <div className="text-sm mt-1">QTDE: {item.quantity}</div>
              <div className="text-sm font-bold">
                Total:{" "}
                {(item.price * item.quantity).toFixed(2).replace(".", ",")}
              </div>
            </div>
            <button
              className="text-gray-500 hover:text-red-500 cursor-pointer"
              onClick={() => remove(item.id)}
            >
              <FiTrash size={18} />
            </button>
          </div>
        ))}
      </div>

      {/* Rodapé */}
      <div className="p-4 border-t bg-white text-right text-lg font-bold">
        Total: R$ {total.toFixed(2).replace(".", ",")}
      </div>
    </div>
  );
};

export default CartDrawer;
