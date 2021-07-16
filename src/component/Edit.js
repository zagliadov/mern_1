
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { postUpdate } from '../store/actions';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom';



const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '400px',
        minWidth: '400px',
    },
    section: {
        display: 'flex',
        flexDirection: 'column',
    },
    title: {
        padding: '10px',
        minHeight: '20px',
    },
    text: {
        padding: '10px',
        height: '500px',
        width: '450px',
    }
}))

export const Edit = ({ match }) => {
    const classes = useStyles();
    const post = useSelector(state => state.post);
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const history = useHistory();


    const onSubmit = async (data) => {
        await dispatch(postUpdate(post, post.title = data.title, post.text = data.text));
        //dispatch(updateArticle(!open))
        // history.push(`/post/${post._id}`);
        await history.push(`/posts`);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}
            className={classes.root} >
            <section className={classes.section}>
                <input type='text'
                    className={classes.title}
                    defaultValue={post.title}
                    {...register('title', { required: true })} />

                <textarea
                    name="text"
                    className={classes.text}
                    defaultValue={post.text}
                    {...register('text', { required: true })} />

            </section>
            <input type='submit' />
        </form>
    );
}

