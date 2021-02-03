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

type TodoListType = {
    title: string
    id: string
    filter: FilterValuesType
}

type TaskStateType = {
    [/*todoListID*/ key: string]: Array<TaskType>
}

export type FilterValuesType = "all" | "active" | "completed"

function App() {

    // CRUD

    // BLL:
    const todoListID1 = v1()
    const todoListID2 = v1()


    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID1, title: "What to learn", filter: "all"},
        {id: todoListID2, title: "What to buy", filter: "all"}
    ])

    let [tasks, setTasks] = useState<TaskStateType>({ // useState всегда возвр только 2 элемента первым параметром а вторым возвр функц котора следит за первым
        [todoListID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: false},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Redux", isDone: false},
            {id: v1(), title: "TypeScript", isDone: false}
        ],
        [todoListID2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Bread", isDone: true},
            {id: v1(), title: "Salt", isDone: false},
            {id: v1(), title: "Sugar", isDone: false}
        ],

    });


    function removeTask(taskID: string, todoListId: string) {
        const todoListTasks = tasks[todoListId]
        tasks[todoListId] = todoListTasks.filter(t => t.id != taskID);
        setTasks({...tasks})

    }

    function addTask(taskTitle: string, todoListId: string) {
        let task = {id: v1(), title: taskTitle, isDone: false};
        const todoListTasks = tasks[todoListId];
        tasks[todoListId] = [task, ...todoListTasks];
        setTasks({...tasks});
    }

    function changeFilter(filterValue: FilterValuesType, todoListId: string) {

        let todoList = todoLists.find(tl => tl.id === todoListId);
        if (todoList) {
            todoList.filter = filterValue;
            setTodoLists([...todoLists])
        }
    }

    function changeStatus(id: string, isDone: boolean, todoListId: string) {

        const todoListTasks = tasks[todoListId]

        const task: TaskType | undefined = todoListTasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }


    function removeTodoList(todoListId: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
        delete tasks [todoListId]
        setTasks({...tasks})
    }

    //UI:
    return (
        <div className="App">
            {
                todoLists.map(tl => {

                    let allTodoListTasks = tasks[tl.id];
                    let tasksForTodoList = allTodoListTasks;

                    if (tl.filter === "active") {
                        tasksForTodoList = allTodoListTasks.filter(t => !t.isDone)
                    }
                    if (tl.filter === "completed") {
                        tasksForTodoList = allTodoListTasks.filter(t => t.isDone)
                    }

                    return <TodoList
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodoList}
                        addTask={addTask}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        changeStatus={changeStatus}
                        filter={tl.filter}
                        removeTodoList={removeTodoList}
                    />
                })
            }


        </div>
    );
}

export default App;