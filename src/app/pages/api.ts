import { Task } from './types';

export const getAllTodos = async (): Promise<Task[]> => {

    const jsonData = await fetch('http://localhost:3001/tasks', {
        cache: "no-store",
    });
    const res = jsonData.json();

    return res;
}

export const addTodo = async (todo:Task): Promise<Task[]> => {
    const jsonData = await fetch(`http://localhost:3001/tasks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            text: todo.text,
            date: todo.date, // 変換された日時データ
            time: todo.time, 
        })
    });
    const res = jsonData.json();

    return res;
}


export const editTodo = async (todo:Task): Promise<Task[]> => {
    const jsonData = await fetch(`http://localhost:3001/tasks/${todo.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
            text: todo.text, 
            date: todo.date,
            time: todo.time,  
       }) // 日付をISO文字列に変換
    });
    const res = jsonData.json();

    return res;
}

export const deleteTodo = async (id: string): Promise<Task[]> => {
    const jsonData = await fetch(`http://localhost:3001/tasks/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const res = jsonData.json();

    return res;
}