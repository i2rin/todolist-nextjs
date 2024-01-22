"use client";
import { addTodo } from "../pages/api";
import React, { ChangeEvent, FormEvent, useState } from 'react';
import {v4 as uuidv4} from "uuid";

const AddTask = () => {
    const [taskTitle, setTaskTitle] = useState("");
    const [deadlineDate, setDeadlineDate] = useState("");
    const [deadlineTime, setDeadlineTime] = useState("");
    
    const handleSubmit = async (e:FormEvent) => {
        e.preventDefault();
        const deadline = new Date(`${deadlineDate}T${deadlineTime}`);
        await addTodo({ id: uuidv4(), text: taskTitle, date: deadline, time: deadlineTime});
        setTaskTitle("");
        setDeadlineDate("");
        setDeadlineTime("");
    };

  return (
    <form className = "mb-4 space-y-3" onSubmit={handleSubmit}>
      <div className = "flex space-x-3">
        <input 
            type = "text"
            className = "flex-1 border px-4 py-2 rounded-lg focus:ourline-none fucus:boder-blue-400" 
            onChange = {(e: ChangeEvent<HTMLInputElement>) => setTaskTitle(e.target.value)}
            value = {taskTitle}
         />
        <input 
            type = "date"
            className = "flex-2 border px-4 py-2 rounded-lg focus:ourline-none fucus:boder-blue-400"
            onChange={(e: ChangeEvent<HTMLInputElement>) => setDeadlineDate(e.target.value)}
            value = {deadlineDate}
        />
        <input
            type = "time"
            className = "flex-1 border px-4 py-2 rounded-lg focus:ourline-none fucus:boder-blue-400"
            onChange={(e: ChangeEvent<HTMLInputElement>) => setDeadlineTime(e.target.value)}
            value = {deadlineTime}
        />
        </div>
        <button className="w-full px-4 py-2 text-white bg-blue-500 rounded transform hover:bg-blue-400 hover:scale-95 duration-200">Add Task</button>
    </form>
  )  
};

export default AddTask;
