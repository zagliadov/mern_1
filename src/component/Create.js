import React from 'react';
import { TextField } from '@material-ui/core';
// import { Title } from './Title';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { sendDataToDataBase, updateArticle } from '../store/actions';
import { useHistory } from 'react-router-dom';


export const Create = () => {
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const history = useHistory();
    const open = useSelector(state => {
        return state.open
    })
    const onSubmit = async (data) => {
        await dispatch(sendDataToDataBase(data))
        await dispatch(updateArticle(!open))
        await history.push('/posts')
    };


    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    fullWidth
                    style={{ marginBottom: '30px' }}
                    label='title'
                    {...register('title', { required: true })}
                    variant='outlined' />

                <TextField
                    multiline
                    rows={4}
                    fullWidth
                    label='text'
                    {...register('text', { required: true })}
                    variant='outlined' />
                <input type='submit' value='Create' />
            </form>

        </div>
    );
}
