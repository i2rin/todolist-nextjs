"use client"; import{ Task } from '../pages/types';
import React, { useEffect, useRef, useState } from 'react';
import { deleteTodo, editTodo } from '../pages/api';

interface TodoProps {
    task: Task;
}
//Date オブジェクトを YYYY-MM-DD 形式の文字列に変換
export const formatDate = (date : Date | string) : string => { 
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

export const formatTime = (time: string) : string => {
    if (!time) return '';

    const t = new Date(time);
    let hours = '' + t.getHours();
    let minutes = '' + t.getMinutes();

    if (hours.length < 2) hours = '0' + hours;
    if (minutes.length < 2) minutes = '0' + minutes;
    return `${hours}:${minutes}`;
};
 
const formatDateOnly = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
}
const Todo = ({ task }: TodoProps) => {
   
    const refInputTitle = useRef<HTMLInputElement>(null);
    const refInputDate = useRef<HTMLInputElement>(null);
    const refInputTime = useRef<HTMLInputElement>(null);

    const [isEditing, setIsEditing] = useState(false);
    const [editedTaskTitle, setEditedTaskTitle] = useState(task.text);
    const [editedTaskDate, setEditedTaskDate] = useState(formatDateOnly(task.date));
    const [editedTaskTime, setEditedTaskTime] = useState(formatTime(task.time));
    //const [editedTaskTime, setEditedTaskTime] = useState(task.time);

    useEffect(() => {
        if (isEditing) 
        {
            refInputTitle.current?.focus();
        }
    }, [isEditing]);

    const handleEdit = async() => {
        setIsEditing(true);
        setEditedTaskTitle(task.text);
        setEditedTaskDate(task.date);
        //setEditedTaskTime(formatTime(task.time));
        setEditedTaskTime(task.time);
    };


    const handleSave = async () => {
        const dateStr = formatDateOnly(editedTaskDate);
        const timeStr = formatTime(editedTaskTime);
        //const dateTimeStr = `${dateSrt}T${timeStr}`;
        //await editTodo(task.id, editedTaskTitle, dateTimeStr);
        await editTodo(task.id, editedTaskTitle, dateStr, timeStr);
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
               <React.Fragment>
                   <input 
                        ref = {refInputTitle}
                        type="text" 
                        value = {editedTaskTitle}
                        onChange = {
                            (e: React.ChangeEvent<HTMLInputElement>) => setEditedTaskTitle(e.target.value)
                        }
                        style = {{ width: '150px' ,borderRadius: '10px' }}  
                   />
                   <input 
                        ref = {refInputDate}
                        type="date" 
                        //value = {formatDate(editedTaskDate)}
                        value = {editedTaskDate.toString()}
                        onChange = {
                            //(e: React.ChangeEvent<HTMLInputElement>) => setEditedTaskDate(e.target.value ? new Date(e.target.value) : new Date())
                            (e: React.ChangeEvent<HTMLInputElement>) => setEditedTaskDate(e.target.value)
                        }
                        className = "mr-2 py-1 px-2 rounded border-gray-400 border"
                        style = {{ width: '150px' }}
                   /> 
                   <input
                        ref = {refInputTime}
                        type="time" 
                        //value={formatTime(editedTaskTime)}
                        value={editedTaskTime} 
                        onChange={
                            (e: React.ChangeEvent<HTMLInputElement>) => setEditedTaskTime(e.target.value)
                        }
                        className = "mr-2 py-1 px-2 rounded border-gray-400 border"
                        style={{ width: '150px' }}
                   />
                </React.Fragment>
                ) : (
                <React.Fragment>
                   <span>{task.text}</span>
                   <span>{formatDateOnly(task.date)}</span>
                   <span>{task.time}</span>
                </React.Fragment>   
            )}
            <div className = "flex">
                {isEditing ? (
                    <button 
                        className="text-white bg-blue-300 p-2 mr-2 border border-blue-500 rounded"
                        onClick={handleSave}
                    >
                        save
                    </button>
                ) : (
                    <button 
                        className="text-green-500 border border-green-500 rounded p-2"
                        onClick={handleEdit}
                    >
                        edit
                    </button>
                )}
                <button 
                    className="text-red-500 border border-red-500 rounded p-2 mr-2"
                    onClick={handleDelete}
                >
                    delete
                </button>
            </div> 
      </li> 
    );
};

export default Todo;
