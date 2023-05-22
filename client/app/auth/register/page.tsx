"use client"
import { useState } from "react";
export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  
  async function Register(e:any) {
    e.preventDefault();
    console.log("register");
    const response = await fetch(`http://localhost:3333/api/v1/auth/register`, {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const responseData = await response.json();
    console.log("response",response,"data",responseData)

    if (responseData == "User already exists.") {
      alert(`User already exists`);
    } else if (response.ok) {
      alert("Registeration successful.You can login now.");
    } else {
      alert("Registeration failed.Try again later.");
    }
  }

  return (
    <main>
      <h2> Register Page</h2>
      <form onSubmit={Register}>
        <input
          type="text"
          value={username}
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="email"
          value={email}
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
    </main>
  );
}
