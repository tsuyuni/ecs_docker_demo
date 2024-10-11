"use client";

import signIn from "@/utils/cognito/signIn";
import { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await signIn({
          email,
          password,
        });
      }}
    >
      <input
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button type="submit">ログイン</button>
    </form>
  );
};

export default LoginForm;
