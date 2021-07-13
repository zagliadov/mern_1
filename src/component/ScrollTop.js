import React from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import { scrollUpdate } from '../store/actions';


const useStyles = makeStyles(theme => ({
    btn: {
        backgroundColor: 'rgb(121, 139, 219)',
        border: 'none',
        borderRadius: '50%',
        cursor: 'pointer',
        width: '50px',
        height: '50px',
        position: 'fixed',
        right: '100px',
        bottom: '100px',
    }
}))

export const ScrollTop = () => {
    const classes = useStyles();

    const dispatch = useDispatch();


    const handleClick = () => {
        dispatch(scrollUpdate(0))
        window.scrollTo(0, 0)
    }

    return (
        <div>
            <button
                className={classes.btn}
                onClick={() => handleClick()}>
                Back to top
            </button>
        </div>
    );
}
