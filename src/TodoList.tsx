import React, {useCallback, useEffect} from 'react';
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";
import {TaskStatuses, TaskType} from "./api/tasks-api";
import {FilterValuesType} from "./reducers/tl-reducer";
import {useDispatch} from "react-redux";
import {fetchTasksTC} from "./reducers/tasks-reducer";
import {RequestStatusType} from "./reducers/app-reducer";


type PropsTitleType = {
    id: string
    title: string
    tasks: Array<TaskType>
    entityStatus: RequestStatusType
    filter: FilterValuesType
    removeTask: (taskID: string, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeFilter: (newFilterValue: FilterValuesType, todoListID: string) => void
    addTasks: (taskTitle: string, todoListID: string) => void
    changeStatus: (taskId: string, status: TaskStatuses, todoListID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
    changeTodoListTitle: (title: string, todoListID: string) => void
}


export const Todolist = React.memo((props: PropsTitleType) => {

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(fetchTasksTC(props.id))
    },[])

    const addTasks = useCallback((title: string) => {
        props.addTasks(title, props.id)
    }, [props.addTasks, props.id])

    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodoListTitle(title, props.id)
    }, [props.changeTodoListTitle, props.id])

    const onAllClickHandler = useCallback(() => props.changeFilter("all", props.id), [props.changeFilter, props.id]);
    const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.id), [props.changeFilter, props.id]);
    const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.id), [props.changeFilter, props.id]);
    const removeTodoList = () => {
        props.removeTodoList(props.id)
    }
    let allTodolistTasks = props.tasks
    let tasksForTodolist = allTodolistTasks

    if (props.filter === "active") {
        tasksForTodolist = allTodolistTasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.filter === "completed") {
        tasksForTodolist = allTodolistTasks.filter(t => t.status === TaskStatuses.Completed)
    }
// Task component function
    const removeTask = useCallback((taskId: string) => props.removeTask(taskId, props.id),[props.removeTask, props.id])

    const changeTaskStatus = useCallback ((taskId: string, status: TaskStatuses) => {
        props.changeStatus(taskId, status, props.id);
    },[props.changeStatus, props.id])

    const changeTaskTitle = useCallback ((taskId: string, newValue: string) => {
        props.changeTaskTitle(taskId, newValue, props.id);
    },[props.changeTaskTitle,props.id])

    return <div>
        <h3>
            <EditableSpan title={props.title} changeItem={changeTodolistTitle}/>
            <IconButton onClick={removeTodoList} disabled={props.entityStatus === 'loading'}>
                <Delete/>
            </IconButton>

        </h3>
        <AddItemForm addItem={addTasks} title={"Task title"} entityStatus={props.entityStatus}/>

        <ul style={{listStyle: "none", paddingLeft: "0"}}>
            {
                tasksForTodolist.map(t =>
                    <Task
                        key={t.id}
                        task={t}
                        removeTask={removeTask}
                        changeTaskStatus={changeTaskStatus}
                        changeTaskTitle={changeTaskTitle}
                        entityStatus={props.entityStatus}
                    />)
            }

        </ul>
        <div>
            <Button
                size={"small"}
                color={props.filter === "all" ? "secondary" : "primary"}
                variant={props.filter === "all" ? "outlined" : "contained"}
                //className={props.filter === "all" ? "active-filter" : ""}
                onClick={onAllClickHandler}>All
            </Button>
            <Button
                size={"small"}
                color={props.filter === "active" ? "secondary" : "primary"}
                variant={props.filter === "active" ? "outlined" : "contained"}
                //className={props.filter === "active" ? "active-filter" : ""}
                onClick={onActiveClickHandler}>Active
            </Button>
            <Button
                size={"small"}
                color={props.filter === "completed" ? "secondary" : "primary"}
                variant={props.filter === "completed" ? "outlined" : "contained"}
                //className={props.filter === "completed" ? "active-filter" : ""}
                onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>

})