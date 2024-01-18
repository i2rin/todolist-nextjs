"use client";
import { addTodo } from "../pages/api";
import React, { ChangeEvent, FormEvent, useState } from 'react';
import {v4 as uuidv4} from "uuid";

const AddTask = () => {
    const [taskTitle, setTaskTitle] = useState("");
    const [dueDate, setDueDate] = useState(""); // タスクの期限の状態を追加
    
    const handleSubmit = async (e:FormEvent) => {
        e.preventDefault();
        addTodo({ id: uuidv4(), text: taskTitle, dueDate: dueDate  })
          .then(() => {
        setTaskTitle("");
        setDueDate(""); //フォームをリセット
    })
    .catch((err) => {
    console.error(err);
    });
    };

  return (
    <form className = "mb-4 space-y-3" onSubmit={handleSubmit}>
        <input 
            type = "text"
            className = "w-full border px-4 py-2 rounded-lg focus:ourline-none fucus:boder-blue-400" 
            onChange = {(e: ChangeEvent<HTMLInputElement>) => setTaskTitle(e.target.value)}
            value = {taskTitle}
         />
          <input 
              type = "date"
              className = "w-full border px-4 py-2 rounded-lg focus:ourline-none fucus:boder-blue-400" 
              onChange = {(e: ChangeEvent<HTMLInputElement>) => setDueDate(e.target.value)}
              value = {dueDate}
          />
        <button className="w-full px-4 py-2 text-white bg-blue-500 rounded transform hover:bg-blue-400 hover:scale-95 duration-200">Add Task</button>
    </form>
  ); 
};

export default AddTask;
