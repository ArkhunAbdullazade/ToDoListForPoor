import {
     Form,
     redirect,
     useNavigate
} from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteTask } from "../../redux/slices/tasksSlice";
import { destroyTask } from "../../tasks";

function DeleteTaskForm({ task }) {
    const dispatch = useDispatch();

    const handleDeleteClick = async (e) => {
        dispatch(deleteTask({ id: task.id }));
        // await destroyTask(task.id);
        // window.location.replace('localhost:3000/');
    };

    return (
        <>
            <Form
                method="post"
                action={`tasks/${task.id}/destroy`}
                onSubmit={(event) => { 
                    event.preventDefault();
                    handleDeleteClick();
                 }}
            >
                <button type="submit">
                    Delete
                </button>
            </Form>
        </>
    );
}

export default DeleteTaskForm;
