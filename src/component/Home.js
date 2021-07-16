import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

export const Home = () => {

    const role = useSelector(state => state.role)

    useEffect(() => {
        if (role) {
            localStorage.setItem('role', role);
        };
    }, [role])

    return (
        <div>
            Home
        </div>
    );
}

