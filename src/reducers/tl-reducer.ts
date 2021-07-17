import {todolistAPI, TodoListType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {RequestStatusType, setAppErrorAC, setStatusAC} from "./app-reducer";
import { v1 } from "uuid";
import {AxiosError} from "axios";


export type RemoveTodoListActionType = {
    type: "REMOVE-TODOLIST",
    id: string
}

export type AddTodoListActionType = {
    type: "ADD-TODOLIST",
    /*  title: string
      todolistId: string*/
    todolist: TodoListType
}

type ChangeTodoListFilterActionType = {
    type: "CHANGE-FILTER",
    filter: FilterValuesType,
    id: string
}

type ChangeTodoListTitleActionType = {
    type: "CHANGE-TITLE",
    title: string
    id: string
}

export type SetTodolistActionType = {
    type: "SET-TODOLISTS",
    todolists: Array<TodoListType>
}


export type ActionType =
    RemoveTodoListActionType
    | AddTodoListActionType
    | ChangeTodoListFilterActionType
    | ChangeTodoListTitleActionType
    | SetTodolistActionType
    | ChangeTodosEntityStatusType

const initialState: Array<TodolistDomainType> = []

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistDomainType = TodoListType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

export const todoListReducer = (state = initialState, action: ActionType): Array<TodolistDomainType> => {

    switch (action.type) {
        case "SET-CHANGE-ENTITY-STATUS": {
            return state.map(tl => {
                if (tl.id === action.id) {
                    return {...tl, entityStatus: action.entityStatus}
                } else {
                    return tl
                }
            })
        }

        case "SET-TODOLISTS": {
            return action.todolists.map(tl => ({
                ...tl,
                filter: "all"
            }))
        }

        case "ADD-TODOLIST": {
            /* return [{
                 id: action.todolistId,
                 title: action.title,
                 filter: "all",
                 addedDate: '',
                 order: 0
             }, ...state]*/
            const newTodolist: TodolistDomainType = {...action.todolist, filter: "all"}
            return [newTodolist, ...state]
        }

        case "REMOVE-TODOLIST": {
            return state.filter(tl => tl.id !== action.id)
        }


        case "CHANGE-FILTER": {
            /*  const todoList = state.find(tl => tl.id === action.id)
              if (todoList) {
                  todoList.filter = action.filter
                  return [...state]
              }
              return state*/
            return state.map(tl => {
                if (tl.id === action.id) {
                    return {...tl, filter: action.filter}
                } else {
                    return tl
                }
            })
        }

        case "CHANGE-TITLE": {
            return state.map(tl => {
                if (tl.id === action.id) {
                    return {...tl, title: action.title}
                } else {
                    return tl
                }
            })
        }

        default:
            return state
    }
}

export const removeTodoListAC = (todolistId: string): RemoveTodoListActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}

export const addTodoListAC = (todolist: TodoListType): AddTodoListActionType => {
    return {type: "ADD-TODOLIST", todolist}
}

export const changeTodoListTitleAC = (id: string, title: string): ChangeTodoListTitleActionType => {
    return {type: "CHANGE-TITLE", title: title, id: id}
}

export const changeTodoListFilterAC = (filter: FilterValuesType, id: string): ChangeTodoListFilterActionType => {
    return {type: "CHANGE-FILTER", filter: filter, id: id}
}

export const setTodosAC = (todolists: Array<TodoListType>): SetTodolistActionType => {
    return {type: "SET-TODOLISTS", todolists}
}

export const changeTodosEntityStatusAC = (id: string, entityStatus: RequestStatusType) => {
    return {type: "SET-CHANGE-ENTITY-STATUS", id, entityStatus} as const
}

type ChangeTodosEntityStatusType = ReturnType<typeof changeTodosEntityStatusAC>


// Thunk

export const fetchTodolistsTC = () => {
    return (dispatch: Dispatch) => {
        dispatch(setStatusAC('loading'))
        todolistAPI.getTodolist()
            .then((res) => {
                let todos = res.data
                dispatch(setTodosAC(todos))
                dispatch(setStatusAC('succeeded'))
            })
    }
}

export const createTodolistTC = (title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setStatusAC('loading'))
        todolistAPI.createTodolist(title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(addTodoListAC(res.data.data.item))
                    dispatch(setStatusAC('succeeded'))
                } else {
                    if (res.data.messages.length) {
                        dispatch(setAppErrorAC(res.data.messages[0]))
                    } else {
                        dispatch(setAppErrorAC('Some error occurred'))
                    }
                    dispatch(setStatusAC('failed'))
                }
            })
            .catch((err: AxiosError)=>{
                dispatch(setAppErrorAC(err.message))
                dispatch(setStatusAC('failed'))
            })
    }
}

export const deleteTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setStatusAC('loading'))
        dispatch(changeTodosEntityStatusAC(todolistId ,'loading'))
        todolistAPI.deleteTodolist(todolistId)
            .then(() => {
                dispatch(removeTodoListAC(todolistId))
                dispatch(setStatusAC('succeeded'))

            })
    }
}

export const updateTodolistTC = (id: string, title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setStatusAC('loading'))
        todolistAPI.updateTodoList(id, title)
            .then(() => {
                dispatch(changeTodoListTitleAC(id, title))
                dispatch(setStatusAC('succeeded'))
            })
    }
}