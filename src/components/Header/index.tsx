import {useState, useEffect} from "react";
import SearchImage from "../../assets/images/search.png";
import CartImage from "../../assets/images/cart.png";

type HeaderProps = {
  onSearch?: (term: string) => void;
  onCartClick?: () => void;
};

const Header = ({onSearch, onCartClick}: HeaderProps) => {
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!onSearch) return;
    const handler = setTimeout(() => {
      onSearch(search);
    }, 2000);
    return () => clearTimeout(handler);
  }, [search, onSearch]);

  return (
    <header className="w-full border-b border-divider bg-[#5062F0] z-50">
      <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row md:justify-between md:items-center gap-3 md:gap-0">
        <div className="flex items-center justify-between w-full md:w-auto">
          <a href="/" className="font-bold text-2xl sm:text-[32px]">
            <h1 className="text-white">Bloom Store</h1>
          </a>
          <button
            type="button"
            onClick={onCartClick}
            className="md:hidden block text-white cursor-pointer"
          >
            <img src={CartImage} alt="Carrinho" className="w-6 h-6" />
          </button>
        </div>

        {onSearch && (
          <form
            className="w-full md:w-1/2 max-w-xl"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="relative w-full">
              <input
                type="search"
                placeholder="Pesquisar aqui..."
                className="pl-9 h-9 rounded-full border border-gray-200 bg-white w-full text-xs"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <img
                src={SearchImage}
                alt="Ícone de pesquisa"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
              />
            </div>
          </form>
        )}

        <button
          type="button"
          onClick={onCartClick}
          className="hidden md:flex items-center text-white cursor-pointer"
        >
          <img src={CartImage} alt="Carrinho" className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
};

export default Header;
