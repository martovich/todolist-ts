import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import IconButton from "@material-ui/core/IconButton";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {Button, Checkbox, Grid} from "@material-ui/core";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    filter: string
    removeTodolist: (id: string) => void
    changeTaskTitle: (taskId: string, title: string, todolistId: string) => void
    changeTodolistTitle: (title: string, todolistId: string) => void
}

export function Todolist(props: PropsType) {
    const onAllClickHandler = () => props.changeFilter("all", props.id)
    const onActiveClickHandler = () => props.changeFilter("active", props.id)
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id)
    const onClickHandler = () => props.removeTodolist(props.id);

    const addTask = (title: string) => {
        props.addTask(title, props.id);
    }

    const onChangeTodolistTitleHandler = (newValue: string) => {
        props.changeTodolistTitle(newValue, props.id)
    }
    return (
        <div className="App">
            <div>
                <h3>
                    {/*{props.title}*/}
                    <EditableSpan value={props.title} onChange={ onChangeTodolistTitleHandler } />
                    <IconButton onClick={onClickHandler}>
                        <Delete />
                    </IconButton>
                </h3>
                {/*<div>*/}
                {/*    <input value={title}*/}
                {/*           onChange={onChangeHandler}*/}
                {/*           onKeyPress={onKeyPressHandler}*/}
                {/*           className={error ? "error" : ""}/>*/}
                {/*    <button onClick={addTask}>+</button>*/}
                {/*    {error && <div className="error-message">{error}</div>}*/}
                {/*</div>*/}
                <AddItemForm addItem={addTask} />
                <div>
                    {
                        props.tasks.map(t => {
                                const onClickHandler = () => props.removeTask(t.id, props.id)
                                const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                    let newIsDoneValue = e.currentTarget.checked
                                    props.changeTaskStatus(t.id, newIsDoneValue, props.id)
                                }
                                const onChangeTitleHandler = (newValue: string) => {
                                    props.changeTaskTitle(t.id, newValue, props.id)
                                }
                                return <div key={t.id} className={t.isDone ? "is-done" : ""} >
                                    {/*<input type="checkbox" onChange={onChangeStatusHandler} checked={t.isDone}/>*/}
                                    <Checkbox onChange={onChangeStatusHandler} checked={t.isDone}/>
                                    {/*<span>{t.title}</span>*/}
                                    <EditableSpan value={t.title} onChange={ onChangeTitleHandler }/>
                                    <IconButton onClick={onClickHandler} >
                                        <Delete />
                                    </IconButton>
                                </div>
                            }
                        )
                    }
                </div>
                <div>
                    <Button variant={props.filter === "all" ? "contained" : "text"}
                            onClick={onAllClickHandler}>All
                    </Button>
                    <Button color={"primary"} variant={props.filter === "active" ? "contained" : "text"}
                            onClick={onActiveClickHandler}>Active
                    </Button>
                    <Button color={"secondary"} variant={props.filter === "completed" ? "contained" : "text"}
                            onClick={onCompletedClickHandler}>Completed
                    </Button>
                </div>
            </div>
        </div>
    );
}