import {    
    useLoaderData,
    useSubmit,
    Form,
    redirect,
    useNavigate
} from "react-router-dom";
import { useDispatch } from "react-redux";
import { editTask } from "../../redux/slices/tasksSlice";

function EditTaskForm() {
    const dispatch = useDispatch();
    const { task } = useLoaderData();
    const navigate = useNavigate(); 

    const handleSubmit = (e) => { 
        const formData = new FormData(e.target);
        const updated = Object.fromEntries(formData);
        
        dispatch(editTask({id: task.id, title: updated.title, description: updated.description}));
    };

    return (
        <>
            <Form method="post" id="task-form" onSubmit={handleSubmit}>
                <p>
                    <span>Title: </span>
                    <input
                        placeholder="Title"
                        aria-label="Title"
                        type="text"
                        name="title"
                        defaultValue={task.title}
                        maxLength={16}
                    />
                    <br />
                    <span>Description: </span>
                    <br />
                    <textarea 
                        placeholder="Description"
                        aria-label="Description"
                        type="text"
                        name="description"
                        defaultValue={task.description} cols="24" rows="2"></textarea>
                </p>
                <p>
                    <button type="submit">Save</button>
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
