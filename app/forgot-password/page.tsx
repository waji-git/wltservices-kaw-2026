"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [employeeNo, setEmployeeNo] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, employeeNo, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Password updated successfully! Redirecting to login...");
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        setMessage(data.message || "Failed to reset password.");
      }
    } catch (error) {
      setMessage("Failed to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      {/* Brand Header */}
      <div className="mb-8 flex items-center space-x-3">
        <h1 className="text-3xl font-bold text-blue-800">WLTSERVICES</h1>
      </div>

      {/* Form Container */}
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
          Reset Password
        </h2>
        <p style={{ color: "#666", fontSize: "14px", marginBottom: "24px" }}>
          Verify your account details to set a new password.
        </p>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "16px" }}
        >
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

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "6px",
                fontWeight: "bold",
                fontSize: "14px",
              }}
            >
              Employee No
            </label>
            <input
              type="text"
              placeholder="e.g. EMP123"
              value={employeeNo}
              onChange={(e) => setEmployeeNo(e.target.value)}
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
            <label
              style={{
                display: "block",
                marginBottom: "6px",
                fontWeight: "bold",
                fontSize: "14px",
              }}
            >
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              autoComplete="new-password"
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
            disabled={loading}
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
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Updating..." : "Reset Password"}
          </button>
        </form>

        {message && (
          <p
            style={{
              textAlign: "center",
              marginTop: "15px",
              fontSize: "14px",
              color: message.toLowerCase().includes("successfully")
                ? "green"
                : "red",
            }}
          >
            {message}
          </p>
        )}

        <div
          style={{ textAlign: "center", marginTop: "20px", fontSize: "14px" }}
        >
          <Link href="/">
            <span
              style={{
                color: "#10b981",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Back to Login
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
