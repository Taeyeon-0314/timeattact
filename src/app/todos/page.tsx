"use client";

import { Todo } from "@/types/Todo";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";

export default function TodosPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  useEffect(() => {
    const getTodos = async () => {
      const res = await axios.get("http://localhost:4000/todos");
      setTodos(res.data);
    };
    getTodos();
  }, []);

  const addTodo = async (e: FormEvent) => {
    e.preventDefault();
    const todo: Todo = {
      title,
      contents,
      isDone: false,
    };
    const res = await axios.post("http://localhost:4000/todos", todo);
    setTodos([...todos, res.data]);
    setTitle("");
    setContents("");
  };

  const deleteTodo = async (id: string | undefined) => {
    await axios.delete(`http://localhost:4000/todos/${id}`);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const updateTodo = async (id: string | undefined) => {
    const updateTodo = todos.find((todo) => todo.id === id);
    const todo = { ...updateTodo, isDone: !updateTodo?.isDone };
    await axios.patch(`http://localhost:4000/todos/${id}`, todo);
    setTodos(todos.map((todo) => (todo.id === id ? updateTodo : todo)));
  };

  return (
    <>
      <div>
        <form onSubmit={addTodo}>
          제목 :
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          내용 :{" "}
          <input
            type="text"
            value={contents}
            onChange={(e) => setContents(e.target.value)}
          />
          <button>추가하기</button>
        </form>
      </div>
      <div>
        <div>Working</div>
        {todos
          .filter((todo) => !todo.isDone)
          .map((todo) => (
            <div key={todo.id}>
              <div>{todo.title}</div>
              <div>{todo.contents}</div>
              <button onClick={() => deleteTodo(todo.id)}>삭제하기</button>
              <button onClick={() => updateTodo(todo.id)}>
                {todo.isDone ? "취소" : "확인"}
              </button>
            </div>
          ))}
        <div>Done</div>
        {todos
          .filter((todo) => todo.isDone)
          .map((todo) => (
            <div key={todo.id}>
              <div>{todo.title}</div>
              <div>{todo.contents}</div>
              <button onClick={() => deleteTodo(todo.id)}>삭제하기</button>
              <button onClick={() => updateTodo(todo.id)}>
                {todo.isDone ? "취소" : "확인"}
              </button>
            </div>
          ))}
      </div>
    </>
  );
}
