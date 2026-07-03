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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    // Determine the endpoint and payload based on mode
    const endpoint = isRegister ? "/api/auth/register" : "/api/auth/login";

    // Pass standard keys expected by backend API
    const payload = isRegister
      ? { name, email, password }
      : { email, password };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`${isRegister ? "Registration" : "Login"} successful!`);

        // Redirect to dashboard if login was successful
        if (!isRegister) {
          router.push("/dashboard");
        } else {
          // If they just registered, switch them to the login screen automatically
          setIsRegister(false);
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
        <div className="flex h-12 w-12 items-center justify-center border bg-white p-1">
          <div className="flex space-x-1">
            <div className="h-8 w-2 -skew-x-12 bg-cyan-400"></div>
            <div className="h-8 w-2 -skew-x-12 bg-blue-600"></div>
            <div className="h-8 w-2 -skew-x-12 bg-green-400"></div>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-blue-800">WLTSERVICES</h1>
      </div>

      {/* Auth Card - Now properly nested inside the main container */}
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
          {isRegister ? "Create an account" : "Login "}
        </h2>
        <p style={{ color: "#666", fontSize: "14px", marginBottom: "24px" }}>
          {isRegister ? "Enter your details below to sign up" : ""}
          Please enter your email and password to login your account.
        </p>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "16px" }}
        >
          {/* Dynamic Input: ONLY shows when Register is clicked */}
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
                Name
              </label>
              <input
                type="text"
                placeholder=""
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
          )}

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
              placeholder="john.doe@email.com"
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
              {!isRegister && (
                <a
                  href="#"
                  style={{
                    fontSize: "12px",
                    color: "#666",
                    textDecoration: "none",
                  }}
                ></a>
              )}
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
                  color: "#33333",
                  // backgroundColor: "#0070f3",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >Login
                {/* <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors">
                  Login
                </button> */}
              </span>
            </>
          ) : (
            <>
              Don&apos; t have an account?{" "}
              <span
                onClick={() => setIsRegister(true)}
                style={{
                  color: "#10b981",
                  // color: "#0070f3",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                Register
              </span>
              <div>
                {" "}
                <Link href="/forgot-password">
                  <span style={{ fontSize: "14px", fontWeight: "lighter" }}>
                    Forgot your password?
                  </span>
                </Link>
                <div className="w-full block">
                  <div className="mt-8 flex items-center justify-center gap-1.5">
                    <span className="font-normal text-sm text-gray-500">
                      Powered by
                    </span>

                    <div className="h-4 w-2 -skew-x-12 bg-cyan-400"></div>
                    <div className="h-4 w-2 -skew-x-12 bg-blue-600"></div>
                    <div className="h-4 w-2 -skew-x-12 bg-green-400"></div>

                    <h1 className="text-2xl font-bold text-blue-800">
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
