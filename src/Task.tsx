import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import EditableSpan from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskStatuses, TaskType} from "./api/tasks-api";
import {RequestStatusType} from "./reducers/app-reducer";


export type TaskPropsType = {
    task: TaskType
    removeTask: (taskId: string) => void
    changeTaskStatus: (taskId: string, status: TaskStatuses) => void
    changeTaskTitle: (taskId: string, newValue: string) => void
    entityStatus: RequestStatusType
}


export const Task = React.memo(({
                                    task,
                                    changeTaskStatus,
                                    removeTask,
                                    changeTaskTitle,
                                    entityStatus
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

        <EditableSpan title={task.title} changeItem={onTitleChangeHandler} entityStatus={entityStatus}/>
        <IconButton onClick={onClickHandler} disabled={entityStatus === 'loading'}>
            <Delete/>
        </IconButton>

    </li>
})