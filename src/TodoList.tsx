import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "./reducers/AppWithRedux";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";


type PropsTitleType = {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (taskID: string, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeFilter: (newFilterValue: FilterValuesType, todoListID: string) => void
    addTasks: (taskTitle: string, todoListID: string) => void
    changeStatus: (taskId: string, isDone: boolean, todoListID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
    changeTodoListTitle: (title: string, todoListID: string) => void
}


export function Todolist(props: PropsTitleType) {

    const addTasks = (title: string) => {
        props.addTasks(title, props.id)
    }
    const changeTodolistTitle = (title: string) => {
        props.changeTodoListTitle(title, props.id)
    }
    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);
    const removeTodoList = () => {
        props.removeTodoList(props.id)
    }

    return <div>

        <h3>
            <EditableSpan title={props.title} changeItem={changeTodolistTitle}/>
            <IconButton onClick={removeTodoList}>
                <Delete/>
            </IconButton>

        </h3>
        <AddItemForm addItem={addTasks} title={"Task title"}/>

        <ul style={{listStyle: "none", paddingLeft: "0"}}>
            {
                props.tasks.map(t => {
                    const removeTask = () => {
                        props.removeTask(t.id, props.id)
                    }
                    const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeStatus(t.id, e.currentTarget.checked, props.id)
                    }

                    const changeTitle = (title: string) => {
                        props.changeTaskTitle(t.id, title, props.id)
                    }
// ul style={{listStyle: "none", paddingLeft: "0"}} - Семантичнее но можно и <div>

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox
                            color={"secondary"}
                            checked={t.isDone}
                            onChange={changeStatus}
                        />

                        <EditableSpan title={t.title} changeItem={changeTitle}/>
                        <IconButton onClick={removeTask}>
                            <Delete/>
                        </IconButton>

                    </li>
                })
            }

        </ul>
        <div>
            <Button
                size={"small"}
                color={props.filter === "all" ? "secondary" : "primary"}
                variant={props.filter === "all" ? "outlined" : "contained"}
                //className={props.filter === "all" ? "active-filter" : ""}
                onClick={onAllClickHandler}>All
            </Button>
            <Button
                size={"small"}
                color={props.filter === "active" ? "secondary" : "primary"}
                variant={props.filter === "active" ? "outlined" : "contained"}
                //className={props.filter === "active" ? "active-filter" : ""}
                onClick={onActiveClickHandler}>Active
            </Button>
            <Button
                size={"small"}
                color={props.filter === "completed" ? "secondary" : "primary"}
                variant={props.filter === "completed" ? "outlined" : "contained"}
                //className={props.filter === "completed" ? "active-filter" : ""}
                onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>

}