import React, { useState, FC } from "react";
import { db } from "../Firebase";

const NewTodo: FC = () => {
  const [formState, setFormState] = useState("");
  const ref = db.collection("todos");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    ref
      .add({ title: formState })
      .then(function () {
        console.log("Document successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  };

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setFormState(event.currentTarget.value);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <input type="text" placeholder="new todo" onChange={handleChange} value={formState} />
    </form>
  );
};

export default NewTodo;
