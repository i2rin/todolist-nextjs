import { Task } from './types';

export const formatDate =(date: Date | string ): string => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
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


//ここからtaskを取得して表示する
export const getAllTodos = async (): Promise<Task[]> => {
    const jsonData = await fetch('http://localhost:3001/tasks', {
        cache: "no-store",
    });
    const res: Task[] = await jsonData.json();

    const formattedTasks = res.map(task => ({
        ...task,
        date: formatDate(task.date),
        format: task.format
    }));
    return formattedTasks;
}

export const addTodo = async (todo:Task): Promise<Task[]> => {
    const jsonData = await fetch(`http://localhost:3001/tasks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
    });
    const res = jsonData.json();

    return res;
}


export const editTodo = async (id: string, newText: string, newDate: string, newTime: string, newFormat: string): Promise<Task[]> => { const jsonData = await fetch(`http://localhost:3001/tasks/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
            text: newText, 
            date: newDate,
            time: newTime,
            format: newFormat
            // dateTimeStr: newDateTimeStr,
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

export const sortTasksByDate = (tasks: Task[]) => {
    return tasks.sort((taskA, taskB) => {
        const dateA = new Date(taskA.date).getTime();
        const dateB = new Date(taskB.date).getTime();

        return dateA - dateB; // 昇順にソート
    });
};

