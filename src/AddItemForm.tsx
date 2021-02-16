import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";


type AddItemFormPropsType = {
    addItem: (title: string) => void
    title: string
}

function AddItemForm(props: AddItemFormPropsType) {

    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
        setError(false);
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
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
                label={props.title}
                error={error}
                helperText={error ? "Title is required" : ""}
            />
            <IconButton color={"primary"} onClick={addItem}>
                <AddBox/>
            </IconButton>
            {/* {error && <div className={"error-message"}>Title is required</div>}*/}
        </div>
    );
}


export default AddItemForm;
