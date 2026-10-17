import { useQuery } from "@tanstack/react-query";
import { $authApi, $mainApi } from "../../../shared/api/http.js";
import { queryKeys } from "../../../shared/api/query-keys.js";

export const useProductStore = () =>
  useQuery({
    queryKey: queryKeys.products,
    queryFn: async () => {
      const { data } = await $authApi.get("/products");
      return data?.data;
    },
  });

export const useProduct = (productId) =>
  useQuery({
    queryKey: queryKeys.product(productId),
    queryFn: async () => {
      const { data } = await $mainApi.get(`/products/${productId}`);
      return data?.data;
    },
  });
