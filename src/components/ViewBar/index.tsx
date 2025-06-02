import {FaThList, FaThLarge} from "react-icons/fa";

type ViewBarProps = {
  viewMode: "list" | "grid";
  setViewMode: (mode: "list" | "grid") => void;
  itemsPerPage: number;
  setItemsPerPage: (count: number) => void;
};

const ViewBar = ({
  viewMode,
  setViewMode,
  itemsPerPage,
  setItemsPerPage,
}: ViewBarProps) => {
  return (
    <div className="bg-[#F2F3F8] px-4 py-2 flex items-center justify-end text-sm gap-[43px]">
      <div className="flex items-center gap-2">
        <span>Exibir</span>
        <select
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
          className="border border-[#F2F3F8 ] rounded px-2 py-1 text-sm focus:outline-none cursor-pointer"
        >
          {[5, 10, 15, 20].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
        <span className="hidden sm:block">por vez</span>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => setViewMode("list")}
          className={`text-xl cursor-pointer ${
            viewMode === "list" ? "text-[#5062F0]" : "text-gray-400"
          }`}
        >
          <FaThList />
        </button>
        <button
          onClick={() => setViewMode("grid")}
          className={`text-xl cursor-pointer ${
            viewMode === "grid" ? "text-[#5062F0]" : "text-gray-400"
          }`}
        >
          <FaThLarge />
        </button>
      </div>
    </div>
  );
};

export default ViewBar;
