import React from 'react';
import { Switch, Route } from 'react-router-dom';
//////////
import { Create } from '../Create';
import { Home } from '../Home';
import { NotFound } from '../NotFound';
import { Post } from '../Post';
import { Posts } from '../Posts';
import { SignIn } from '../Auth/SignIn';
import { SignUp } from '../Auth/SignUp';
import {ForgotPassword} from '../Auth/ForgotPassword';
import {Edit} from '../Edit';

export const Routing = () => {

    return (
        <Switch>
            <Route path='/' component={Home} exact />
            <Route path='/create' component={Create} />
            <Route path='/post/:id' component={Post} />
            <Route path='/posts' component={Posts} />
            <Route path='/signin' component={SignIn} />
            <Route path='/signup' component={SignUp} />
            <Route path='/forgotpassword' component={ForgotPassword} />
            <Route path='/edit' component={Edit} />
            <Route path='/*' component={NotFound} />
        </Switch>
    )
}