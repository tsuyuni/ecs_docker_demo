import { fetchTodos } from "@/actions/todos";

const Home = async () => {
  const todos = await fetchTodos();

  return (
    <main>
      {todos.map((todo) => {
        return <p key={todo.id}>{todo.title}</p>;
      })}
    </main>
  );
};

export default Home;
