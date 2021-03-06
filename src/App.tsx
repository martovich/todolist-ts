import React, {useState} from 'react';
import './App.css';
import {Todolist, TaskType} from "./Todolist";
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

export type FilterValuesType = "all" | "completed" | "active";

type TodolistType = {
    id: string
    title: string
    filter: string
}

type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    let todolistId1 = v1();
    let todolistId2 = v1();
    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: "What to lern", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]);
    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true},
        ]
    });
    // let [tasks, setTasks] = useState([
    //     {id: v1(), title: "HTML&CSS", isDone: true},
    //     {id: v1(), title: "JS", isDone: true},
    //     {id: v1(), title: "ReactJS", isDone: false},
    //     {id: v1(), title: "Rest API", isDone: true},
    //     {id: v1(), title: "GraphQL", isDone: false}
    // ])
    //  let [filter, setFilter] = useState<FilterValuesType>("all");

    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId);
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists]);
        }
    }

    function removeTask(id: string, todolistId: string) {
        let todoListTasks = tasks[todolistId];
        tasks[todolistId] = todoListTasks.filter(t => t.id != id);
        setTasks({...tasks});
    }

    function addTask(title: string, todolistId: string) {
        let task = {id: v1(), title: title, isDone: false};
        let todoListTasks = tasks[todolistId];
        tasks[todolistId] = [task, ...todoListTasks];
        setTasks({...tasks});
    }

    function changeTaskStatus(id: string, isDone: boolean, todolistId: string) {
        let todoListTasks = tasks[todolistId];
        let task = todoListTasks.find(t => t.id === id);
        if (task) {
            task.isDone = isDone;
            setTasks({...tasks});
        }
    }

    function removeTodolist(id: string) {
        setTodolists(todolists.filter(tl => tl.id != id));
        delete tasks[id];
        setTasks({...tasks});
    }

    function addTodoList(title: string) {
        let newTodoListId = v1();
        let newTodoList: TodolistType = {id: newTodoListId, title: title, filter: 'all'}
        setTodolists([newTodoList, ...todolists]);
        setTasks({
            ...tasks,
            [newTodoListId]: []
        })
    }

    function changeTaskTitle(id: string, title: string, todolistId: string) {
        let todoListTasks = tasks[todolistId];
        let task = todoListTasks.find(t => t.id === id);
        if (task) {
            task.title = title;
            setTasks({...tasks});
        }
    }

    function changeTodolistTitle(newTitle: string, todolistId: string) {
        let todolist = todolists.find(t => t.id === todolistId);
        if (todolist) {
            todolist.title = newTitle;
            setTodolists([...todolists]);
        }
    }

    return (
        <div className="App">
            <AppBar position={"static"}>
                <Toolbar>
                    <IconButton edge={"start"} color={"inherit"} aria-label={"menu"}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={"h6"}>
                        News
                    </Typography>
                    <Button color={"inherit"}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container  style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={10}>
                    {
                        todolists.map(tl => {
                            let allTodolistTasks = tasks[tl.id];
                            let tasksForTodoList = allTodolistTasks;

                            if (tl.filter === "active") {
                                tasksForTodoList = allTodolistTasks.filter(t => !t.isDone);
                            }
                            if (tl.filter === "completed") {
                                tasksForTodoList = allTodolistTasks.filter(t => t.isDone);
                            }
                            return <Grid item>
                                <Paper style={{padding: "10px"}} elevation={3}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodoList}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeTaskStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}/>
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default App;
