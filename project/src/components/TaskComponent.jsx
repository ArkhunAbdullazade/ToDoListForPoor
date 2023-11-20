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
    const [isCompleted, setIsCompleted] = useState(task.completed);

    const handleDeleteClick = (e) => { dispatch(deleteTask({id: task.id})); };
    const handleCompletedChange = (e) => { 
        setIsCompleted(!isCompleted);
        dispatch(completeTask({id: task.id})); 
    };

    return (
        <>
            <input checked={isCompleted} onChange={handleCompletedChange} type="checkbox"/>
            <NavLink
                to={`tasks/${task.id}`}>
                {task.title ? (
                    <>
                        {task.title}
                    </>
                ) : (
                    <i>No Title</i>
                )}
            </NavLink>
            <Form action={`tasks/${task.id}/edit`}>
                    <button type="submit">Edit</button>
            </Form>
            <Form
                method="post"
                action={`tasks/${task.id}/destroy`}
                onSubmit={(event) => {
                    if (
                        !window.confirm(
                            "Please confirm you want to delete this task."
                            )
                            ) {
                                event.preventDefault();
                            }
                        }}
            >
                <button onClick={handleDeleteClick} type="submit">Delete</button>
            </Form>
        </>
    );
}

export default TaskComponent;
