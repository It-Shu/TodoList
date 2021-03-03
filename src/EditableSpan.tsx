import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TextField} from "@material-ui/core";


type EditableSpanPropsType = {
    title: string
    changeItem: (title: string) => void

}

function EditableSpan(props: EditableSpanPropsType) {


    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)

    const onEditMode = () => {
        setEditMode(true)
    }

    const offEditMode = () => {
        setEditMode(false)
        props.changeItem(title)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressEditMode = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') offEditMode()
    }

    return (
        editMode
            ? <TextField
                variant={"standard"}
                value={title}
                autoFocus
                onBlur={offEditMode}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressEditMode}
            />
            : <span onDoubleClick={onEditMode}>{props.title}</span>

    );
}

export default EditableSpan;