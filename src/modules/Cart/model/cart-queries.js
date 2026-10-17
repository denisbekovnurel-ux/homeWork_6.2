import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { $authApi } from "../../../shared/api/http.js";
import { queryKeys } from "../../../shared/api/query-keys.js";

export const useCartStore = () =>
  useQuery({
    queryKey: queryKeys.cart,
    queryFn: async () => {
      const { data } = await $authApi.get("/cart");
      return data?.data;
    },
  });

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ productId, quantity = 1 }) => {
      const { data } = await $authApi.post("/cart", { productId, quantity });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cart });
      toast.success("Товар добавлен в корзину");
    },
    onError: (error) => {
      if (error?.response?.status === 401) {
        alert("Пожалуйста, войдите в систему или зарегистрируйтесь");
        return;
      }
      toast.error(error?.response?.data?.message || "Что-то пошло не так");
    },
  });
};

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId) => {
      const { data } = await $authApi.delete(`/cart/${productId}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cart });
      toast.success("Товар удалён из корзины");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Не удалось удалить товар",
      );
    },
  });
};

export const useUpdateCartQuantity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ productId, quantity }) => {
      const { data } = await $authApi.patch(`/cart/${productId}`, {
        quantity,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cart });
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Не удалось изменить количество",
      );
    },
  });
};

// silent: true — без тостов (используется после оформления заказа)
export const useClearCart = ({ silent = false } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const { data } = await $authApi.delete("/cart");
      return data;
    },
    onSuccess: () => {
      if (!silent) toast.success("Корзина очищена");
    },
    onError: (error) => {
      if (silent) return;
      toast.error(
        error?.response?.data?.message || "Не удалось очистить корзину",
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cart });
    },
  });
};
