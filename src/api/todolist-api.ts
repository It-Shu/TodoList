import axios from "axios";
import {RequestStatusType} from "../reducers/app-reducer";

export type TodoListType = {
    id: string
    addedDate: string
    order: number
    title: string
    entityStatus: RequestStatusType
}

export type ResponseType<D> = {
    resultCode: number
    messages: Array<string>
    data: D
}


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '4dc5ae3c-52f6-4e4c-9a8e-47e368841d1f'
    },
})


export const todolistAPI = {

    getTodolist() {
        return instance.get<Array<TodoListType>>('todo-lists')
    },

    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodoListType }>>('todo-lists', {title})
    },

    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType<{}>>(`todo-lists/${todolistId}`)
    },

    updateTodoList(todolistId: string, title: string) {
        return instance.put<ResponseType<{}>>(`todo-lists/${todolistId}`, {title})
    }
}

export type AuthMeType = {
    id: number
    email: string
    login: string
}

type LoginParamsType = {

}

export const authAPI = {
    login() {
        return instance.get<ResponseType<AuthMeType>>('/auth/me')
    }
}