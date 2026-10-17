// Ключи React Query в одном месте: модули не должны "угадывать" чужие строки.
export const queryKeys = {
  products: ["products"],
  product: (productId) => ["product", productId],
  cart: ["cart"],
  favorites: ["favorites"],
  orders: ["orders"],
};
