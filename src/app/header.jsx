import { Link } from "react-router-dom";
import {
  Menu,
  Search,
  ClipboardList,
  Heart,
  ShoppingCart,
} from "lucide-react";
import { AuthButton } from "../modules/Auth";

export function Header() {
  return (
    <header className="flex items-center gap-6 py-4">
      <Link
        to="/"
        className="flex items-center gap-2 text-2xl font-bold text-emerald-600"
      >
        <div className="grid grid-cols-2 gap-0.5">
          <span className="w-2 h-2 bg-emerald-600 rounded-sm" />
          <span className="w-2 h-2 bg-emerald-600 rounded-sm" />
          <span className="w-2 h-2 bg-emerald-600 rounded-sm" />
          <span className="w-2 h-2 bg-emerald-600 rounded-sm" />
        </div>
        Market
      </Link>

      <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-full">
        <Menu size={18} />
        Каталог
      </button>

      <div className="flex-1 flex items-center gap-2 border border-emerald-600 rounded-full px-4 py-2">
        <Search size={18} className="text-emerald-600" />
        <input
          type="text"
          placeholder="Найти товары"
          className="w-full outline-none bg-transparent"
        />
      </div>

      <AuthButton />

      <Link to="/orders" className="flex items-center gap-1">
        <ClipboardList size={20} />
        Заказы
      </Link>

      <Link to="/favorites" className="flex items-center gap-1">
        <Heart size={20} />
        Избранное
      </Link>

      <Link to="/cart" className="flex items-center gap-1">
        <ShoppingCart size={20} />
        Корзина
      </Link>
    </header>
  );
}
