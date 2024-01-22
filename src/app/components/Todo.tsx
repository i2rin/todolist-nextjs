"use client"; import{ Task } from '../pages/types';
import React, { useEffect, useRef, useState } from 'react';
import { deleteTodo, editTodo } from '../pages/api';



interface TodoProps {
    task: Task;
}

const formatTime = (date: Date | string) : string => {
    if (!date) return '';

    const d = new Date(date);
    let hours = '' + d.getHours();
    let minutes = '' + d.getMinutes();

    if (hours.length < 2) hours = '0' + hours;
    if (minutes.length < 2) minutes = '0' + minutes;
    return `${hours}:${minutes}`;
};

// Date オブジェクトを YYYY-MM-DD 形式の文字列に変換
const formatDate = (date : Date | string) : string => { 
    if (!date) return '' 
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
};


const Todo = ({ task }: TodoProps) => {
    const ref = useRef<HTMLInputElement>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedTaskTitle, setEditedTaskTitle] = useState(task.text);
    const [editedTaskDate, setEditedTaskDate] = useState(formatDate(task.date));
    const [editedTaskTime, setEditedTaskTime] = useState(formatTime(task.date));

    useEffect(() => {
        if (isEditing) 
        {
            ref.current?.focus();
        }
    }, [isEditing]);

    const handleEdit = async() => {
        setIsEditing(true);
        setEditedTaskTitle(task.text);
        setEditedTaskDate(formatDate(task.date));
        setEditedTaskTime(formatTime(task.date));
    };

    const handleSave = async () => {
        await editTodo(task.id, editedTaskTitle, editedTaskDate, editedTaskTime);
        setIsEditing(false);
    };

    const handleDelete = async() => {
        await deleteTodo(task.id);
        setIsEditing(false);
    };
    


    return (
      <li className = "flex justify-between p-4 bg-white border-1-4 border-blue-500 rounded-shadow">
           {isEditing ? (
               <React.Fragment>
                   <input 
                       ref = {ref}
                       type="text" 
                       value = {editedTaskTitle}
                       onChange = {
                           (e) => setEditedTaskTitle(e.target.value)
                       }
                       style = {{ width: '150px' ,borderRadius: '10px' }}  
                   />
                   <input 
                       type="date" 
                       value = {formatDate(editedTaskDate)}
                       onChange = {
                       (e) => setEditedTaskDate(e.target.value)}
                       className = "mr-2 py-1 px-2 rounded border-gray-400 border"
                       style = {{ width: '150px' }}
                   /> 
                   <input
                       type="time" 
                       value={formatTime(editedTaskTime)}
                       onChange={(e) => setEditedTaskTime(e.target.value)}
                       className="..."
                   />


               </React.Fragment>
               ) : (
               <React.Fragment>
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
