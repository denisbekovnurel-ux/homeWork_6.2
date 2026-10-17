import { AuthForm } from "../modules/Auth";

export function Auth() {
  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-[#f3f7f5] px-4 py-10">
      <div className="w-full max-w-md">
        <AuthForm />
      </div>
    </div>
  );
}
