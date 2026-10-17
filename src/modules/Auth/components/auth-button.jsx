import { Link } from "react-router-dom";
import { LogOut, User } from "lucide-react";
import { useAuth } from "../model/use-auth.js";
import { useLogoutMutation } from "../model/auth-mutations.js";

export function AuthButton() {
  const isAuth = useAuth((state) => state.isAuth);
  const { mutate, isPending } = useLogoutMutation();

  if (isAuth) {
    return (
      <button
        type="button"
        onClick={() => mutate()}
        disabled={isPending}
        className="flex items-center gap-1 disabled:opacity-60"
      >
        <LogOut size={20} />
        Выйти
      </button>
    );
  }

  return (
    <Link to="/auth" className="flex items-center gap-1">
      <User size={20} />
      Войти
    </Link>
  );
}
