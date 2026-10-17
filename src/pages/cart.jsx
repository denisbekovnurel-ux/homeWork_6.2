import { CartView, useCartStore, useClearCart } from "../modules/Cart";
import { OrderForm, useCreateOrder } from "../modules/Orders";

// Cart и Orders не знают друг о друге — связываем их здесь.
export const Cart = () => {
  const { data, isLoading } = useCartStore();
  const { mutateAsync: clearCartSilently } = useClearCart({ silent: true });
  const { mutate: createOrder, isPending } = useCreateOrder({
    onCreated: async () => {
      try {
        await clearCartSilently();
      } catch (error) {
        console.error("Не удалось очистить корзину!", error);
      }
    },
  });

  if (isLoading) return <progress />;

  const items = data?.items ?? [];

  const handleOrder = (formValues) => {
    createOrder({
      ...formValues,
      items: items.map((i) => ({
        productId: i.product._id,
        quantity: i.quantity,
        price: i.product.price,
      })),
    });
  };

  return (
    <CartView items={items}>
      <OrderForm onSubmit={handleOrder} isPending={isPending} />
    </CartView>
  );
};
