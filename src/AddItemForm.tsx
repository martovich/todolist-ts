import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

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
        <Button onClick={addItem} variant={"contained"} color={"primary"}>+</Button>
        {/*{error && <div className="error-message">{error}</div>}*/}
    </div>
}