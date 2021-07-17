import {Dispatch} from 'redux';
import {ResponseType} from "../api/todolist-api"
import {setAppErrorAC, SetAppErrorType, SetAppStatusType, setStatusAC} from "../reducers/app-reducer";

// generic function
export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: ErrorUtilsDispatchType) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some error occurred'))
    }
    dispatch(setStatusAC('failed'))
}

export const handleServerNetworkError = (message: string , dispatch: ErrorUtilsDispatchType) => {
    dispatch(setAppErrorAC(message))
    dispatch(setStatusAC('failed'))
}

type ErrorUtilsDispatchType = Dispatch<SetAppStatusType | SetAppErrorType>