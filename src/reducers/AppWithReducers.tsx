import React, {useReducer, useState} from 'react';/*
// import './App.css';
import {Todolist} from "../Todolist";
import {v1} from "uuid";
import AddItemForm from "../AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    todoListReducer
} from "./tl-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./tasks-reducer";

export type TaskType = {
    id: string
    title: string
    status: TaskStatuses
}

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}


export type TasksStateType = {
    [/!*todoListID*!/ key: string]: Array<TaskType>
}

export type FilterValuesType = "all" | "active" | "completed";


function AppWithReducers() {

    //  BLL

    const todoListID1 = v1()
    const todoListID2 = v1()
/!*
    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID1, title: "What to learn", filter: "all"},
        {id: todoListID2, title: "What to buy", filter: "all"},
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Redux", isDone: false},
            {id: v1(), title: "TypeScript", isDone: false},
        ],
        [todoListID2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Bread", isDone: true},
            {id: v1(), title: "Beer", isDone: false},
            {id: v1(), title: "Meat", isDone: false},
            {id: v1(), title: "Water", isDone: true},
        ],
    })*!/

    const [todoLists, dispatchTodoList] = useReducer(todoListReducer,[
        {id: todoListID1, title: "What to learn", filter: "all"},
        {id: todoListID2, title: "What to buy", filter: "all"},
    ])

    const [tasks, dispatchToTasks] = useReducer(tasksReducer,{
        [todoListID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Redux", isDone: false},
            {id: v1(), title: "TypeScript", isDone: false},
        ],
        [todoListID2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Bread", isDone: true},
            {id: v1(), title: "Beer", isDone: false},
            {id: v1(), title: "Meat", isDone: false},
            {id: v1(), title: "Water", isDone: true},
        ],
    })

    // functions for tasks
    function removeTask(taskID: string, todoListID: string) {
        const action = removeTaskAC(taskID, todoListID)
        dispatchToTasks(action)
    }

    function addTasks(taskTitle: string, todoListID: string) {
      const action = addTaskAC(taskTitle, todoListID)
        dispatchToTasks(action)
    }

    function changeStatus(taskID: string, status: TaskStatuses, todoListID: string) {
        const action = changeTaskStatusAC(taskID, isDone, todoListID)
        dispatchToTasks(action)
    }

    function changeTaskTitle(taskID: string, title: string, todoListID: string) {

        const action = changeTaskTitleAC(taskID, title, todoListID)
        dispatchToTasks(action)
    }


    // functions for todoLists:

    function removeTodoList(todoListID: string) {
       const action = removeTodoListAC(todoListID)
        dispatchTodoList(action)
        dispatchToTasks(action)
    }

    function addTodoList(title: string) {
      const action = addTodoListAC(title)
        dispatchToTasks(action)
        dispatchTodoList(action)
    }

    function changeFilter(newFilterValue: FilterValuesType, todoListID: string) {
       const action = changeTodoListFilterAC(newFilterValue, todoListID)
        dispatchTodoList(action)

    }

    function changeTodoListTitle(title: string, todoListID: string) {
        const action = changeTodoListTitleAC(todoListID, title)
        dispatchTodoList(action)
    }


    //Container
    const containerList = todoLists.map(tl => {
        let tasksForTodolist = tasks[tl.id]
        if (tl.filter === "active") {
            tasksForTodolist = tasks[tl.id].filter(t => !t.isDone)
        }
        if (tl.filter === "completed") {
            tasksForTodolist = tasks[tl.id].filter(t => t.isDone)
        }
        return ( // key передается наружному элементу, React смотрит на главный тег
            <Grid item key={tl.id}>
                <Paper elevation={8} style={{padding: "10px"}}>
                    <Todolist
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        filter={tl.filter}
                        removeTask={removeTask}
                        removeTodoList={removeTodoList}
                        changeFilter={changeFilter}
                        addTasks={addTasks}
                        changeStatus={changeStatus}
                        changeTaskTitle={changeTaskTitle}
                        changeTodoListTitle={changeTodoListTitle}
                    />
                </Paper>
            </Grid>
        )
    })


// UI
    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px 0"}}>
                    <AddItemForm addItem={addTodoList} title={"Todolist title"}/>
                </Grid>
                <Grid container spacing={10}>
                    {containerList}
                </Grid>

            </Container>
        </div>
    )
}

export default AppWithReducers;
*/