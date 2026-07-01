// "use client";

// import { useState } from "react";

// export default function AuthForm() {
//   // Toggle between 'login' and 'register'
//   const [isRegister, setIsRegister] = useState(false);

//   // Form States
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setMessage("");

//     // Determine the endpoint and payload based on mode
//     const endpoint = isRegister ? "/api/auth/register" : "/api/auth/login";
//     const payload = isRegister
//       ? { name, email, password }
//       : { username: email, password }; // Using email as username based on your UI

//     try {
//       const response = await fetch(endpoint, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         setMessage(`${isRegister ? "Registration" : "Login"} successful!`);
//       } else {
//         setMessage(data.message || "Something went wrong.");
//       }
//     } catch (error) {
//       setMessage("Failed to connect to the server.");
//     }
//   };

//   return (
//     <div
//       style={{
//         maxWidth: "400px",
//         margin: "50px auto",
//         padding: "30px",
//         border: "1px solid #e0e0e0",
//         borderRadius: "12px",
//         fontFamily: "sans-serif",
//         boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
//       }}
//     >
//       <h2
//         style={{ marginBottom: "10px", fontSize: "24px", fontWeight: "bold" }}
//       >
//         {isRegister ? "Create an account" : "Login to your account"}
//       </h2>
//       <p style={{ color: "#666", fontSize: "14px", marginBottom: "24px" }}>
//         {isRegister
//           ? "Enter your details below to sign up"
//           : "Enter your email below to login to your account"}
//       </p>

//       <form
//         onSubmit={handleSubmit}
//         style={{ display: "flex", flexDirection: "column", gap: "16px" }}
//       >
//         {/* Dynamic Input: ONLY shows when Register is clicked */}
//         {isRegister && (
//           <div>
//             <label
//               style={{
//                 display: "block",
//                 marginBottom: "6px",
//                 fontWeight: "6px",
//                 fontSize: "14px",
//               }}
//             >
//               Name
//             </label>
//             <input
//               type="text"
//               placeholder="John Doe"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//               style={{
//                 width: "100%",
//                 padding: "10px",
//                 borderRadius: "6px",
//                 border: "1px solid #ccc",
//                 boxSizing: "border-box",
//               }}
//             />
//           </div>
//         )}

//         <div>
//           <label
//             style={{
//               display: "block",
//               marginBottom: "6px",
//               fontWeight: "6px",
//               fontSize: "14px",
//             }}
//           >
//             Email
//           </label>
//           <input
//             type="email"
//             placeholder="john.doe@email.com"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             style={{
//               width: "100%",
//               padding: "10px",
//               borderRadius: "6px",
//               border: "1px solid #ccc",
//               boxSizing: "border-box",
//             }}
//           />
//         </div>

//         <div>
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               marginBottom: "6px",
//             }}
//           >
//             <label style={{ fontWeight: "6px", fontSize: "14px" }}>
//               Password
//             </label>
//             {!isRegister && (
//               <a
//                 href="#"
//                 style={{
//                   fontSize: "12px",
//                   color: "#666",
//                   textDecoration: "none",
//                 }}
//               >
//                 Forgot your password?
//               </a>
//             )}
//           </div>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             style={{
//               width: "100%",
//               padding: "10px",
//               borderRadius: "6px",
//               border: "1px solid #ccc",
//               boxSizing: "border-box",
//             }}
//           />
//         </div>

//         <button
//           type="submit"
//           style={{
//             width: "100%",
//             padding: "12px",
//             backgroundColor: "#10b981",
//             color: "white",
//             border: "none",
//             borderRadius: "6px",
//             fontSize: "16px",
//             cursor: "pointer",
//             fontWeight: "bold",
//             marginTop: "10px",
//           }}
//         >
//           {isRegister ? "Register" : "Login"}
//         </button>
//       </form>

//       {message && (
//         <p
//           style={{
//             textAlign: "center",
//             marginTop: "15px",
//             fontSize: "14px",
//             color: message.includes("successful") ? "green" : "red",
//           }}
//         >
//           {message}
//         </p>
//       )}

//       {/* Toggle Link Footer */}
//       <div
//         style={{
//           textAlign: "center",
//           marginTop: "20px",
//           fontSize: "14px",
//           color: "#666",
//         }}
//       >
//         {isRegister ? (
//           <>
//             Already have an account?{" "}
//             <span
//               onClick={() => setIsRegister(false)}
//               style={{
//                 color: "#10b981",
//                 cursor: "pointer",
//                 textDecoration: "underline",
//               }}
//             >
//               Login
//             </span>
//           </>
//         ) : (
//           <>
//             Don@apost have an account?{" "}
//             <span
//               onClick={() => setIsRegister(true)}
//               style={{
//                 color: "#10b981",
//                 cursor: "pointer",
//                 textDecoration: "underline",
//               }}
//             >
//               Register
//             </span>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }
