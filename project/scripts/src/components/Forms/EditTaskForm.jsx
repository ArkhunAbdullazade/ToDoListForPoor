import {    
    useLoaderData,
    useSubmit,
    Form,
    redirect,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import { addTask } from "../../redux/slices/tasksSlice";

function EditTaskForm() {
    const dispatch = useDispatch();
    const { task } = useLoaderData();
    const navigate = useNavigate();

    const handleClick = (e) => { 
        
    };

    return (
        <>
            <Form method="post" id="task-form">
                <p>
                    <span>Title</span>
                    <input
                        placeholder="Title"
                        aria-label="Title"
                        type="text"
                        name="title"
                        defaultValue={task.title}
                    />
                    <br />
                    <span>Description</span>
                    <input
                        placeholder="Description"
                        aria-label="Description"
                        type="text"
                        name="description"
                        defaultValue={task.description}
                    />
                </p>
                <p>
                    <button onClick={handleClick} type="submit">Save</button>
                    <button
                        type="button"
                        onClick={() => {
                            navigate(-1);
                        }}
                    >Cancel</button>
                </p>
            </Form>
        </>
    );
}

export default EditTaskForm;
