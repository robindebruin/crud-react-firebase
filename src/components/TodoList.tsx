import React, { useEffect, useState, FC } from "react";
import { db } from "../Firebase";
import NewTodo from "./NewTodo";
import EditTodo from "./EditTodo";

type Todo = {
  title: string;
  id: string;
};
type TodoList = Array<Todo>;

const TodoList: FC = () => {
  const [todos, setTodos] = useState<TodoList>([]);
  const [editId, setEditId] = useState<string>();

  useEffect(() => {
    const ref = db.collection("todos");
    const unsubscribe = ref.onSnapshot(onCollectionUpdate);
    return () => {
      unsubscribe();
    };
  }, []);

  const onCollectionUpdate = (querySnapshot: firebase.firestore.QuerySnapshot): void => {
    setTodos([]);
    querySnapshot.forEach((doc: firebase.firestore.DocumentSnapshot) => {
      const data = doc.data();
      setTodos((todos) => [...todos, { title: data?.title, id: doc.id }]);
    });
  };

  const handleDelete = (id: string): void => {
    db.collection("todos").doc(id).delete();
  };

  const handleEdit = (id: string): void => {
    id === editId ? closeEdit() : setEditId(id);
  };

  const closeEdit = (): void => {
    setEditId("");
  };

  const TodoItem = (todo) => {
    if (editId === todo.id) return <EditTodo value={todo} closeEdit={closeEdit} />;

    return (
      <li onClick={() => handleEdit(todo.id)}>
        {todo.title} <button onClick={() => handleDelete(todo.id)}>x</button>
      </li>
    );
  };

  return (
    <div>
      <ul>{todos?.map((todo) => TodoItem(todo))}</ul>
      <NewTodo />
    </div>
  );
};

export default TodoList;
