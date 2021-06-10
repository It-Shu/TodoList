import {addTodoListAC, TodolistDomainType, todoListReducer} from "./tl-reducer";
import {tasksReducer, TasksStateType} from "./tasks-reducer";
import {TodoListType} from "../api/todolist-api";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodoListsState: Array<TodolistDomainType> = [];

    let todolist: TodoListType = {
        title: "new todolist",
        id: 'any',
        order: 0,
        addedDate: ''
    };

    const action = addTodoListAC(todolist);

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoListsState = todoListReducer(startTodoListsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodoLists = endTodoListsState[0].id;

    expect(idFromTasks).toBe(action.todolist.id);
    expect(idFromTodoLists).toBe(action.todolist.id);
});
