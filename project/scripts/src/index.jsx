import React from 'react';
import ReactDOM from 'react-dom/client';
import store from './redux/store';
import { Provider } from 'react-redux';
import {
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";
import './index.css';
import Root, {
	loader as rootLoader,
	action as rootAction
} from './routes/root';
import ErrorPage from './error-page';
import Task, {
	loader as taskLoader
} from './routes/task';
import EditTask, {
	action as editTaskAction
} from './routes/edit';
import { action as destroyTaskAction } from './routes/destroy';
import Index from './routes';

const container = document.getElementById('root');

if (container === null) throw new Error('You don\'t have root element');

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		errorElement: <ErrorPage />,
		loader: rootLoader,
		action: rootAction,
		children : [
			{
				errorElement: <div>Oops! There was an error.</div>,
				children: [
					{
						index: true,
						element: <Index />
					},
					{
						path: "tasks/:taskId",
						element: <Task />,
						loader: taskLoader,
					},
					{
						path: "tasks/:taskId/edit",
						element: <EditTask />,
						loader: taskLoader,
						action: editTaskAction,
					},
					{
						path: "tasks/:taskId/destroy",
						action: destroyTaskAction,
					}
				],
			}
		]
		
	},
]);

const root = ReactDOM.createRoot(container);

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
);
