import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}


export type TasksStateType = {
    [/*todoListID*/ key: string]: Array<TaskType>
}

export type FilterValuesType = "all" | "active" | "completed";


function App() {

    //  BLL

    const todoListID1 = v1()
    const todoListID2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID1, title: "What to learn", filter: "all"},
        {id: todoListID2, title: "What to buy", filter: "all"},
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Redux", isDone: false},
            {id: v1(), title: "TypeScript", isDone: false},
        ],
        [todoListID2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Bread", isDone: true},
            {id: v1(), title: "Beer", isDone: false},
            {id: v1(), title: "Meat", isDone: false},
            {id: v1(), title: "Water", isDone: true},
        ],
    })

    // functions for tasks
    function removeTask(taskID: string, todoListID: string) {
        const todoListTasks = tasks[todoListID]
        tasks[todoListID] = todoListTasks.filter(t => t.id != taskID);
        setTasks({...tasks})
    }

    function addTasks(taskTitle: string, todoListID: string) {
        let newTask: TaskType = {id: v1(), title: taskTitle, isDone: false};
        const todoListTasks = tasks[todoListID];
        tasks[todoListID] = [newTask, ...todoListTasks]
        //tasks[todoListID].push(newTask) // аналогия верхних двух строк
        setTasks({...tasks});
    }

    function changeStatus(taskID: string, isDone: boolean, todoListID: string) {

        const todoListTasks = tasks[todoListID]

        const task: TaskType | undefined = todoListTasks.find(t => t.id === taskID)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }

    function changeTaskTitle(taskID: string, title: string, todoListID: string) {

        const todoListTasks = tasks[todoListID]

        const task: TaskType | undefined = todoListTasks.find(t => t.id === taskID)
        if (task) {
            task.title = title
            setTasks({...tasks})
        }
    }


    // functions for todoLists:
    function removeTodoList(todoListID: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        delete tasks [todoListID]
        setTasks({...tasks})
    }

    function addTodoList(title: string) {
        const newTodoListID = v1()
        const newTodoList: TodoListType = {
            id: newTodoListID,
            title: title,
            filter: "all"
        }
        setTodoLists([newTodoList, ...todoLists])
        setTasks({...tasks, [newTodoListID]: []})
    }

    function changeFilter(newFilterValue: FilterValuesType, todoListID: string) {
        const todoList = todoLists.find(tl => tl.id === todoListID)
        if (todoList) {
            todoList.filter = newFilterValue
            setTodoLists([...todoLists])
        }
    }

    function changeTodoListTitle(title: string, todoListID: string) {


        const todoList = todoLists.find(tl => tl.id === todoListID)
        if (todoList) {
            todoList.title = title
            setTodoLists([...todoLists])
        }
    }


    //Container
    const containerList = todoLists.map(tl => {
        let tasksForTodolist = tasks[tl.id]
        if (tl.filter === "active") {
            tasksForTodolist = tasks[tl.id].filter(t => !t.isDone)
        }
        if (tl.filter === "completed") {
            tasksForTodolist = tasks[tl.id].filter(t => t.isDone)
        }
        return ( // key передается наружному элементу, React смотрит на главный тег
            <Grid item key={tl.id}>
                <Paper elevation={8} style={{padding: "10px"}}>
                    <Todolist
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        filter={tl.filter}
                        removeTask={removeTask}
                        removeTodoList={removeTodoList}
                        changeFilter={changeFilter}
                        addTasks={addTasks}
                        changeStatus={changeStatus}
                        changeTaskTitle={changeTaskTitle}
                        changeTodoListTitle={changeTodoListTitle}
                    />
                </Paper>
            </Grid>
        )
    })


// UI
    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px 0"}}>
                    <AddItemForm addItem={addTodoList} title={"Todolist title"}/>
                </Grid>
                <Grid container spacing={10}>
                    {containerList}
                </Grid>

            </Container>
        </div>
    )
}

export default App;
