import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import EditableSpan from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskStatuses, TaskType} from "./api/tasks-api";


export type TaskPropsType = {
    task: TaskType
    removeTask: (taskId: string) => void
    changeTaskStatus: (taskId: string, status: TaskStatuses) => void
    changeTaskTitle: (taskId: string, newValue: string) => void
}


export const Task = React.memo(({
                                    task,
                                    changeTaskStatus,
                                    removeTask,
                                    changeTaskTitle,
                                }: TaskPropsType) => {


    const onClickHandler = useCallback(() => {
        removeTask(task.id)
    },[task.id])
    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        changeTaskStatus(task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New);
    },[task.id])

    const onTitleChangeHandler =  useCallback((title: string) => {
        changeTaskTitle(task.id, title)
    },[task.id])

    return <li key={task.id} className={task.status === TaskStatuses.Completed ? "is-done" : ""}>
        <Checkbox
            color={"secondary"}
            checked={task.status === TaskStatuses.Completed}
            onChange={onChangeHandler}
        />

        <EditableSpan title={task.title} changeItem={onTitleChangeHandler}/>
        <IconButton onClick={onClickHandler}>
            <Delete/>
        </IconButton>

    </li>
})