import { useSearchParam } from "../hooks/use-search-param.js";
import { LoginForm } from "./login-form.jsx";
import { RegisterForm } from "./register-form.jsx";

export function AuthForm() {
  const { get } = useSearchParam();

  const currentStep = get("step");

  const forms = {
    login: <LoginForm />,
    register: <RegisterForm />,
  };

  return forms[currentStep] ?? forms.login;
}
