import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { ToastContainer } from "react-toastify";
import Register from "./pages/Signup";
import Login from "./pages/Login";
import { useQuery, useQueryClient } from "react-query";
import React from "react";

const App = () => {
  const queryClient = useQueryClient();
  const fetchUser = async () => {
    return queryClient.getQueryData("user");
  };
  const { data: user } = useQuery("user", fetchUser, {
    staleTime: Infinity,
  });
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
