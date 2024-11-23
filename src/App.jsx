import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { toast, ToastContainer } from "react-toastify";
import Register from "./pages/Signup";
import Login from "./pages/Login";
import { useQuery, useQueryClient } from "react-query";
import React, { useEffect } from "react";

const App = () => {
  const queryClient = useQueryClient();
  const fetchUser = async () => {
    return queryClient.getQueryData("user");
  };
  const { data: user } = useQuery("user", fetchUser, {
    staleTime: Infinity,
  });
  useEffect(() => {
    const cached = localStorage.getItem("dvfirst");
    if (!cached) {
      toast.info(
        "For First time it might take longer to register/login ,since this website deployed on free vercel services, sometimes it might take 50seconds to perform backend operation for First time. "
      );
    }
  }, []);
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={user ? <Dashboard /> : <Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
