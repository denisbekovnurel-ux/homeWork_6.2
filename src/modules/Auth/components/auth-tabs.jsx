import { Link } from "react-router-dom";
import { useSearchParam } from "../hooks/use-search-param.js";

const tabs = [
  { step: "login", label: "Войти" },
  { step: "register", label: "Регистрация" },
];

export function AuthTabs() {
  const { get } = useSearchParam();
  const currentStep = get("step") || "login";

  return (
    <div className="mb-6 grid grid-cols-2 gap-2 rounded-2xl bg-[#f3f7f5] p-1">
      {tabs.map(({ step, label }) => (
        <Link
          key={step}
          to={`/auth?step=${step}`}
          className={`rounded-xl px-4 py-2 text-center text-sm font-semibold transition ${
            currentStep === step
              ? "bg-[#0d8b67] text-white"
              : "text-[#30413d] hover:bg-white"
          }`}
        >
          {label}
        </Link>
      ))}
    </div>
  );
}
