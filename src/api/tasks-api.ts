import axios from "axios";

export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type GetTasksResponseType = {
    items: Array<TaskType>
    totalCount: number
    error: string | null
}

/*type CreateTasksResponseType = {
    items: Array<TaskType>
    resultCode: number
    messages: Array<string>
    data: {}
}

type DeleteTasksResponseType = {
    resultCode: number
    messages: Array<string>
    data: {}
}

type UpdateTasksResponseType = {
    items: Array<TaskType>
    resultCode: number
    messages: Array<string>
    data: {}
}*/

type ResponseType<T> = {
    resultCode: number
    messages: Array<string>
    data: T
}

export enum TaskStatuses {
    New,
    InProgress,
    Completed,
    Draft
}

export enum TaskPriorities {
    Low,
    Middle,
    Hi,
    Urgently,
    Later
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '7b707044-71d7-4278-8d6b-08f541ab464d'
    },
})

export const tasksAPI = {

    getTasks(todolistId: string) {
        return instance.get<GetTasksResponseType>(`todo-lists/${todolistId}/tasks`)
    },

    createTasks(todolistId: string, title: string) {
        return instance.post<ResponseType<{items: Array<TaskType>}>>(`todo-lists/${todolistId}/tasks`, {title})
    },

    deleteTasks(todolistId: string, taskId: string) {
        return instance.delete<ResponseType<{}>>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },

    updateTasks(todolistId: string, taskId: string, title: string) {
        return instance.put<ResponseType<{items: Array<TaskType>}>>(`todo-lists/${todolistId}/tasks/${taskId}`, {title})
    }
}