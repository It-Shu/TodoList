import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import EditableSpan from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./reducers/AppWithRedux";


type TaskPropsType = {
    task: TaskType
    removeTask: (taskId: string) => void
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean) => void
    changeTaskTitle: (taskId: string, newValue: string) => void
}


export const Task = React.memo(({
                                    task,
                                    changeTaskStatus,
                                    removeTask,
                                    changeTaskTitle,
                                }: TaskPropsType) => {


    const onClickHandler = () => {
        removeTask(task.id)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        changeTaskStatus(task.id, newIsDoneValue);
    }

    const onTitleChangeHandler =  (title: string) => {
        changeTaskTitle(task.id, title)
    }

    return <li key={task.id} className={task.isDone ? "is-done" : ""}>
        <Checkbox
            color={"secondary"}
            checked={task.isDone}
            onChange={onChangeHandler}
        />

        <EditableSpan title={task.title} changeItem={onTitleChangeHandler}/>
        <IconButton onClick={onClickHandler}>
            <Delete/>
        </IconButton>

    </li>
})