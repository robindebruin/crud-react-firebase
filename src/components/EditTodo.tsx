import React, { useState, FC } from "react";
import { db } from "../Firebase";

interface TodoProps {
  value: {
    title: string;
    id: string;
  };
  closeEdit: () => void;
}

const EditTodo: FC<TodoProps> = ({ value, closeEdit }) => {
  const [formState, setFormState] = useState(value?.title || "");
  const ref = db.collection("todos");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    ref
      .doc(value.id)
      .update({ title: formState })
      .then(function () {
        console.log("Document successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
    closeEdit();
  };

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setFormState(event.currentTarget.value);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <input type="text" placeholder="new todo" onChange={handleChange} value={formState} />
      <button type="button" onClick={closeEdit}>
        cancel
      </button>
    </form>
  );
};

export default EditTodo;
