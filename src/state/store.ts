import {applyMiddleware, combineReducers, createStore} from 'redux';
import {todoListReducer} from "../reducers/tl-reducer";
import {tasksReducer} from "../reducers/tasks-reducer";
import thunk from 'redux-thunk'
import {appReducer} from "../reducers/app-reducer";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListReducer,
    app: appReducer
})
// непосредственно создаём store
export const store = createStore(rootReducer, applyMiddleware(thunk));
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;