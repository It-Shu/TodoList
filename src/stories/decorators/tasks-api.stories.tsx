import React, {useEffect, useState} from 'react'
import {TaskPriorities, tasksAPI, TaskStatuses} from '../../api/tasks-api';

export default {
    title: 'API/tasks'
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
     const todolistId = "e8c5740e-d2ae-4b73-a003-9ff4ac4f48a5"
        tasksAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '';
        tasksAPI.createTasks(todolistId, 'PROMISE')
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '25511beb-1da4-4e45-9edc-ba261018975a';
        const taskId = '436048c0-a776-4331-bead-0a7f5d713580';
        tasksAPI.deleteTasks(todolistId, taskId)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTasksTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'e8c5740e-d2ae-4b73-a003-9ff4ac4f48a5';
        const taskId = '3330be2a-24b9-4789-ba88-9f91ad7198ad';
        tasksAPI.updateTasks(todolistId, taskId, {
            title: '',
            description: '',
            completed: false,
            status: TaskStatuses.New,
            priority: TaskPriorities.Low,
            startDate: '',
            deadline: '',
        })
            .then((res)=>{
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
