import React, {ChangeEvent, useState} from "react";
import {TextFields} from "@material-ui/icons";
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string) => void
}


export function EditableSpan(props: EditableSpanPropsType) {
    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState(props.value);
    const activateEditMode = () => {
        setEditMode(true);
        setTitle(title);
    }
    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title);
    }

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return editMode ?
        <TextField value={title} autoFocus onBlur={ activateViewMode } onChange={ onChangeTitleHandler }/> :
        <span onDoubleClick={ activateEditMode }>{title}</span>
}