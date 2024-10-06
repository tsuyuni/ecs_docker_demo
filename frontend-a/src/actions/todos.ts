"use server";

import { TodoController } from "@backend/controllers/todo";
import { cookies } from "next/headers";

export const fetchTodos: TodoController["getAll"] = async () => {
  const res = await fetch("http://backend:8080/todo", {
    cache: "no-cache",
    headers: {
      Cookie: cookies().toString(),
    },
  });
  const data = await res.json();
  return data;
};

export const createTodo = async (title: string) => {
  const res = await fetch("http://backend:8080/todo", {
    method: "POST",
    body: JSON.stringify({ title }),
    headers: {
      "Content-Type": "application/json",
      Cookie: cookies().toString(),
    },
  });
  console.log(res);
  const data = await res.json();
  return data;
};
