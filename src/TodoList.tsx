import React, {ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, Grid, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";


type PropsTitleType = {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (taskID: string, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeFilter: (newFilterValue: FilterValuesType, todoListID: string) => void
    addTasks: (taskTitle: string, todoListID: string) => void
    changeStatus: (taskId: string, isDone: boolean, todoListID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
    changeTodoListTitle: (title: string, todoListID: string) => void
}


export function Todolist(props: PropsTitleType) {

    const addTasks = (title: string) => {
        props.addTasks(title, props.id)
    }
    const changeTodolistTitle = (title: string) => {
        props.changeTodoListTitle(title, props.id)
    }

    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

    const removeTodoList = () => {
        props.removeTodoList(props.id)
    }

    return <div>

        <h3>
            <EditableSpan title={props.title} changeItem={changeTodolistTitle}/>

            <IconButton onClick={removeTodoList}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTasks} title={"Task Title"}/>

        <div>
            {
                props.tasks.map(t => {
                    const removeTask = () => {
                        props.removeTask(t.id, props.id)
                    }
                    const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeStatus(t.id, e.currentTarget.checked, props.id)
                    }

                    const changeTitle = (title: string) => {
                        props.changeTaskTitle(t.id, title, props.id)
                    }


                    return <div key={t.id} className={t.isDone ? "is-done" : ""}>

                        <Checkbox
                            color={"primary"}
                            checked={t.isDone}
                            onChange={changeStatus}
                        />

                        <EditableSpan title={t.title} changeItem={changeTitle}/>

                        <IconButton onClick={removeTask}>
                            <Delete/>
                        </IconButton>
                    </div>
                })
            }

        </div>
        <div>
            <Grid container style={{padding: "20px 0"}}>
                <Button
                    size={"small"}
                    variant={props.filter === "all" ? "outlined" : "contained"}
                    color={props.filter === "all" ? "secondary" : "primary"}
                    onClick={onAllClickHandler}>All
                </Button>
                <Button
                    size={"small"}
                    variant={props.filter === "active" ? "outlined" : "contained"}
                    color={props.filter === "active" ? "secondary" : "primary"}
                    onClick={onActiveClickHandler}>Active
                </Button>
                <Button
                    size={"small"}
                    variant={props.filter === "completed" ? "outlined" : "contained"}
                    color={props.filter === "completed" ? "secondary" : "primary"}
                    onClick={onCompletedClickHandler}>Completed
                </Button>
            </Grid>
        </div>
    </div>

}