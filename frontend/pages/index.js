import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Auth.module.css";
import api from "../utils/api";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
      router.push("/dashboard");
    }
  }, [router]);

  const handleLogin = async () => {
    try {
      const response = await api.post("/login", { email, password });

      localStorage.setItem("isLoggedIn", "true");
      router.push("/dashboard");
    } catch (error) {
      console.error("Login failed", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  const navigateToSignup = () => {
    router.push("/signup");
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.icon}></div>
        <h1>Login</h1>
        <input
          type="email"
          placeholder="Username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />
        <button className={styles.loginButton} onClick={handleLogin}>
          Login
        </button>
        <p className={styles.signupText}>
          New user?{" "}
          <span className={styles.link} onClick={navigateToSignup}>
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
