import {    
    Form,
    NavLink,
    redirect,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteTask, completeTask } from "../redux/slices/tasksSlice";
import { useState } from "react";

function TaskComponent({task}) {
    const dispatch = useDispatch();

    const handleDeleteClick = (e) => { 
        dispatch(deleteTask({id: task.id}));
    };

    return (
        <>
            <CheckBox task={task} />
            <NavLink
                to={`tasks/${task.id}`}>
                {task.title ? (
                    <>
                        {task.title}
                    </>
                ) : (
                    <i>No Title</i>
                )}{""}
            </NavLink>
            <Form action={`tasks/${task.id}/edit`}>
                <button type="submit">Edit</button>
            </Form>
            <Form
                method="post"
                action={`tasks/${task.id}/destroy`}>
                <button onClick={handleDeleteClick} type="submit">Delete</button>
            </Form>
        </>
    );
}

function CheckBox({ task }) {
    let isCompleted = task.completed;

    return (
        // <Form method="post">
        //     <button
        //         name="isCompleted"
        //         value={isCompleted ? "false" : "true"}>
        //         {isCompleted ? "▣" : "▢"}
        //     </button>
        // </Form>
        <button
            name="isCompleted"
            value={isCompleted ? "false" : "true"}>
            {isCompleted ? "▣" : "▢"}
        </button>
    );
}

export default TaskComponent;
