import {configureStore} from '@reduxjs/toolkit';
import tasksSlice from './slices/tasksSlice';

const store = configureStore({
    reducer: {
        tasksReducer: tasksSlice,
    },
});

export default store;