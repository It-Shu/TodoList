import React, {useEffect} from 'react';
import {
    AppBar,
    Button,
    Container,
    Grid,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography
} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {fetchTodolistsTC} from "./tl-reducer";

import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {RequestStatusType} from "./app-reducer";
import {Redirect, Route, Switch} from 'react-router-dom';
import {Login} from "../utils/Login";
import {TodoListList} from "../TodoListList";


function AppWithRedux() {

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [])

    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const dispatch = useDispatch();

// UI
    return (
        <div className="App">
            <AppBar position="static">
                {/*<ErrorSnackbar/>*/}
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
                {status === 'loading' && <LinearProgress color="secondary"/>}
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px 0"}}>
                    <Switch>
                        <Route exact path={'/'} render={() => <TodoListList/>}/>
                        <Route path={'/login'} render={() => <Login/>}/>

                        <Route path={'/404'} render={() => <h1>404: PAGE NOT FOUND</h1>}/>
                        <Redirect from={'*'} to={'/404'}/>
                    </Switch>
                </Grid>

            </Container>
        </div>
    )
}

export default AppWithRedux;
