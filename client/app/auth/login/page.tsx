"use client";
import { useState } from "react";
import Link from "next/link";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [user, setUser] = useState("");
  async function Login(e: any) {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3333/api/v1/auth/login`, {
        method: "POST",
        body: JSON.stringify({ username, password, email }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      console.log("login page", response);
      if (response.ok) {
        response.json().then((user) => {
          console.log("this is login page", user);
          setUser(user);
        });
      } else {
        alert("Wrong credentials");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <h2>Login Page</h2>
      <form onSubmit={Login}>
        <input
          type="text"
          value={username}
          placeholder="name"
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
        <button type="submit">Login</button>
      </form>

      <div>
        <p>
          Not a member? <Link href="/auth/register">Register</Link>
        </p>
      </div>
    </div>
  );
}
