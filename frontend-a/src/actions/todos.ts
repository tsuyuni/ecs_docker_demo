"use server";

import { client } from "@utils/client";

export const fetchTodos = async () => {
  const { data } = await client.GET("/todo");
  return data?.items;
};

export const createTodo = async (title: string) => {
  const { data } = await client.POST("/todo", {
    body: {
      title,
    },
  });

  return data?.item;
};
