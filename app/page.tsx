

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AuthForm() {
  const router = useRouter();

  // Toggle between 'login' and 'register'
  const [isRegister, setIsRegister] = useState(false);

  // Form States
  const [name, setName] = useState("");
  const [email, setEmail] = useState(""); // Track email state for registration
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    const endpoint = isRegister ? "/api/auth/register" : "/api/auth/login";

    // Standardized payloads based on mode
    const payload = isRegister ? { name, email, password } : { name, password };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`${isRegister ? "Registration" : "Login"} successful!`);

        if (!isRegister) {
          router.push("/dashboard");
        } else {
          setIsRegister(false);
          setName("");
          setEmail("");
          setPassword("");
        }
      } else {
        setMessage(data.message || "Something went wrong.");
      }
    } catch (error) {
      setMessage("Failed to connect to the server.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      {/* Logo Section */}
      <div className="mb-8 flex items-center space-x-3">
        <div>
          <div className="flex h-16 w-16 items-center justify-center">
            <svg
              className="h-full w-full"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="28"
                y="10"
                width="12"
                height="42"
                rx="6"
                transform="rotate(25 34 31)"
                fill="#1eaae6"
              />
              <rect
                x="28"
                y="50"
                width="12"
                height="42"
                rx="6"
                transform="rotate(25 34 71)"
                fill="#0051b3"
              />
              <circle cx="62" cy="54" r="5" fill="#4bc449" />
              <rect
                x="68"
                y="42"
                width="12"
                height="48"
                rx="6"
                transform="rotate(25 74 66)"
                fill="#4bc449"
              />
            </svg>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-blue-800">WLTSERVICES</h1>
      </div>

      {/* Auth Card */}
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "30px",
          border: "1px solid #e0e0e0",
          borderRadius: "12px",
          fontFamily: "sans-serif",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          backgroundColor: "white",
        }}
      >
        <h2
          style={{ marginBottom: "10px", fontSize: "24px", fontWeight: "bold" }}
        >
          {isRegister ? "Create an account" : "Login"}
        </h2>
        <p style={{ color: "#666", fontSize: "14px", marginBottom: "24px" }}>
          {isRegister
            ? "Enter your details below to sign up."
            : "Please enter your name and password to access your account."}
        </p>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "16px" }}
        >
          {/* Name Input (Used for both Login and Register) */}
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "6px",
                fontWeight: "bold",
                fontSize: "14px",
              }}
            >
              Name
            </label>
            <input
              type="text"
              placeholder=""
              autoComplete="off"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* Email Input (ONLY shows when Register mode is true) */}
          {isRegister && (
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "6px",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                  boxSizing: "border-box",
                }}
              />
            </div>
          )}

          {/* Password Input */}
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "6px",
              }}
            >
              <label style={{ fontWeight: "bold", fontSize: "14px" }}>
                Password
              </label>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
              // autoComplete={isRegister ? "new-password" : "current-password"}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                boxSizing: "border-box",
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#0070f3",
              color: "white",
              border: "none",
              borderRadius: "6px",
              fontSize: "16px",
              cursor: "pointer",
              fontWeight: "bold",
              marginTop: "10px",
            }}
          >
            {isRegister ? "Register" : "Login"}
          </button>
        </form>

        {message && (
          <p
            style={{
              textAlign: "center",
              marginTop: "15px",
              fontSize: "14px",
              color: message.includes("successful") ? "green" : "red",
            }}
          >
            {message}
          </p>
        )}

        {/* Toggle Link Footer */}
        <div
          style={{
            textAlign: "center",
            marginTop: "20px",
            fontSize: "14px",
            color: "#666",
          }}
        >
          {isRegister ? (
            <>
              Already have an account?{" "}
              <span
                onClick={() => setIsRegister(false)}
                style={{
                  color: "#10b981",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                Login
              </span>
            </>
          ) : (
            <>
              Don&apos;t have an account?{" "}
              <span
                onClick={() => setIsRegister(true)}
                style={{
                  color: "#10b981",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                Register
              </span>
              <div>
                <Link href="/forgot-password">
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: "lighter",
                      display: "inline-block",
                      marginTop: "10px",
                    }}
                  >
                    Forgot your password?
                  </span>
                </Link>
                <div className="w-full block">
                  <div className="mt-8 flex items-center justify-center gap-1.5 ">
                    <span className="font-normal text-sm text-gray-500 ">
                      Powered by
                    </span>

                    <div>
                      <div className="flex h-14 w-12 items-center justify-center">
                        <svg
                          className="h-full w-full"
                          viewBox="0 0 100 100"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            x="28"
                            y="10"
                            width="12"
                            height="42"
                            rx="6"
                            transform="rotate(25 34 31)"
                            fill="#1eaae6"
                          />
                          <rect
                            x="28"
                            y="50"
                            width="12"
                            height="42"
                            rx="6"
                            transform="rotate(25 34 71)"
                            fill="#0051b3"
                          />
                          <circle cx="62" cy="54" r="5" fill="#4bc449" />
                          <rect
                            x="68"
                            y="42"
                            width="12"
                            height="48"
                            rx="6"
                            transform="rotate(25 74 66)"
                            fill="#4bc449"
                          />
                        </svg>
                      </div>
                    </div>

                    <h1 className="text-1xl font-bold text-blue-800">
                      WLTSERVICES
                    </h1>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}