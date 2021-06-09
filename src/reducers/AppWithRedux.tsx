import React, {useCallback, useEffect} from 'react';
import {Todolist} from "../TodoList";
import AddItemForm from "../AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC, fetchTodolistsTC, FilterValuesType,
    removeTodoListAC, TodolistDomainType,
} from "./tl-reducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC, deleteTasksTC, fetchTasksTC,
    removeTaskAC,
    TasksStateType
} from "./tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {tasksAPI, TaskStatuses} from "../api/tasks-api";


function AppWithRedux() {

    useEffect(()=>{
       dispatch(fetchTodolistsTC())
    },[])

    const todoLists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todoLists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch();


    // functions for tasks
    const removeTask = useCallback((taskID: string, todoListID: string) => {
       /* const action = removeTaskAC(taskID, todoListID)
        dispatch(action)*/
       /* tasksAPI.deleteTasks(todoListID, taskID)
            .then(()=>{
                const action = removeTaskAC(taskID, todoListID);
                dispatch(action)
            })*/
        dispatch(deleteTasksTC(todoListID, taskID))
    }, [])

    const addTasks = useCallback((taskTitle: string, todoListID: string) => {
        const action = addTaskAC(taskTitle, todoListID)
        dispatch(action)
    }, [dispatch])

    const changeStatus = useCallback((taskID: string, status: TaskStatuses, todoListID: string) => {
        const action = changeTaskStatusAC(taskID, status, todoListID)
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
