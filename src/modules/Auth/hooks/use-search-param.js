import { useSearchParams } from "react-router-dom";

export const useSearchParam = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const get = (key) => searchParams.get(key);

  const set = (key, value) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set(key, value);
      return params;
    });
  };

  const remove = (key) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.delete(key);
      return params;
    });
  };

  return {
    get,
    set,
    remove,
  };
};
