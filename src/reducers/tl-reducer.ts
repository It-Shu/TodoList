import {v1} from "uuid";
import {todolistAPI, TodoListType} from "../api/todolist-api";
import {Dispatch} from "redux";


export type RemoveTodoListActionType = {
    type: "REMOVE-TODOLIST",
    id: string
}

export type AddTodoListActionType = {
    type: "ADD-TODOLIST",
    title: string
    todolistId: string
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

const initialState: Array<TodolistDomainType> = []

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistDomainType = TodoListType & {
    filter: FilterValuesType
}

export const todoListReducer = (state = initialState, action: ActionType): Array<TodolistDomainType> => {

    switch (action.type) {

        case "SET-TODOLISTS": {
            return action.todolists.map(tl => ({
                ...tl,
                filter: "all"
            }))
        }

        case "ADD-TODOLIST": {
            return [{
                id: action.todolistId,
                title: action.title,
                filter: "all",
                addedDate: '',
                order: 0
            }, ...state]
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

export const addTodoListAC = (title: string): AddTodoListActionType => {
    return {type: "ADD-TODOLIST", title: title, todolistId: v1()}
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


// Thunk

export const fetchTodolistsTC = () => {
    return (dispatch: Dispatch) => {
        todolistAPI.getTodolist()
            .then((res) => {
                let todos = res.data
                dispatch(setTodosAC(todos))
            })
    }
}