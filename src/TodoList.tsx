
import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";


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

    const addTasks = (title: string ) => {
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
            <button onClick={removeTodoList}>X</button>
        </h3>
        <AddItemForm addItem={addTasks}/>

        <ul>
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


                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input
                            type="checkbox"
                            checked={t.isDone}
                            onChange={changeStatus}
                        />
                        <EditableSpan title={t.title} changeItem={changeTitle} />
                        <button
                            onClick={removeTask}
                        >x</button>
                    </li>
                })
            }

        </ul>
        <div>
            <button
                className={props.filter === "all" ? "active-filter" : ""}
                onClick={onAllClickHandler}>All
            </button>
            <button
                className={props.filter === "active" ? "active-filter" : ""}
                onClick={onActiveClickHandler}>Active
            </button>
            <button
                className={props.filter === "completed" ? "active-filter" : ""}
                onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>

}