import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {AddCircle} from "@material-ui/icons";
import {RequestStatusType} from "./reducers/app-reducer";


export type AddItemFormPropsType = {
    addItem: (title: string) => void
    title: string
    entityStatus?: RequestStatusType
}

const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
        setError(false);
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        error && setError(false)
        if (e.key === "Enter") addItem();

    }
    const addItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle/*.trim() === " "*/) {
            props.addItem(trimmedTitle);
        } else {
            setError(true)
        }
        setTitle("");
    };

    return (
        <div>
            <TextField
                variant={"outlined"}
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                onBlur={() => {
                    setError(false)
                }}
                helperText={error ? "Title is required!" : ""}
                label={props.title}
                error={error}
                disabled={props.entityStatus === 'loading'}
            />

            <IconButton onClick={addItem} disabled={props.entityStatus === 'loading'}>
                <AddCircle/>
            </IconButton>
        </div>
    );
});


export default AddItemForm;