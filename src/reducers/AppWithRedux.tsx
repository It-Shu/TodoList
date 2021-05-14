import React, {useCallback, useReducer, useState} from 'react';
// import './App.css';
import {Todolist} from "../TodoList";
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
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}


export type TasksStateType = {
    [/*todoListID*/ key: string]: Array<TaskType>
}

export type FilterValuesType = "all" | "active" | "completed";


function AppWithRedux() {

    //  BLL

    // const todoListID1 = v1()
    // const todoListID2 = v1()
    /*
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
        })*/

    /*    const [todoLists, dispatchTodoList] = useReducer(todoListReducer,[
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
        })*/

    const todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todoLists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch();


    // functions for tasks
    const removeTask = useCallback((taskID: string, todoListID: string) => {
        const action = removeTaskAC(taskID, todoListID)
        dispatch(action)
    }, [dispatch])

    const addTasks = useCallback((taskTitle: string, todoListID: string) => {
        const action = addTaskAC(taskTitle, todoListID)
        dispatch(action)
    }, [dispatch])

    const changeStatus = useCallback((taskID: string, isDone: boolean, todoListID: string) => {
        const action = changeTaskStatusAC(taskID, isDone, todoListID)
        dispatch(action)
    }, [dispatch])

    const changeTaskTitle = useCallback((taskID: string, title: string, todoListID: string) => {

        const action = changeTaskTitleAC(taskID, title, todoListID)
        dispatch(action)
    }, [dispatch])


    // functions for todoLists:
    const removeTodoList = useCallback((todoListID: string) => {
        const action = removeTodoListAC(todoListID)
        dispatch(action)
    }, [dispatch])

    const addTodoList = useCallback ((title: string) => {
        const action = addTodoListAC(title)
        dispatch(action)
    },[dispatch])

    const changeFilter = useCallback((newFilterValue: FilterValuesType, todoListID: string) => {
        const action = changeTodoListFilterAC(newFilterValue, todoListID)
        dispatch(action)

    }, [dispatch])

    const changeTodoListTitle = useCallback((title: string, todoListID: string) => {
        const action = changeTodoListTitleAC(todoListID, title)
        dispatch(action)
    }, [dispatch])


    //Container
    const containerList = todoLists.map(tl => {

        return ( // key передается наружному элементу, React смотрит на главный тег
            <Grid item key={tl.id}>
                <Paper elevation={8} style={{padding: "10px"}}>
                    <Todolist
                        id={tl.id}
                        title={tl.title}
                        tasks={tasks[tl.id]}
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

export default AppWithRedux;
