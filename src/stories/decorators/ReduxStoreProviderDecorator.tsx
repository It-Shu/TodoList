import React from 'react';
import {Provider} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {combineReducers, createStore} from "redux";
import {v1} from "uuid";
import {todoListReducer} from "../../reducers/tl-reducer";
import {tasksReducer} from '../../reducers/tasks-reducer';
import {TaskPriorities, TaskStatuses} from "../../api/tasks-api";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListReducer
})

const initialGlobalState: AppRootStateType = {
    todoLists: [
        {id: "todolistId1", title: "What to learn", filter: "all", order: 0, addedDate: ''},
        {id: "todolistId2", title: "What to buy", filter: "all", order: 0, addedDate: ''}
    ],
    tasks: {
        ["todolistId1"]: [
            {
                id: v1(), title: "HTML&CSS",
                status: TaskStatuses.Completed,
                todoListId: "todolistId1",
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                completed: false
            },
            {
                id: v1(), title: "JS",
                status: TaskStatuses.New,
                todoListId: "todolistId1",
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                completed: false
            }
        ],
        ["todolistId2"]: [
            {
                id: v1(), title: "Milk", status: TaskStatuses.New,
                todoListId: "todolistId2",
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                completed: false
            },
            {
                id: v1(), title: "React Book", status: TaskStatuses.Completed,
                todoListId: "todolistId2",
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                completed: false
            }
        ]
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState);

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}