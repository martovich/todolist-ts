import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, IconButton} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import {AddBox} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem(title);
            setTitle("");
        } else {
            setError("Title is required!")
        }
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addItem();
        }
    }
    return <div>
        {/*<input value={title}*/}
        {/*       onChange={onChangeHandler}*/}
        {/*       onKeyPress={onKeyPressHandler}*/}
        {/*       className={error ? "error" : ""}/>*/}
        <TextField
            style={{padding: "10px"}}
            variant={"outlined"}
            value={title}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
            // className={error ? "error" : ""}
            error={!!error}
            // label={error ? "Error" : "Type value"}
            label={"Type value"}
            helperText={error} />
        {/*<button onClick={addItem}>+</button>*/}
        <IconButton onClick={addItem} color={"primary"}>
            <AddBox/>
        </IconButton>
        {/*{error && <div className="error-message">{error}</div>}*/}
    </div>
}