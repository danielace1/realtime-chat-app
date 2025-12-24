import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router";

import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/useAuthStore.js";
import Chat from "./pages/Chat.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp";
import Loader from "./components/Loader.jsx";

const App = () => {
  const { checkAuth, isCheckingAuth, authUser } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <Loader />;

  return (
    <div className="min-h-screen bg-slate-900 relative flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="absolute top-0 -left-4 size-96 bg-pink-500 opacity-20 blur-[100px]" />
      <div className="absolute bottom-0 -right-4 size-96 bg-cyan-500 opacity-20 blur-[100px]" />

      <Routes>
        <Route
          path="/"
          element={authUser ? <Chat /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!authUser ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUp /> : <Navigate to="/" />}
        />
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;
