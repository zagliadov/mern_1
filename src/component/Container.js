import React from 'react';
import { Grid } from '@material-ui/core';


export const Container = ({children}) => {
    return (
        <Grid 
        container
        deriction='row'
        justify='center'
        widht='100%'
        spacing={3}
        style={{padding: '50px 0'}} >
            {children}
        </Grid>
    );
}

