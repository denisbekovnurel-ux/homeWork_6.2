import { Minus, Plus, Trash2 } from "lucide-react";
import {
  useClearCart,
  useRemoveFromCart,
  useUpdateCartQuantity,
} from "../model/cart-queries.js";

const qtyButtonClass =
  "rounded-full border border-[#dfe9e2] p-1.5 text-[#1d2321] transition hover:bg-[#e8f5ef] disabled:cursor-not-allowed disabled:opacity-40";

// children — слот под списком (страница вставляет сюда форму заказа из модуля Orders).
export function CartView({ items, children }) {
  const { mutate: removeFromCart, isPending: isRemoving } = useRemoveFromCart();
  const { mutate: updateQuantity, isPending: isUpdating } =
    useUpdateCartQuantity();
  const { mutate: clearCart, isPending: isClearing } = useClearCart();

  const total = items.reduce(
    (sum, i) => sum + (i.product?.price ?? 0) * i.quantity,
    0,
  );
  const isBusy = isRemoving || isUpdating || isClearing;

  return (
    <section className="py-8">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-[#1d2321]">Корзина</h1>

        {items.length > 0 && (
          <button
            type="button"
            onClick={() => clearCart()}
            disabled={isBusy}
            className="rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isClearing ? "Очистка..." : "Очистить корзину"}
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <p className="mt-4 text-[#6b7a75]">Корзина пуста</p>
      ) : (
        <>
          <ul className="mt-6 space-y-3">
            {items.map((i) => (
              <li
                key={i.product._id}
                className="flex flex-wrap items-center gap-4 rounded-2xl border border-[#dfe9e2] bg-white p-4"
              >
                {i.product.image ? (
                  <img
                    src={i.product.image}
                    alt={i.product.name}
                    onError={(e) => {
                      e.currentTarget.style.visibility = "hidden";
                    }}
                    className="h-16 w-16 rounded-xl object-cover"
                  />
                ) : (
                  <div className="h-16 w-16 rounded-xl bg-[#e8f5ef]" />
                )}

                <div className="min-w-0 flex-1">
                  <p className="font-semibold">{i.product.name}</p>
                  <p className="text-sm text-[#6b7a75]">
                    {i.product.price} сом
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      updateQuantity({
                        productId: i.product._id,
                        quantity: i.quantity - 1,
                      })
                    }
                    disabled={isBusy || i.quantity <= 1}
                    aria-label="Уменьшить количество"
                    className={qtyButtonClass}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-8 text-center font-semibold">
                    {i.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      updateQuantity({
                        productId: i.product._id,
                        quantity: i.quantity + 1,
                      })
                    }
                    disabled={isBusy}
                    aria-label="Увеличить количество"
                    className={qtyButtonClass}
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <p className="w-32 text-right font-semibold text-[#0d8b67]">
                  {i.product.price * i.quantity} сом
                </p>

                <button
                  type="button"
                  onClick={() => removeFromCart(i.product._id)}
                  disabled={isBusy}
                  aria-label="Удалить из корзины"
                  className="rounded-full p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-500 disabled:opacity-50"
                >
                  <Trash2 size={20} />
                </button>
              </li>
            ))}
          </ul>

          <p className="mt-4 text-right text-xl font-bold">
            Итого: {total} сом
          </p>

          {children}
        </>
      )}
    </section>
  );
}
