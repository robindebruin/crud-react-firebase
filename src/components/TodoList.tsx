import React, { useEffect, useState, FC } from "react";
import { db } from "../Firebase";

type Todo = { title: string };
type TodoList = Array<Todo>;

const TodoList: FC = () => {
  const [todos, setTodos] = useState<TodoList>([]);

  useEffect(() => {
    async function fetchTodos() {
      const ref = await db.collection("todo").get();
      ref.forEach((doc) => {
        setTodos((todos) => [...(todos as TodoList), doc.data() as Todo]);
      });
    }
    fetchTodos();
  }, []);

  return (
    <div>
      <ul>
        {todos?.map((todo) => (
          <li>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
