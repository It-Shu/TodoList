import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import {useState} from 'react'
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"

function App() {
    // BLL:
    console.log(v1())
    const array /*[tasks, setTasks]*/ = useState<Array<TaskType>>([ // useState всегда возвр только 2 элемента первым параметром а вторым возвр функц котора следит за первым
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: false},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "TypeScript", isDone: false},
    ])

    const tasks = array[0]
    const setTasks = array[1]


    function removeTask(taskID: string) {
        const newState = tasks.filter(task => task.id !== taskID)
        setTasks(newState)

    }

    function changeFilter(filterValue: FilterValuesType) {
        setFilter(filterValue)
    }

    function addTask(title: string) {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        //tasks.push(newTask)
        setTasks([newTask, ...tasks])
    }
    const [filter, setFilter] = useState<FilterValuesType>("all")

    let tasksForTodoList = tasks
    if (filter === "active") {
        tasksForTodoList = tasks.filter(t => !t.isDone)
    }
    if (filter === "completed") {
        tasksForTodoList = tasks.filter(t => t.isDone)
    }
    //UI:
    return (
        <div className="App">
            <TodoList
                title={"What to learn"}
                tasks={tasksForTodoList}
                addTask={addTask}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;

