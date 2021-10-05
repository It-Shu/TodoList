import {Dispatch} from 'redux'
import {setAppErrorAC, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from './app-reducer'
import {authAPI, AuthMeType} from "../api/todolist-api";

const initialState = {
    isLoggedIn: false
}

type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}

// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// thunks

enum ResponseStatuses {
    success = 0,
    error = 1,
    captcha = 10
}

export const loginTC = (data: AuthMeType) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
        authAPI.login()
            .then((res)=> {
               if (res.data.resultCode === ResponseStatuses.success) {
                 //  dispatch(setIsLoggedInAC())
                   dispatch(setAppStatusAC('succeeded'))
               } else {
                   dispatch(setAppErrorAC(res.data.messages[0]))
               }
            })
}

// types
type ActionsType = ReturnType<typeof setIsLoggedInAC> | SetAppStatusActionType | SetAppErrorActionType
