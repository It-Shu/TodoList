import React, {useCallback} from "react";
import {Grid, Paper} from "@material-ui/core";
import {Route} from "react-router-dom";
import {Todolist} from "./TodoList";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {
    changeTodoListFilterAC,
    createTodolistTC,
    deleteTodolistTC,
    FilterValuesType,
    TodolistDomainType, updateTodolistTC
} from "./reducers/tl-reducer";
import {createTaskTC, deleteTasksTC, TasksStateType, updateTaskTC} from "./reducers/tasks-reducer";
import {TaskStatuses} from "./api/tasks-api";
import AddItemForm from "./AddItemForm";


export const TodoListList = () => {

    const todoLists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todoLists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch();

    // functions for tasks
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
        /* const action = changeTodoListTitleAC(todoListID, title)
         dispatch(action)*/
        dispatch(updateTodolistTC(todoListID, title))
    }, [])

    return <>
        <Grid container style={{padding: '20px'}}>
            <AddItemForm addItem={addTodoList} title={"Todolist title"}/>
        </Grid>
        <Grid container spacing={10}>
            {todoLists.map(tl => {
                return ( // key передается наружному элементу, React смотрит на главный тег

                    <Grid item key={tl.id}>
                        <Paper elevation={8} style={{padding: "10px"}}>
                            <Route exact path={'/'} render={() => <Todolist
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
                            />}/>
                        </Paper>
                    </Grid>

                )
            })
            }


        </Grid>

    </>


}