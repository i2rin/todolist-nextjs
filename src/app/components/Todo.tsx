"use client";
import{ Task } from '../pages/types';
import React, { useEffect, useRef, useState } from 'react';
import { deleteTodo, editTodo } from '../pages/api';


interface TodoProps {
    task: Task;
}

const Todo = ({ task }: TodoProps) => {
    const ref = useRef<HTMLInputElement>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedTaskTitle, setEditedTaskTitle] = useState(task.text);

    useEffect(() => {
        if (isEditing) 
        {
            ref.current?.focus();
        }
    }, [isEditing]);

    const handleEdit = async() => {
        setIsEditing(true);
    };

    const handleSave= async() => {
        await editTodo(task.id, editedTaskTitle);
        setIsEditing(false);
    };

    const handleDelete = async() => {
        await deleteTodo(task.id);
        setIsEditing(false);
    };

 return (
   <li 
        key = {task.id} 
        className = "flex justify-between p-4 bg-white border-1-4 border-blue-500 rounded-shadow"
    >
        {isEditing ? (
            <input 
                ref = {ref}
                type="text" 
                value = {editedTaskTitle}
                onChange = {
                (e: React.ChangeEvent<HTMLInputElement>) => setEditedTaskTitle(e.target.value)
                }
                className = "mr-2 py-1 px-2 rounded border-gray-400 border"/>
            ) : (
            <React.Fragment key = {task.id}>
            <span>{task.text}</span>
            <span>{new Date(task.date).toLocaleString()}</span>
         </React.Fragment>   
        )}

     <div>
       {isEditing ? (
      <button className = "text-white bg-blue-300 p-2 mr-2 border border-blue-500 rounded " onClick={handleSave}>
        save
        </button > 
        ) : (
        <button className="text-green-500 border border-green-500 rounded rounded p-2" onClick={handleEdit}>
        edit
        </button>
        )}  
         <button className = "text-red-500 border border-red-500 rounded p-2 mr-2" onClick = {handleDelete}>
            delete
        </button>
        </div>
 
   </li> 
  )
}

export default Todo;