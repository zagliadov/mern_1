import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getArticleUsingMatchParam } from '../store/actions';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';




export const Post = ({ match }) => {

    const post = useSelector(state => state.post);
    const dispatch = useDispatch();
    const open = useSelector(state => state.open);
    const role = useSelector(state => state.role);
    useEffect(() => {
        dispatch(getArticleUsingMatchParam(match.params.id))
    }, [match.params.id, dispatch, open]);


    return (
        <div>
            <h1>{post.title}</h1>
            <hr />
            <p>{post.text}</p>
            {(role === 'ADMIN') ?
                <Button
                    variant='contained'
                    color='primary'
                    component={Link}
                    to={'/edit/' + post._id} >
                    Edit
                </Button>
                : null}

        </div>
    );
}

