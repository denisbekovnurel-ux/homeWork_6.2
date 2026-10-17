import { useMutation } from "@tanstack/react-query";
import { $mainApi } from "../../../shared/api/http.js";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "./use-auth.js";

const getErrorMessage = (error) =>
  error?.response?.data?.message || "Что-то пошло не так, попробуй ещё раз";

export const useRegisterMutation = () => {
  const navigate = useNavigate();
  const setAuth = useAuth((state) => state.setAuth);

  return useMutation({
    mutationFn: async (payload) => {
      const { data } = await $mainApi.post("/auth/sign-up", payload);
      return data;
    },
    onSuccess: (respData) => {
      localStorage.setItem("token", respData.accessToken);
      setAuth(true);
      navigate("/");
      toast.success("Successfully registered");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};

export const useLoginMutation = () => {
  const navigate = useNavigate();
  const setAuth = useAuth((state) => state.setAuth);

  return useMutation({
    mutationFn: async (payload) => {
      const { data } = await $mainApi.post("/auth/sign-in", payload);
      return data;
    },
    onSuccess: (respData) => {
      localStorage.setItem("token", respData.accessToken);
      setAuth(true);
      navigate("/");
      toast.success("Successfully logged in");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};

export const useLogoutMutation = () => {
  const navigate = useNavigate();
  const clear = useAuth((state) => state.clear);

  return useMutation({
    mutationFn: async () => {
      await $mainApi.post("/auth/logout");
    },
    onSuccess: () => {
      localStorage.removeItem("token");
      clear();
      navigate("/auth");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};
