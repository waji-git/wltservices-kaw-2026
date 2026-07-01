
// "use client";

// import { useRouter } from "next/navigation";
// import { FormEvent, useState } from "react";

// export default function LoginPage() {
//   const router = useRouter();

//   // State management for form inputs and API feedback
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleLogin = async (e: FormEvent) => {
//     e.preventDefault();
//     setError(null);
//     setIsLoading(true);

//     try {
//       const response = await fetch("/api/auth/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ username, password }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || "Something went wrong.");
//       }

//       // If login is successful, route to dashboard
//       router.push("/dashboard");
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
//       {/* Logo Section */}
//       <div className="mb-8 flex items-center space-x-3">
//         <div className="flex h-12 w-12 items-center justify-center border bg-white p-1">
//           <div className="flex space-x-1">
//             <div className="h-8 w-2 -skew-x-12 bg-cyan-400"></div>
//             <div className="h-8 w-2 -skew-x-12 bg-blue-600"></div>
//             <div className="h-8 w-2 -skew-x-12 bg-green-400"></div>
//           </div>
//         </div>
//         <h1 className="text-3xl font-bold text-blue-800">WLTSERVICES</h1>
//       </div>

//       {/* Login Card */}
//       <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
//         <h2 className="mb-2 text-2xl font-bold text-gray-900">Login</h2>
//         <p className="mb-6 text-sm font-medium text-gray-500">
//           Please enter your username and password to login your account.
//         </p>

//         {/* Error Alert Display */}
//         {error && (
//           <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm font-medium text-red-600 border border-red-200">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleLogin} className="space-y-5">
//           <div>
//             <label className="mb-1 block text-sm font-semibold text-gray-800">
//               Username
//             </label>
//             <input
//               type="text"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               placeholder=""
//               required
//               disabled={isLoading}
//               className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100"
//             />
//           </div>

//           <div>
//             <label className="mb-1 block text-sm font-semibold text-gray-800">
//               Password
//             </label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               autoComplete="new-password"
//               required
//               disabled={isLoading}
//               className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100"
//             />
//           </div>
//           <button
//             type="submit"
//             disabled={isLoading}
//             className="mt-4 w-full rounded-lg bg-blue-500 py-3 font-semibold text-white transition hover:bg-blue-600 disabled:bg-blue-400 flex items-center justify-center"
//           >
//             {isLoading ? (
//               <span className="flex items-center space-x-2">
//                 {/* Simple loading spinner */}
//                 <svg
//                   className="animate-spin h-5 w-5 text-white"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                 >
//                   <circle
//                     className="opacity-25"
//                     cx="12"
//                     cy="12"
//                     r="10"
//                     stroke="currentColor"
//                     strokeWidth="4"
//                   />
//                   <path
//                     className="opacity-75"
//                     fill="currentColor"
//                     d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                   />
//                 </svg>
//                 <span>Verifying...</span>
//               </span>
//             ) : (
//               "Login"
//             )}
//           </button>
//         </form>

//         <div className="mt-6 text-center">
//           <a
//             href="#"
//             className="text-sm font-medium text-gray-400 hover:text-gray-600"
//           >
//             Forget your password?
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

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
    <div
      style={{
        maxWidth: "400px",
        margin: "50px auto",
        padding: "30px",
        border: "1px solid #e0e0e0",
        borderRadius: "12px",
        fontFamily: "sans-serif",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      }}
    >
      <h2
        style={{ marginBottom: "10px", fontSize: "24px", fontWeight: "bold" }}
      >
        {isRegister ? "Create an account" : "Login to your account"}
      </h2>
      <p style={{ color: "#666", fontSize: "14px", marginBottom: "24px" }}>
        {isRegister
          ? "Enter your details below to sign up"
          : "Enter your email below to login to your account"}
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
              placeholder="John Doe"
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
              >
                Forgot your password?
              </a>
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
            backgroundColor: "#10b981",
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
            Don@app have an account?{" "}
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
          </>
        )}
      </div>
    </div>
  );
}