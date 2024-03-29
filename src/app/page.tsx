"use client";
import AddTask from '../app/components/AddTask'; 
import TodoList from '../app/components/TodoList';
import { getAllTodos, sortTasksByDate } from "../app/pages/api";

export default async function Home() {
    const tasks = await getAllTodos();
    const sortTasks = sortTasksByDate(tasks); 
    console.log(tasks);

    return (
        <main className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-200">
            <h1 className = "text-4xl font-bold text-gray-700 my-4">
                Todo List
            </h1>
            <div className = "w-full max-w-xl t-5">
                <div className = "w-full px-8 py-6 bg-white shadow-md rounded-lg ">
                      <AddTask />
                      <TodoList tasks = {sortTasks} />
                </div>
            </div>
      </main>
      );
  }


