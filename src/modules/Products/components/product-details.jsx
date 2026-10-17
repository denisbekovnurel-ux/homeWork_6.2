import { Link } from "react-router-dom";
import { useProduct } from "../model/products-queries.js";

// actions — слот для кнопок из других модулей (например, "В корзину").
export function ProductDetails({ productId, actions }) {
  const { data, isLoading } = useProduct(productId);

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <progress className="w-40" />
      </div>
    );
  }

  return (
    <section className="py-8">
      <Link
        to="/"
        className="text-sm font-medium text-[#0d8b67] hover:text-[#0b7153]"
      >
        ← Назад к товарам
      </Link>

      <div className="mt-4 rounded-[28px] border border-[#dfe9e2] bg-white p-6 shadow-[0_20px_50px_rgba(22,52,41,0.08)] sm:p-8">
        <h1 className="text-3xl font-bold text-[#1d2321]">{data?.name}</h1>
        <p className="mt-2 text-[#6b7a75]">{data?.description}</p>
        <p className="mt-6 text-2xl font-semibold text-[#0d8b67]">
          {data?.price} сом
        </p>

        {actions && <div className="mt-6 flex">{actions}</div>}
      </div>
    </section>
  );
}
