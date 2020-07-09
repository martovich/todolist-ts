import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export type FilterValuesType = "all" | "completed" | "active";

function App() {
    let [tasks, setTasks] = useState([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "Rest API", isDone: true},
        {id: 5, title: "GraphQL", isDone: false}
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

    function removeTask(id: number) {
        let filterTasks = tasks.filter(t => t.id != id);
        setTasks(filterTasks);
    }

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasksForTodoList}
                      removeTask={removeTask}
                      changeFilter={changeFilter}/>
        </div>
    );
}

export default App;
