import React, {useState, ChangeEvent, KeyboardEvent} from "react";
import {FilterValuesType, TaskType} from "./App"


type TodoListType = {
    title: string
    tasks: Array<TaskType>
    addTask: (title: string) => void
    removeTask: (taskID: string) => void // (=>) - это ретурн; (void) - не возвращать
    changeFilter: (filterValue: FilterValuesType) => void

}

export function TodoList(props: TodoListType) {
    const [title, setTitle] = useState<string>("")
    const addTask = () => {
        {
            props.addTask(title)
        }
        setTitle("")
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") addTask()
    }


    const onAllClickHandler = () => { props.changeFilter("all") }
    const onActiveClickHandler = () => { props.changeFilter("active") }
    const onCompletedClickHandler = () => { props.changeFilter("completed") }


    return <div className="App">
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    // e.currentTarget === input
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                />
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {
                    props.tasks.map(task => {
                        const removeTask = () => {
                            props.removeTask(task.id)
                        }
                        return (
                            <li /*key={task.id}*/>
                                <input type={"checkbox"} checked={task.isDone}/>
                                <span>{task.title}</span>
                                <button onClick={removeTask}>x</button>
                            </li>
                        )
                    })
                }
                {/*    <li><input type="checkbox" checked={true}/> <span>HTML&CSS</span></li>*/}
                {/*    <li><input type="checkbox" checked={true}/> <span>JS</span></li>*/}
                {/*    <li><input type="checkbox" checked={false}/> <span>React</span></li>*/}
            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    </div>

}


export default TodoList;