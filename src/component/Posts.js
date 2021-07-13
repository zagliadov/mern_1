import React, { useLayoutEffect, useEffect } from 'react';
import { Title } from './Title';
import { useSelector, useDispatch } from 'react-redux';
import { getArticlesFromDataBase, scrollUpdate } from '../store/actions';
import { ScrollTop } from './ScrollTop';


export const Posts = () => {

    const dispatch = useDispatch();
    const open = useSelector(state => state.open);
    const scrollPosition = useSelector(state => state.scrollPosition)

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
        <div>
            <Title />

            {(window.pageYOffset > document.documentElement.clientHeight) ?
                <ScrollTop />
                : null}
            {/* <button onClick={() => dispatch(getArticlesFromDataBase(2))}>1</button>
            <button onClick={() => dispatch(getArticlesFromDataBase(4))}>2</button>
            <button onClick={() => dispatch(getArticlesFromDataBase(8))}>3</button>
            <button onClick={() => dispatch(getArticlesFromDataBase(12))}>4</button>
            <button onClick={() => dispatch(getArticlesFromDataBase(16))}>5</button>
            <button onClick={() => dispatch(getArticlesFromDataBase(20))}>6</button> */}
        </div>
    );
}

