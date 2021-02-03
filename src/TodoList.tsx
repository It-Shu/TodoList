import React, {useState, ChangeEvent, KeyboardEvent} from "react";
import {FilterValuesType, TaskType} from "./App"


export type TodoListType = {
    id: string
    title: string
    tasks: Array<TaskType>
    addTask: (taskTitle: string, todoListId: string) => void
    removeTask: (taskID: string, todoListId: string) => void // (=>) - это ретурн; (void) - не возвращать
    changeFilter: (filterValue: FilterValuesType, todoListId: string) => void
    changeStatus: (id: string, isDone: boolean, todoListId: string) => void
    filter: FilterValuesType
    removeTodoList: (todoListID: string) => void
}

export function TodoList(props: TodoListType) {

    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim() !== "") {
            props.addTask(title, props.id)
            setTitle("")
        } else {
            setError("Title is required")
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => { // e - event
        setTitle(e.currentTarget.value) // currentTarget - ссылка в объекте на инфу об инпуте
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === "Enter") addTask()
    }


    const onAllClickHandler = () => {
        props.changeFilter("all", props.id)
    }
    const onActiveClickHandler = () => {
        props.changeFilter("active", props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter("completed", props.id)
    }


    return <div className="App">
        <div>
            <h3>{props.title}
                <button onClick={() => {
                    props.removeTodoList(props.id)
                }}>X
                </button>
            </h3>
            <div>
                <input
                    value={title}
                    // e.currentTarget === input
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler} // нажатие на клавишу Enter строка 26
                    className={error ? "error" : ""}
                />
                <button onClick={addTask}>+</button>
                {error && <div className={"error-message"}>{error}</div>}
            </div>
            <ul>
                {
                    props.tasks.map(task => {
                        const removeTask = () => {
                            props.removeTask(task.id, props.id)
                        }
                        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                            let newIsDoneValue = e.currentTarget.checked;
                            props.changeStatus(task.id, newIsDoneValue, props.id);
                        }
                        return (
                            <li key={task.id} className={task.isDone ? "is-done" : ""}>
                                <input type={"checkbox"} onChange={changeStatus} checked={task.isDone}/>
                                <span>{task.title}</span>
                                <button onClick={removeTask}>x</button>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button className={props.filter === "all" ? "active-filter" : ""}
                        onClick={onAllClickHandler}>All
                </button>
                <button className={props.filter === "active" ? "active-filter" : ""}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filter === "completed" ? "active-filter" : ""}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    </div>

}


export default TodoList;