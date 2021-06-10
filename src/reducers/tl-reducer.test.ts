import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC, FilterValuesType,
    removeTodoListAC, TodolistDomainType,
    todoListReducer
} from './tl-reducer';
import {v1} from 'uuid';
import {TodoListType} from "../api/todolist-api";

let todolistId1: string;
let todolistId2: string;
let startState: Array<TodolistDomainType> = [];

beforeEach( () => {
    todolistId1 = v1()
    todolistId2 = v1()
    startState = [
        {id: todolistId1, title: "What to learn", filter: "all", addedDate: '', order: 0},
        {id: todolistId2, title: "What to buy", filter: "all", addedDate: '', order: 0}
    ]

})

// 1
test('correct todolist should be removed', () => {

    const endState = todoListReducer(startState, removeTodoListAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

//2
test('correct todolist should be added', () => {
    let todolist: TodoListType = {
        title: "New Todolist",
        id: 'any',
        order: 0,
        addedDate: ''
    };

    const endState = todoListReducer(startState, addTodoListAC(todolist))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(todolist.title);
});

//3
test('correct todolist should change its name', () => {
    let newTodolistTitle = "New Todolist";

    const action = changeTodoListTitleAC(todolistId2, newTodolistTitle);

    const endState = todoListReducer(startState, action);

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
    expect(endState === startState).toBeFalsy()
});


//4
test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValuesType = "completed";

    const action = changeTodoListFilterAC(newFilter, todolistId2)

    const endState = todoListReducer(startState, action);

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});
