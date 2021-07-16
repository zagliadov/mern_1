import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { deleteArticle, getArticlesFromDataBase, updateArticle } from '../store/actions';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        padding: '10px',
        border: '1px solid red',
    },
    article: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: '0px 3px 10px silver',
        borderRadius: '5px',
        maxWidth: '30%',
        minWidth: '400px',
        marginLeft: '10px',
        marginBottom: '20px',
        padding: '10px',
    }
}))

export const Title = () => {
    const classes = useStyles();
    const posts = useSelector(state => state.posts);
    const open = useSelector(state => state.open);
    const role = useSelector(state => state.role);
    const dispatch = useDispatch();
    const history = useHistory();




    const handleClick = async (id) => {
         await dispatch(deleteArticle(id))
         await dispatch(updateArticle(!open));
         await dispatch(getArticlesFromDataBase())
        // setTimeout(() => {
        //     dispatch(getArticlesFromDataBase())
        // }, 100);
        history.push('/posts')
    }
    // useEffect(() => {
    //     dispatch(getArticlesFromDataBase());

    // }, [open,]);

    const handleOpen = (id) => {
        window.scrollTo(0, 0);
        history.push(`/post/${id}`);
    }

    const format = (text) => {
        return text.substr(0, 130) + '...';

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
                            <p>{format(post.text)}</p>
                        </div>

                        <div>
                            {(role === 'ADMIN') ?
                                <IconButton
                                    aria-label="delete"
                                    className={classes.margin}
                                    onClick={() => handleClick(post._id)} >
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                                : null}

                            <IconButton
                                aria-label="delete"
                                className={classes.margin}
                                size="small"
                                onClick={() => handleOpen(post._id)} >
                                <p>Read more...</p>
                            </IconButton>
                        </div>

                    </article>
                )
            })}
        </div>


    );
}

