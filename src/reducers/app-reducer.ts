export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type ErrorStatusType = string | null

const initialState = {
    status: 'loading' as RequestStatusType,
    error: 'ERROR' as ErrorStatusType
}

export type InitialStateType = typeof initialState

export const appReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case "APP/SET-ERROR":
            return {...state, error: action.error}
        default:
            return state
    }
}

export const setAppStatusAC = (status: RequestStatusType) => {
    return {type: 'APP/SET-STATUS', status} as const
}

export const setAppErrorAC = (error: ErrorStatusType) => {
    return {type: 'APP/SET-ERROR', error} as const
}

export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>

type ActionType =
    | SetAppStatusActionType
    | SetAppErrorActionType