import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { $authApi } from "../../../shared/api/http.js";
import { queryKeys } from "../../../shared/api/query-keys.js";

export const useOrdersStore = () =>
  useQuery({
    queryKey: queryKeys.orders,
    queryFn: async () => {
      const { data } = await $authApi.get("/orders");
      return data?.data;
    },
  });

// onCreated — колбэк от страницы: что сделать после создания заказа
// (например, очистить корзину). Orders сам про корзину ничего не знает.
export const useCreateOrder = ({ onCreated } = {}) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (payload) => {
      const { data } = await $authApi.post("/orders", payload);
      return data;
    },
    onSuccess: async (data) => {
      await onCreated?.(data);
      queryClient.invalidateQueries({ queryKey: queryKeys.orders });
      toast.success("Заказ успешно оформлен");
      navigate("/orders");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Не удалось оформить заказ",
      );
    },
  });
};
