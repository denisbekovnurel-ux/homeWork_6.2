import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { $authApi } from "../../../shared/api/http.js";
import { queryKeys } from "../../../shared/api/query-keys.js";

const favoriteUrl = (productId) => `/favorites/${productId}`;

export const useFavoritesStore = () =>
  useQuery({
    queryKey: queryKeys.favorites,
    queryFn: async () => {
      const { data } = await $authApi.get("/favorites");
      return data?.data?.products;
    },
  });

const handleFavoriteError = (error) => {
  if (error?.response?.status === 401) {
    alert("Пожалуйста, войдите в систему или зарегистрируйтесь");
    return;
  }
  toast.error(
    error?.response?.data?.message || "Что-то пошло не так, попробуй ещё раз",
  );
};

export const useAddToFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId) => {
      const { data } = await $authApi.post("/favorites", { productId });
      return data;
    },
    onSuccess: () => {
      // products нужен, чтобы у карточек обновилось сердечко
      queryClient.invalidateQueries({ queryKey: queryKeys.products });
      queryClient.invalidateQueries({ queryKey: queryKeys.favorites });
    },
    onError: handleFavoriteError,
  });
};

export const useRemoveFromFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId) => {
      const { data } = await $authApi.delete(favoriteUrl(productId));
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products });
      queryClient.invalidateQueries({ queryKey: queryKeys.favorites });
    },
    onError: handleFavoriteError,
  });
};
