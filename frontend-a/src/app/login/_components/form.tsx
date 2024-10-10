"use client";

import { useState } from "react";
import { signIn } from "@utils/cognito/signIn";
import test from "@/utils/cognito/test";

// Amplify.configure(config, {
//   ssr: true,
// });

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();

        // await signIn();
        test();
        // const signInOutput = await signIn({
        //   username: email,
        //   password,
        // });
        // console.log(signInOutput);
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
