import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";


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


export type ActionType =
    RemoveTodoListActionType
    | AddTodoListActionType
    | ChangeTodoListFilterActionType
    | ChangeTodoListTitleActionType


export const todoListReducer = (state: Array<TodoListType>, action: ActionType): Array<TodoListType> => {

    switch (action.type) {

        case "ADD-TODOLIST": {
            return [{id: action.todolistId, title: action.title, filter: "all"}, ...state]
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

export const removeTodolistAC = (todolistId: string): RemoveTodoListActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}

export const addTodolistAC = (title: string): AddTodoListActionType => {
    return {type: "ADD-TODOLIST", title: title, todolistId: v1()}
}

export const changeTodolistTitleAC = (id: string, title: string): ChangeTodoListTitleActionType => {
    return {type: "CHANGE-TITLE", title: title, id: id}
}

export const changeTodolistFilterAC = (filter: FilterValuesType, id: string): ChangeTodoListFilterActionType => {
    return {type: "CHANGE-FILTER", filter: filter, id: id}
}
