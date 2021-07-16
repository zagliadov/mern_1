import React from 'react';
import { Grid } from '@material-ui/core';


export const Container = ({children}) => {
    return (
        <Grid 
        container
        deriction='row'
        >
            {children}
        </Grid>
    );
}

