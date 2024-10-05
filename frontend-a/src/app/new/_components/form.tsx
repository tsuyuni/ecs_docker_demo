"use client";

import { createTodo } from "@/actions/todos";
import handleRevalidatePath from "@/app/hooks/revalidatePath";
import { useRouter } from "next/navigation";
import { useState } from "react";

const NewTodoForm = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await createTodo(title);
        handleRevalidatePath("/");
        router.replace("/");
        router.refresh();
      }}
    >
      <input
        type="text"
        placeholder="New todo"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default NewTodoForm;
