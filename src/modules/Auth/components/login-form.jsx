import { Link } from "react-router-dom";
import { useState } from "react";
import { useLoginMutation } from "../model/auth-mutations.js";
import { AuthTabs } from "./auth-tabs.jsx";

export function LoginForm() {
  const [loginOrEmail, setLoginOrEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate, isPending } = useLoginMutation();

  const handleSubmit = (e) => {
    e.preventDefault();

    mutate({
      loginOrEmail,
      password,
    });
  };

  return (
    <div className="rounded-[28px] border border-[#dfe9e2] bg-white p-6 shadow-[0_20px_50px_rgba(22,52,41,0.08)] sm:p-8">
      <div className="mb-6 flex items-center justify-between gap-3 border-b border-[#edf2ee] pb-4">
        <div>
          <p className="text-sm font-medium tracking-[0.2em] text-[#6b7a75]">
            Вход
          </p>
          <h2 className="mt-2 text-3xl font-bold text-[#1d2321]">
            Добро пожаловать
          </h2>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eaf7f2] text-2xl text-[#0d8b67]">
          ◈
        </div>
      </div>

      <AuthTabs />

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="login-email"
            className="mb-2 block text-sm font-medium text-[#30413d]"
          >
            Email или логин
          </label>
          <input
            id="login-email"
            type="text"
            placeholder="example@mail.com"
            value={loginOrEmail}
            onChange={(e) => setLoginOrEmail(e.target.value)}
            required
            className="w-full rounded-2xl border border-[#dfe8e3] bg-[#f9fbfa] px-4 py-3 text-base text-[#1d2321] outline-none transition placeholder:text-[#93a19b] focus:border-[#0d8b67] focus:bg-white focus:ring-4 focus:ring-[#0d8b67]/10"
          />
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label
              htmlFor="login-password"
              className="text-sm font-medium text-[#30413d]"
            >
              Пароль
            </label>
            <Link
              to="/auth?step=login"
              className="text-sm font-medium text-[#0d8b67] hover:text-[#0b7153]"
            >
              Забыл пароль?
            </Link>
          </div>
          <input
            id="login-password"
            type="password"
            placeholder="******"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-2xl border border-[#dfe8e3] bg-[#f9fbfa] px-4 py-3 text-base text-[#1d2321] outline-none transition placeholder:text-[#93a19b] focus:border-[#0d8b67] focus:bg-white focus:ring-4 focus:ring-[#0d8b67]/10"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-2xl bg-[#0d8b67] px-4 py-3 text-base font-semibold text-white transition hover:bg-[#0b7153] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Входим..." : "Войти"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-[#6b7a75]">
        Нет аккаунта?{" "}
        <Link
          to="/auth?step=register"
          className="font-semibold text-[#0d8b67] hover:text-[#0b7153]"
        >
          Зарегистрироваться
        </Link>
      </p>
    </div>
  );
}
