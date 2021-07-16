import React, { useLayoutEffect, useEffect } from 'react';
import { Title } from './Title';
import { useSelector, useDispatch } from 'react-redux';
import { getArticlesFromDataBase, scrollUpdate } from '../store/actions';
import { ScrollTop } from './ScrollTop';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }
}))

export const Posts = () => {

    const dispatch = useDispatch();
    const open = useSelector(state => state.open);
    const scrollPosition = useSelector(state => state.scrollPosition)
    const checkingScrollHight = window.pageYOffset > document.documentElement.clientHeight
    const classes = useStyles();
    
    useEffect(() => {
        dispatch(getArticlesFromDataBase())
        dispatch(getArticlesFromDataBase(scrollPosition))

    }, [open, scrollPosition, dispatch]);

    //test
    useLayoutEffect(() => {
        const updatePosition = () => {
            dispatch(scrollUpdate((window.pageYOffset / 100).toFixed(0)));
        }
        window.addEventListener('scroll', updatePosition);
        updatePosition();
        return () => window.removeEventListener('scroll', updatePosition);
    }, [dispatch]);
    //



    return (
        <div className={classes.root}>
            <Title />
            {checkingScrollHight ? <ScrollTop /> : null}
        </div>
    );
}

