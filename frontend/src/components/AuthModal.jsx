import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/slices/authSlice";

export default function AuthModal({ isOpen, onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();

  const toggleMode = () => setIsLogin(!isLogin);

  const loginMutation = useMutation({
    mutationFn: (formData) =>
      axios.post(`${import.meta.env.VITE_BASE_URL}/sign-in`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    onSuccess: (data) => {
      dispatch(
        loginSuccess({
          token: data.data.token,
          user: data.data.user,
        })
      );
      toast.success(data.data.message);
      onClose();
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || err.message);
    },
  });

  const registerMutation = useMutation({
    mutationFn: (formData) =>
      axios.post(`${import.meta.env.VITE_BASE_URL}/sign-up`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    onSuccess: (data) => {
      dispatch(
        loginSuccess({
          token: data.data.token,
          user: data.data.user,
        })
      );
      toast.success(data.data.message);
      onClose();
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || err.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    if (isLogin) {
      loginMutation.mutate(formData);
    } else {
      registerMutation.mutate(formData);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="absolute top-0 left-0 w-full h-screen z-50 bg-black/50 backdrop-blur-sm">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl w-[95%] max-w-md p-8 shadow-xl ">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-600 text-xl hover:text-red-500"
        >
          &times;
        </button>

        <h1 className="text-gray-900 text-3xl font-medium text-center">
          {isLogin ? "Login" : "Register"}
        </h1>
        <p className="text-gray-500 text-sm mt-2 text-center">
          {isLogin
            ? "Please sign in to continue"
            : "Create an account to get started"}
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          {!isLogin && (
            <div className="flex items-center border border-gray-300 h-12 rounded-full px-4 gap-2">
              {/* Full Name Field */}
              <svg
                className="text-gray-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="20"
                height="20"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5s-3 1.343-3 3 1.343 3 3 3z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 20c0-2.21 3.582-4 8-4s8 1.79 8 4"
                />
              </svg>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                className="bg-transparent outline-none text-sm w-full"
                required
              />
            </div>
          )}

          <div className="flex items-center border border-gray-300 h-12 rounded-full px-4 gap-2">
            <svg width="20" height="15" viewBox="0 0 16 11" fill="none">
              <path
                fill="#6B7280"
                d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z"
              />
            </svg>
            <input
              type="email"
              name="email"
              placeholder="Email address"
              className="bg-transparent outline-none text-sm w-full"
              required
            />
          </div>

          <div className="flex items-center border border-gray-300 h-12 rounded-full px-4 gap-2">
            <svg width="16" height="20" viewBox="0 0 13 17" fill="none">
              <path
                fill="#6B7280"
                d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z"
              />
            </svg>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="bg-transparent outline-none text-sm w-full"
              required
            />
          </div>

          {isLogin && (
            <div className="text-left text-indigo-500 text-sm">
              <a href="#">Forgot password?</a>
            </div>
          )}

          <button
            type="submit"
            className="w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity"
            disabled={loginMutation.isLoading || registerMutation.isLoading}
          >
            {isLogin
              ? loginMutation.isLoading
                ? "Logging in..."
                : "Login"
              : registerMutation.isLoading
              ? "Registering..."
              : "Register"}
          </button>

          <p className="text-gray-500 text-sm text-center">
            {isLogin ? (
              <>
                Don’t have an account?{" "}
                <button
                  type="button"
                  onClick={toggleMode}
                  className="text-indigo-500"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={toggleMode}
                  className="text-indigo-500"
                >
                  Login
                </button>
              </>
            )}
          </p>
        </form>
      </div>
    </div>
  );
}
