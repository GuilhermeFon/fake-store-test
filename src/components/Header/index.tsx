import SearchImage from "../../assets/images/search.png";
import CartImage from "../../assets/images/cart.png";

export function Header() {
  return (
    <header className="w-full border-b border-divider bg-[#5062F0] z-50">
      <div className="container mx-auto flex justify-between items-center py-[14px] px-2 h-[60px]">
        <div className="text-white font-bold text-[32px]">Bloom Store</div>
        <form className="flex mx-auto w-1/2 max-w-xl">
          <div className="relative w-full">
            <input
              type="search"
              placeholder="Pesquisar aqui..."
              className="pl-9 h-8 rounded-[16px] border border-gray-200 bg-white w-full"
            />
            <img
              src={SearchImage}
              alt="Ícone de pesquisa"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
            />
          </div>
        </form>
        <a href="#" className="text-white flex items-center">
          <img src={CartImage} alt="Ícone de carrinho" />
        </a>
      </div>
    </header>
  );
}
