import axios, { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { toast } from "react-toastify";

const api = axios.create({
  baseURL: import.meta.env.VITE_API,
  withCredentials: true,
});

const errorMessage = (err) => {
  if (err instanceof AxiosError && err.response) {
    const message = err.response.data?.message;
    return message instanceof Array
      ? err.response.data?.message.json(", ")
      : message || "Something went wrong !";
  }
  if (err instanceof Error) {
    return err.message || "Some error has occured !";
  }
  return "An unknown error occured !";
};

//USER APIs
export const useRegister = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (data) => api.post("/user/register", data).then((res) => res.data),
    {
      onSuccess: (data) => {
        queryClient.setQueryData("user", data);
        toast.success("Registered Successfully !");
      },
      onError: (err) => {
        toast.error(errorMessage(err));
      },
    }
  );
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (data) => api.post("/user/login", data).then((res) => res.data),
    {
      onSuccess: (data) => {
        queryClient.setQueryData("user", data);
        toast.success("Login Successfully !");
      },
      onError: (err) => {
        toast.error(errorMessage(err));
      },
    }
  );
};
export const useUserLogOut = () => {
  const queryClient = useQueryClient();
  return useQuery(["userLogoutRes"], () => api.get("/api/logoutUser"), {
    enabled: false,
    refetchOnWindowFocus: false,
    onSuccess: () => {
      queryClient.invalidateQueries("user");
      queryClient.setQueryData("user", undefined);
      queryClient.invalidateQueries("user");
    },
  });
};
