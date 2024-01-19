//import { Task } from "../pages/types";
//import Todo from "./Todo";
//
//interface TodoListProps {
//    tasks: Task[];
//}
//
//
//export default function TodoList({ tasks }: TodoListProps) {
// return (
//    <ul className = "space-y-3">
//    {tasks.map((task) => (   
//        <Todo key = {task.id} task = {task} />
//    ))}
//    </ul>
//  );
//}




//　以下GPT提案
import React from 'react';
import { Task } from "../pages/types";
import Todo from "./Todo";

interface TodoListProps {
    tasks: Task[];
}


export default function TodoList({ tasks }: TodoListProps) {
 return (
    <ul className="space-y-3">
      {tasks.map((task) => (
        <React.Fragment key={task.id}>
          <li style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10pt' }}>
            <span>{task.text}</span>
            <span>{new Date(task.date).toLocaleString()}</span>
          </li>
          <Todo task={task} />
        </React.Fragment>
      ))}
    </ul>
  );
}
