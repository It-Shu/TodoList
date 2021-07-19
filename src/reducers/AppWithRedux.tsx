import React, {useCallback, useEffect} from 'react';
import {Todolist} from "../TodoList";
import AddItemForm from "../AddItemForm";
import {
    AppBar,
    Button,
    Container,
    Grid,
    IconButton,
    LinearProgress,
    Paper,
    Toolbar,
    Typography
} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    changeTodoListFilterAC,
    createTodolistTC, deleteTodolistTC, fetchTodolistsTC, FilterValuesType,
    TodolistDomainType, updateTodolistTC,
} from "./tl-reducer";
import {
    createTaskTC, deleteTasksTC,
    TasksStateType, updateTaskTC
} from "./tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {TaskStatuses} from "../api/tasks-api";
import {RequestStatusType} from "./app-reducer";
import {Route} from 'react-router-dom';
import {Login} from "../utils/Login";
import {TodoListList} from "../TodoListList";


function AppWithRedux() {

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [])

    const todoLists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todoLists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const dispatch = useDispatch();


    /* // functions for tasks
     const removeTask = useCallback((taskID: string, todoListID: string) => {
         dispatch(deleteTasksTC(todoListID, taskID))
     }, [])

     const addTasks = useCallback((taskTitle: string, todoListID: string) => {
         dispatch(createTaskTC(taskTitle, todoListID))
     }, [])

     const changeStatus = useCallback((taskID: string, status: TaskStatuses, todoListID: string) => {
         dispatch(updateTaskTC({status}, todoListID, taskID))
     }, [])

     const changeTaskTitle = useCallback((taskID: string, title: string, todoListID: string) => {
         dispatch(updateTaskTC({title}, todoListID, taskID))
     }, [])


     // functions for todoLists:
     const removeTodoList = useCallback((todoListID: string) => {
         dispatch(deleteTodolistTC(todoListID))
     }, [])

     const addTodoList = useCallback((title: string) => {
         dispatch(createTodolistTC(title))
     }, [])

     const changeFilter = useCallback((newFilterValue: FilterValuesType, todoListID: string) => {
         const action = changeTodoListFilterAC(newFilterValue, todoListID)
         dispatch(action)

     }, [dispatch])

     const changeTodoListTitle = useCallback((title: string, todoListID: string) => {
         /!* const action = changeTodoListTitleAC(todoListID, title)
          dispatch(action)*!/
         dispatch(updateTodolistTC(todoListID, title))
     }, [])*/


    //Container

    /* const containerList = todoLists.map(tl => {

         return ( // key передается наружному элементу, React смотрит на главный тег
             <Grid item key={tl.id}>
                 <Paper elevation={8} style={{padding: "10px"}}>
                     <Route exact path={'/'} render={()=> <Todolist
                         id={tl.id}
                         title={tl.title}
                         tasks={tasks[tl.id]}
                         entityStatus={tl.entityStatus}
                         filter={tl.filter}
                         removeTask={removeTask}
                         removeTodoList={removeTodoList}
                         changeFilter={changeFilter}
                         addTasks={addTasks}
                         changeStatus={changeStatus}
                         changeTaskTitle={changeTaskTitle}
                         changeTodoListTitle={changeTodoListTitle}
                     /> }/>
                 </Paper>
             </Grid>
         )
     })
 */

// UI
    return (
        <div className="App">
            <AppBar position="static">
                {/*<ErrorSnackbar/>*/}
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
                {status === 'loading' && <LinearProgress color="secondary"/>}
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px 0"}}>
                    <Route exact path={'/'} render={() => <TodoListList/>}/>
                    <Route path={'/login'} render={() => <Login/>}/>
                    <Route path={'*'} render={() => <h1>404: PAGE NOT FOUND</h1>}/>
                </Grid>

            </Container>
        </div>
    )
}

export default AppWithRedux;
