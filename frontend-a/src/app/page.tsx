import { fetchTodos } from "@/actions/todos";
import Link from "next/link";

const Home = async () => {
  const todos = await fetchTodos();

  return (
    <main>
      {todos?.map((todo) => {
        return <p key={todo.id}>{todo.title}</p>;
      })}
      <Link href="/new">新規作成</Link>
    </main>
  );
};

export default Home;
