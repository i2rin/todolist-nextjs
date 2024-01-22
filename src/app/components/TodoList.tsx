import { Task } from "../pages/types";
import Todo from "./Todo";

interface TodoListProps {
    tasks: Task[];
}


export default function TodoList({ tasks }: TodoListProps) {
 return (
    <ul className = "space-y-3">
    {tasks.map((task) => (   
        <Todo key = {task.id} task = {task} />
    ))}
    </ul>
  );
}



