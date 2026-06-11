
"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function LoginPage() {
  const router = useRouter();

  // State management for form inputs and API feedback
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong.");
      }

      // If login is successful, route to dashboard
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      {/* Logo Section */}
      <div className="mb-8 flex items-center space-x-3">
        <div className="flex h-12 w-12 items-center justify-center border bg-white p-1">
          <div className="flex space-x-1">
            <div className="h-8 w-2 -skew-x-12 bg-cyan-400"></div>
            <div className="h-8 w-2 -skew-x-12 bg-blue-600"></div>
            <div className="h-8 w-2 -skew-x-12 bg-green-400"></div>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-blue-800">WLTSERVICES</h1>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <h2 className="mb-2 text-2xl font-bold text-gray-900">Login</h2>
        <p className="mb-6 text-sm font-medium text-gray-500">
          Please enter your username and password to login your account.
        </p>

        {/* Error Alert Display */}
        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm font-medium text-red-600 border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="mb-1 block text-sm font-semibold text-gray-800">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder=""
              required
              disabled={isLoading}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-gray-800">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              required
              disabled={isLoading}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="mt-4 w-full rounded-lg bg-blue-500 py-3 font-semibold text-white transition hover:bg-blue-600 disabled:bg-blue-400 flex items-center justify-center"
          >
            {isLoading ? (
              <span className="flex items-center space-x-2">
                {/* Simple loading spinner */}
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>Verifying...</span>
              </span>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <a
            href="#"
            className="text-sm font-medium text-gray-400 hover:text-gray-600"
          >
            Forget your password?
          </a>
        </div>
      </div>
    </div>
  );
}