import { Task } from './types';

// Date オブジェクトを YYYY-MM-DD 形式の文字列に変換
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

export const formatTime = (date: Date | string) : string => {
    if (!date) return '';

    const d = new Date(date);
    let hours = '' + d.getHours();
    let minutes = '' + d.getMinutes();

    if (hours.length < 2) hours = '0' + hours;
    if (minutes.length < 2) minutes = '0' + minutes;
    return `${hours}:${minutes}`;
};


export const getAllTodos = async (): Promise<Task[]> => {

    const jsonData = await fetch('http://localhost:3001/tasks', {
        cache: "no-store",
    });
    const res = jsonData.json();

    return res;
}

export const addTodo = async (todo: Task): Promise<Task[]> => {
    const dateTimeString = `${formatDate(todo.date)}T${formatTime(todo.time)}`;
    const jsonData = await fetch(`http://localhost:3001/tasks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            text: todo.text,
            date: dateTimeString, // 変換された日時データ
        })
    });
    const res = jsonData.json();

    return res;
}


export const editTodo = async (id: string, newText: string, dateTimeString: string): Promise<Task[]> => {
    const jsonData = await fetch(`http://localhost:3001/tasks/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
            text: newText, 
            date: dateTimeString, // "YYYY-MM-DDTHH:mm" 形式の日時文字列,
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