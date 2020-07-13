import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from 'uuid';

export type FilterValuesType = "all" | "completed" | "active";

function App() {
    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: true},
        {id: v1(), title: "GraphQL", isDone: false}
    ])
    let [filter, setFilter] = useState<FilterValuesType>("all");

    let tasksForTodoList = tasks;

    if (filter === "active") {
        tasksForTodoList = tasks.filter(t => !t.isDone);
    }
    if (filter === "completed") {
        tasksForTodoList = tasks.filter(t => t.isDone);
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    function removeTask(id: string) {
        let filterTasks = tasks.filter(t => t.id != id);
        setTasks(filterTasks);
    }

    function addTask(title: string) {
        let task = {id: v1(), title: title, isDone: false};
        let newTasks = [task, ...tasks];
        setTasks(newTasks);
    }

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasksForTodoList}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}/>
        </div>
    );
}

export default App;
