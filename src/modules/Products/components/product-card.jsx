import { Link } from "react-router-dom";

// favoriteSlot — сюда страница вставляет кнопку из другого модуля (Favorites).
// Products ничего не знает про избранное.
export function ProductCard({ product, favoriteSlot }) {
  return (
    <li className="relative">
      <Link
        to={`/products/${product._id}`}
        className="block h-full rounded-2xl border border-[#dfe9e2] bg-white p-4 pr-12 shadow-sm transition hover:shadow-md"
      >
        <h3 className="font-semibold text-[#1d2321]">{product.name}</h3>
        <p className="mt-2 font-semibold text-[#0d8b67]">{product.price} сом</p>
      </Link>

      {favoriteSlot && (
        <div className="absolute right-3 top-3 flex">{favoriteSlot}</div>
      )}
    </li>
  );
}
