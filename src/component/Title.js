import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { deleteArticle, getArticlesFromDataBase, updateArticle } from '../store/actions';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'start',
        flexWrap: 'wrap',
        padding: '10px',
    },
    article: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: '0px 3px 10px silver',
        borderRadius: '5px',
        width: '200px',
        marginLeft: '10px',
        minHeight: '200px',
        marginBottom: '20px',
        padding: '10px',
    }
}))

export const Title = () => {
    const classes = useStyles();
    const posts = useSelector(state => state.posts);
    const open = useSelector(state => state.open);
    const scrollPosition = useSelector(state => state.scrollPosition);

    const dispatch = useDispatch();
    const history = useHistory();
    ////////////////////////////////////////
    useEffect(() => {
        dispatch(getArticlesFromDataBase(scrollPosition))
    }, [dispatch, open, scrollPosition]);
    ////////////////////////////////////////

    const handleClick = (id) => {
        dispatch(deleteArticle(id))
        dispatch(updateArticle(!open))
        dispatch(getArticlesFromDataBase(scrollPosition));
    }


    const handleOpen = (id) => {
        window.scrollTo(0, 0);
        history.push(`/post/${id}`);
    }


    return (
        <div className={classes.root}>
            {posts && posts.map(post => {
                return (
                    <article key={post._id} className={classes.article}>
                        <div>
                            <h2>{post.title}</h2>
                        </div>
                        <div>
                            <p>{post.text}</p>
                        </div>

                        <div>
                            <IconButton
                                aria-label="delete"
                                className={classes.margin}
                                onClick={() => handleClick(post._id)} >
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                                aria-label="delete"
                                className={classes.margin}
                                size="small"
                                onClick={() => handleOpen(post._id)} >
                                <ArrowDownwardIcon fontSize="inherit" />
                            </IconButton>
                        </div>

                    </article>
                )
            })}
        </div>


    );
}

