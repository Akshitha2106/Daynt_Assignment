import { useState } from "react";
import { useRouter } from "next/router";
import api from "../utils/api";
import styles from "../styles/Auth.module.css";
const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignup = async () => {
    try {
      const response = await api.post("/signup", { email, password });
      alert(response.data.message);
      router.push("/");
    } catch (error) {
      alert(error.response?.data?.message || "Sign-up failed");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.icon}></div>
        <h1>Sign Up</h1>
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
        <button className={styles.loginButton} onClick={handleSignup}>
          SignUp
        </button>
      </div>
    </div>
  );
};

export default SignupPage;
