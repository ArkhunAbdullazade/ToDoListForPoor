import TaskComponent from "./TaskComponent";

function TaskList({tasks}) {

    return (
        <>
            {tasks.length ? (
                <ul>
                    {tasks.map((task) => (
                        <li key={task.id}>
                            <TaskComponent task={task} />
                        </li>
                    ))}
                </ul>
            ) : (
                <p>
                    <i>No tasks</i>
                </p>
            )}
        </>
    );
}

export default TaskList;
