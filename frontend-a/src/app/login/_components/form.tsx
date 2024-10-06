"use client";

import config from "@/config";
import { Amplify } from "aws-amplify";
import { signIn } from "aws-amplify/auth";
import { useState } from "react";

Amplify.configure(config, {
  ssr: true,
});

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        console.log(email, password);
        const signInOutput = await signIn({
          username: email,
          password,
        });
        console.log(signInOutput);
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
      <button type="submit">Login</button>
      <h2>Login</h2>
    </form>
  );
};

export default LoginForm;
