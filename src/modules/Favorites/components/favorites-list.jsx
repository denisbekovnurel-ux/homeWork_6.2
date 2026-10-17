import { useFavoritesStore } from "../model/favorites-queries.js";

export function FavoritesList() {
  const { data, isLoading } = useFavoritesStore();

  if (isLoading) return <progress />;

  return (
    <>
      <h1 className="text-4xl font-bold">Favorites</h1>

      <ul>
        {data?.map((item) => (
          <li key={item._id}>{item.name}</li>
        ))}
      </ul>
    </>
  );
}
