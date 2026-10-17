import { useOrdersStore } from "../model/orders-queries.js";

export function OrdersList() {
  const { data, isLoading } = useOrdersStore();

  if (isLoading) return <progress />;

  const orders = [...(data ?? [])].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );

  return (
    <section className="py-8">
      <h1 className="text-3xl font-bold text-[#1d2321]">Мои заказы</h1>

      {orders.length === 0 ? (
        <p className="mt-4 text-[#6b7a75]">Заказов пока нет</p>
      ) : (
        <ul className="mt-6 space-y-4">
          {orders.map((order) => (
            <li
              key={order._id}
              className="rounded-2xl border border-[#dfe9e2] bg-white p-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-semibold">Заказ №{order._id}</p>
                <span className="rounded-full bg-[#e8f5ef] px-3 py-1 text-sm text-[#0d8b67]">
                  {order.status}
                </span>
              </div>

              <p className="mt-1 text-sm text-[#6b7a75]">
                {new Date(order.createdAt).toLocaleString("ru-RU")}
              </p>

              <ul className="mt-3 space-y-1 text-sm">
                {order.items?.map((i, idx) => (
                  <li key={idx} className="flex justify-between gap-4">
                    <span>
                      {i.product?.name} × {i.quantity}
                    </span>
                    <span>
                      {(i.price ?? i.product?.price) * i.quantity} сом
                    </span>
                  </li>
                ))}
              </ul>

              {order.deliveryAddress && (
                <p className="mt-3 text-sm text-[#6b7a75]">
                  Адрес: {order.deliveryAddress}
                </p>
              )}
              {order.comment && (
                <p className="text-sm text-[#6b7a75]">
                  Комментарий: {order.comment}
                </p>
              )}

              <p className="mt-3 text-right font-bold">
                Итого: {order.totalPrice} сом
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
