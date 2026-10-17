import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <section className="flex flex-col items-center py-20 text-center">
      <p className="text-6xl font-bold text-[#0d8b67]">404</p>
      <p className="mt-4 text-lg text-[#1d2321]">Страница не найдена</p>
      <Link
        to="/"
        className="mt-6 rounded-2xl bg-[#0d8b67] px-6 py-3 font-semibold text-white transition hover:bg-[#0b7153]"
      >
        На главную
      </Link>
    </section>
  );
};
