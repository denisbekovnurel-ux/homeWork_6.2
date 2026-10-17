import { useAddToCart } from "../model/cart-queries.js";

export function AddToCartButton({ productId }) {
  const { mutate: addToCart, isPending } = useAddToCart();

  return (
    <button
      type="button"
      onClick={() => addToCart({ productId })}
      disabled={isPending}
      className="rounded-full bg-[#0d8b67] px-6 py-3 font-semibold text-white disabled:opacity-50"
    >
      {isPending ? "Добавление..." : "В корзину"}
    </button>
  );
}
