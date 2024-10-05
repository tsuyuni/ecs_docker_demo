"use server";

import { TodoController } from "@backend/controllers/todo";

export const fetchTodos: TodoController["getAll"] = async () => {
  const res = await fetch("http://backend:8080/todo");
  const data = await res.json();
  return data;
};

export const createTodo: TodoController["create"] = async (title: string) => {
  const res = await fetch("http://backend:8080/todo", {
    method: "POST",
    body: JSON.stringify({ title }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
};
