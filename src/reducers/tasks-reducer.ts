import {v1} from "uuid";
import {AddTodoListActionType, RemoveTodoListActionType, SetTodolistActionType} from "./tl-reducer";
import {TaskPriorities, tasksAPI, TaskStatuses, TaskType} from "../api/tasks-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../state/store";


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

type changeStatusActionType = {
    type: "CHANGE-STATUS-TASK"
    taskId: string
    status: TaskStatuses
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
    | changeStatusActionType
    | changeTaskTitleActionType
    | AddTodoListActionType
    | RemoveTodoListActionType
    | SetTodolistActionType
    | SetTasksActionType

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
            const stateCopy = {...state}
             const tasks = stateCopy[action.task.todoListId];
             const newTasks = [action.task, ...tasks];
             stateCopy[action.task.todoListId] = newTasks;
             return stateCopy;
            /*return {
                ...state,
                [action.task.todoListId]: [{...action.task}, ...state[action.task.todoListId]]
            }*/
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
                ? {...task, status: action.status}
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

export const addTaskAC = (task: TaskType): addTaskActionType => {
    return {type: "ADD-TASK", task}
}

export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string): changeStatusActionType => {
    return {type: "CHANGE-STATUS-TASK", taskId, status, todolistId}
}


export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): changeTaskTitleActionType => {
    return {type: "CHANGE-TITLE-TASK", taskId, title, todolistId}
}

export const setTasksAC = (tasks: Array<TaskType>, todolistId: string): SetTasksActionType => {
    return {type: "SET-TASKS", tasks, todolistId}
}

/*export const AddTodolistAC = (title: string, todolistID: string): AddTodoListActionType => {
    return {type: "ADD-TODOLIST", title, todolistID}
}*/


// Thunk

export const fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        tasksAPI.getTasks(todolistId)
            .then((res) => {
                const tasks = res.data.items
                dispatch(setTasksAC(tasks, todolistId))
            })
    }
}

export const deleteTasksTC = (todolistId: string, taskId: string) => {
    return (dispatch: Dispatch) => {
        tasksAPI.deleteTasks(todolistId, taskId)
            .then(()=> {
                let action = removeTaskAC(taskId, todolistId)
                dispatch(action)
            })
    }
}

export const createTaskTC = (title: string, todolistId: string) => {
    return (dispatch: Dispatch) => {
        tasksAPI.createTasks(todolistId, title)
            .then((res)=>{
                let task = res.data.data.item
                let action = addTaskAC(task)
                dispatch(action)
            })
    }
}

export const updateTaskStatusTC = (status: TaskStatuses, todolistId: string, taskId: string) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {

        const allTasksFromState = getState().tasks;
        const tasksForCurrentTodolist = allTasksFromState[todolistId];
        const task = tasksForCurrentTodolist.find(t => {
            return t.id === taskId
        })

        if (task) {
            tasksAPI.updateTasks(todolistId, taskId, {
                title: task.title,
                startDate: task.startDate,
                priority: TaskPriorities.Low,
                completed: task.completed,
                description: task.description,
                deadline: task.deadline,
                status: status
            }).then(() => {
                    let action = changeTaskStatusAC(taskId, status, todolistId)
                    dispatch(action)
                })
        }
    }
}

