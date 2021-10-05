import {AddTodoListActionType, RemoveTodoListActionType, SetTodolistActionType} from "./tl-reducer";
import {TaskPriorities, tasksAPI, TaskStatuses, TaskType, UpdateTaskModelType} from "../api/tasks-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../state/store";
import {setAppErrorAC, SetAppErrorActionType, SetAppStatusActionType, setAppStatusAC} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {AxiosError} from "axios";


type RemoveTaskACActionType = {
    type: "REMOVE-TASK"
    taskId: string
    todolistId: string
}

type addTaskActionType = {
    type: "ADD-TASK"
    /*title: string
    todolistId: string*/
    task: TaskType
}

type updateTaskActionType = {
    type: "UPDATE-TASK"
    taskId: string
    model: UpdateDomainTaskModelType
    todolistId: string
}

type changeTaskTitleActionType = {
    type: "CHANGE-TITLE-TASK"
    taskId: string
    title: string
    todolistId: string
}

export type SetTasksActionType = {
    type: "SET-TASKS"
    tasks: Array<TaskType>
    todolistId: string
}

export type ActionType = RemoveTaskACActionType
    | addTaskActionType
    | updateTaskActionType
    | changeTaskTitleActionType
    | AddTodoListActionType
    | RemoveTodoListActionType
    | SetTodolistActionType
    | SetTasksActionType
    | SetAppStatusActionType
    | SetAppErrorActionType

export type TasksStateType = {
    [todoListId: string]: Array<TaskType>
}

const initialState: TasksStateType = {}

export type TaskDomainType = TasksStateType

export const tasksReducer = (state = initialState, action: ActionType): TasksStateType => {

    switch (action.type) {

        case "SET-TASKS": {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
        }
        case "SET-TODOLISTS": {
            const stateCopy = {...state};
            action.todolists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        }

        case "REMOVE-TASK": {
            const copyState = {...state}
            const todoListTasks = copyState[action.todolistId]
            copyState[action.todolistId] = todoListTasks.filter(t => t.id != action.taskId);
            return copyState
        }
        case "ADD-TASK": {
            /*  const copyState = {...state}
              let newTask: TaskType = {
                  id: v1(),
                  title: action.title,
                  status: TaskStatuses.New,
                  todoListId: action.todolistId,
                  description: '',
                  startDate: '',
                  deadline: '',
                  addedDate: '',
                  order: 0,
                  priority: TaskPriorities.Low,
                  completed: false
              };
              const todoListTasks1 = copyState[action.todolistId];
              copyState[action.todolistId] = [newTask, ...todoListTasks1]
              return copyState*/
            /*const stateCopy = {...state}
            const tasks = stateCopy[action.task.todoListId];
            const newTasks = [action.task, ...tasks];
            stateCopy[action.task.todoListId] = newTasks;
            return stateCopy;*/
            return {
                ...state,
                [action.task.todoListId]: [{...action.task}, ...state[action.task.todoListId]]
            }
        }
        case "UPDATE-TASK": {
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
                ? {...task, ...action.model}
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
                [action.todolist.id]: []
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

export const addTaskAC = (task: TaskType): addTaskActionType => {
    return {type: "ADD-TASK", task}
}

export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string): updateTaskActionType => {
    return {type: "UPDATE-TASK", taskId, model, todolistId}
}


export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): changeTaskTitleActionType => {
    return {type: "CHANGE-TITLE-TASK", taskId, title, todolistId}
}

export const setTasksAC = (tasks: Array<TaskType>, todolistId: string): SetTasksActionType => {
    return {type: "SET-TASKS", tasks, todolistId}
}


// Thunk


enum ResponseStatuses {
    success = 0,
    error = 1,
    captcha = 10
}

export const fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        tasksAPI.getTasks(todolistId)
            .then((res) => {
                const tasks = res.data.items
                dispatch(setTasksAC(tasks, todolistId))
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}

export const deleteTasksTC = (todolistId: string, taskId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        tasksAPI.deleteTasks(todolistId, taskId)
            .then((res) => {
                if (res.data.resultCode === ResponseStatuses.success) {
                    dispatch(removeTaskAC(taskId, todolistId))
                    dispatch(setAppStatusAC('succeeded'))
                }
            })
            .catch((err: AxiosError)=>{
                handleServerNetworkError(err.message, dispatch)
            })
    }
}

export const createTaskTC = (title: string, todolistId: string) => (dispatch: Dispatch<ActionType>) => {
    dispatch(setAppStatusAC('loading'))
    tasksAPI.createTasks(todolistId, title)
        .then(res => {
            if (res.data.resultCode === ResponseStatuses.success) {
                const task = res.data.data.item
                dispatch(addTaskAC(task))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                    handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error: AxiosError) => {
            handleServerNetworkError(error.message, dispatch)
        })
}


type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    completed?: boolean
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export const updateTaskTC = (domainModel: UpdateDomainTaskModelType, todolistId: string, taskId: string) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        dispatch(setAppStatusAC('loading'))
        const allTasksFromState = getState().tasks;
        const tasksForCurrentTodolist = allTasksFromState[todolistId];
        const task = tasksForCurrentTodolist.find(t => t.id === taskId)

        if (!task) {
            return;
        }
        const apiModel: UpdateTaskModelType = {

            title: task.title,
            startDate: task.startDate,
            priority: task.priority,
            completed: task.completed,
            description: task.description,
            deadline: task.deadline,
            status: task.status,
            ...domainModel
        }

        tasksAPI.updateTasks(todolistId, taskId, apiModel)

            .then((res) => {
                if (res.data.resultCode === ResponseStatuses.success) {
                    let action = updateTaskAC(taskId, domainModel, todolistId)
                    dispatch(action)
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((error: AxiosError) => {
                handleServerNetworkError(error.message, dispatch)
            })
    }
}

