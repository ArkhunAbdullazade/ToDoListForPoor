import {    
    Form,
    NavLink,
    redirect,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteTask, completeTask } from "../redux/slices/tasksSlice";

function TaskComponent({task}) {
    const dispatch = useDispatch();

    const handleDeleteClick = (e) => { 
        dispatch(deleteTask({id: task.id})); 

    };
    const handleEditClick = (e) => {  };
    const handleCompletedChange = (e) => { dispatch(completeTask({id: task.id})); };

    return (
        <>
            <input checked={task.completed} onChange={handleCompletedChange} type="checkbox"/>
            <NavLink
                to={`tasks/${task.id}`}
                className={({ isActive, isPending }) =>
                    isActive
                        ? "active"
                        : isPending
                        ? "pending"
                        : ""
                }>
                {task.first || task.last ? (
                    <>
                        {task.first} {task.last}
                    </>
                ) : (
                    <i>No Name</i>
                )}{" "}
                {task.favorite && <span>★</span>}
            </NavLink>
            <Form action={`tasks/${task.id}/edit`}>
                    <button onClick={handleEditClick} type="submit">Edit</button>
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
