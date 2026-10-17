import { Heart } from "lucide-react";
import {
  useAddToFavorite,
  useRemoveFromFavorite,
} from "../model/favorites-queries.js";

export function FavoriteButton({ productId, isFavorite }) {
  const { mutate: addToFavorite, isPending: isAdding } = useAddToFavorite();
  const { mutate: removeFromFavorite, isPending: isRemoving } =
    useRemoveFromFavorite();

  const isPending = isAdding || isRemoving;

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isFavorite) {
      removeFromFavorite(productId);
    } else {
      addToFavorite(productId);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      aria-label={isFavorite ? "Убрать из избранного" : "Добавить в избранное"}
      className="rounded-full p-1 transition hover:bg-gray-100 disabled:opacity-50"
    >
      <Heart
        size={22}
        className={isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"}
      />
    </button>
  );
}
