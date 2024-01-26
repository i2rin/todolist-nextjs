import AddTask from '../app/components/AddTask'; 
import TodoList from '../app/components/TodoList';
import { formatDate, getAllTodos } from "../app/pages/api";

export default async function Home() {
  const tasks = await getAllTodos();
  console.log(tasks);

  //const getDatesFromTasks = async (): Promise<string[]> => {
  //    const tasks = await getAllTodos();
  //    return tasks.map(task => {
  //        const formattedDate = formatDate(task.date);
  //        // "YYYY-MM-DD" 形式の文字列から "年/月/日" 形式に変換
  //        return formattedDate.replace(/-/g, '/');
  //    });
  //}

    return (
    <main className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-200">
     <h1 className = "text-4xl font-bold text-gray-700 my-4">
        Todo List
      </h1>
      <div className = "w-full max-w-xl mt-5">
       <div className = "w-full px-8 py-6 bg-white shadow-md rounded-lg ">
       <AddTask />
       <TodoList tasks = {tasks} />
       </div>
      </div>
    </main>
    );
}


