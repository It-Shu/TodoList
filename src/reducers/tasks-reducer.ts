import {FilterValuesType, TasksStateType, TaskType, TodoListType} from "./AppWithRedux";
import {v1} from "uuid";
import {AddTodoListActionType, RemoveTodoListActionType} from "./tl-reducer";


type RemoveTaskACActionType = {
    type: "REMOVE-TASK"
    taskId: string
    todolistId: string
}

type addTaskActionType = {
    type: "ADD-TASK"
    title: string
    todolistId: string
}

type changeStatusActionType = {
    type: "CHANGE-STATUS-TASK"
    taskId: string
    isDone: boolean
    todolistId: string
}

type changeTaskTitleActionType = {
    type: "CHANGE-TITLE-TASK"
    taskId: string
    title: string
    todolistId: string
}


export type ActionType = RemoveTaskACActionType
    | addTaskActionType
    | changeStatusActionType
    | changeTaskTitleActionType
    | AddTodoListActionType
    | RemoveTodoListActionType

const initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: ActionType): TasksStateType => {

    switch (action.type) {

        case "REMOVE-TASK": {
            const copyState = {...state}
            const todoListTasks = copyState[action.todolistId]
            copyState[action.todolistId] = todoListTasks.filter(t => t.id != action.taskId);
            return copyState
        }
        case "ADD-TASK": {
            const copyState = {...state}
            let newTask: TaskType = {id: v1(), title: action.title, isDone: false};
            const todoListTasks1 = copyState[action.todolistId];
            copyState[action.todolistId] = [newTask, ...todoListTasks1]
            return copyState
        }
        case "CHANGE-STATUS-TASK": {
           /* let copyState = {...state}
            const todoListTasks = copyState[action.todolistId]
            const task = todoListTasks.find(t => t.id === action.taskId)
            if (task) {
                task.isDone = action.isDone
            }
            state[action.todolistId] = [...todoListTasks]
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(task => {
                    if (task.id === action.taskId) {
                        return {...task, isDone: action.isDone}
                    } else {
                        return task
                    }
                })
            }*/
            const copyState = {...state}
            let updateTasksTodoList = copyState[action.todolistId].map(task => task.id === action.taskId
                ? {...task, isDone: action.isDone}
                : task)
            return {
                ...state,
                [action.todolistId]: updateTasksTodoList
            }
        }
        case "CHANGE-TITLE-TASK": {
            /*let copyState = {...state}
            const todoListTasks = copyState[action.todolistId]

            const task = todoListTasks.find(t => t.id === action.taskId)
            if (task) {
                task.title = action.title
            }
            state[action.taskId] = [...todoListTasks]
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(task => {
                    if (task.id === action.taskId) {
                        return {...task, title: action.title}
                    } else {
                        return task
                    }
                })
            }*/
            const copyState = {...state}
            copyState[action.todolistId] = copyState[action.todolistId].map(task => task.id === action.taskId
                ? {...task, title: action.title} : task)
            return copyState

        }
        case "ADD-TODOLIST": {
            return {
                ...state,
                [action.todolistId]: []
            }
        }
        case "REMOVE-TODOLIST": {
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
        }
        default:
            return state
    }
}


export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskACActionType => {
    return {type: "REMOVE-TASK", taskId, todolistId: todolistId}
}

export const addTaskAC = (title: string, todolistId: string): addTaskActionType => {
    return {type: "ADD-TASK", title, todolistId}
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): changeStatusActionType => {
    return {type: "CHANGE-STATUS-TASK", taskId, isDone, todolistId}
}


export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): changeTaskTitleActionType => {
    return {type: "CHANGE-TITLE-TASK", taskId, title, todolistId}
}

/*export const AddTodolistAC = (title: string, todolistID: string): AddTodoListActionType => {
    return {type: "ADD-TODOLIST", title, todolistID}
}*/
