"use client";

import { Amplify } from "aws-amplify";
import { signIn } from "aws-amplify/auth";
import { useState } from "react";

Amplify.configure(
  {
    Auth: {
      Cognito: {
        userPoolId: "ap-northeast-1_TetkZJ1SX",
        userPoolClientId: "4ocbog7c71hmnf9707dgv2bvte",
      },
    },
  },
  {
    ssr: true,
  }
);

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
