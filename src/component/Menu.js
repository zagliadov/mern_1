import { AppBar, Button, makeStyles, Toolbar, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { saveUserType } from '../store/actions';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        color: '#fff',
        textDecoration: 'none',
    },
}))


export const Menu = () => {
    const classes = useStyles();

    const user = useSelector(state => state.user);
    const dispatch = useDispatch();



    useEffect(() => {
        if (localStorage.getItem('user')) {
            dispatch(saveUserType(localStorage.getItem('user')))
        }

    }, [user, dispatch])

    const LogOut = () => {
        dispatch(saveUserType('USER'))
        localStorage.setItem('user', 'USER')
    }




    return (
        <div className={classes.root}>
            <AppBar
                position='static' >
                <Toolbar>
                    <Typography
                        component={Link} to='/'
                        variant='h6'
                        className={classes.title} >
                        Main
                    </Typography>
                    {(user === "USER") ?
                        <Button
                            variant='contained'
                            color='primary'
                            component={Link}
                            to='/signup' >
                            Sign up
                        </Button>
                        : null}
                    {(user === 'USER') ?
                        <Button
                            variant='contained'
                            color='primary'
                            component={Link}
                            to='/signin' >
                            Sign in
                        </Button>
                        : null}

                    {/* <Button
                        variant='contained'
                        color='primary'
                        component={Link}
                        to='/signup' >
                        Sign up
                    </Button>


                    <Button
                        variant='contained'
                        color='primary'
                        component={Link}
                        to='/signin' >
                        Sign in
                    </Button> */}

                    <Button
                        variant='contained'
                        color='primary'
                        component={Link}
                        to='/posts' >
                        All articles
                    </Button>
                    {(user === 'ADMIN') ?
                        <Button
                            variant='contained'
                            color='primary'
                            component={Link}
                            to='/create' >
                            Create
                        </Button>
                        : null}


                    <Button
                        onClick={() => LogOut()}
                        variant='contained'
                        color='primary'>
                        Log out
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}

