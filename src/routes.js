import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from './pages/Home';
import LoginPage from './pages/LoginPage'

import Page404 from './pages/Page404'


// function estaAutenticado() {
//     if(!localStorage.getItem('TOKEN')) {
//         props.history.push('/login')
//     }
// }

class PrivateRoute extends Component {
    render() {
        if(localStorage.getItem('TOKEN')) {
            const ComponentQueVainaTela = this.props.component
            return ( <Route component={ComponentQueVainaTela} /> )
            // return ( <ComponentQueVainaTela /> )
        } else {
            return ( <Redirect to="/login" /> )
        }
    }
}

const LogoutPage = () => {
    localStorage.removeItem('TOKEN')
    return <Redirect to="/login" />
}

export default class Routes extends Component {
    render() {
        return (
            <Switch>
                <PrivateRoute path="/" exact component={Home} />
                <Route path="/login" component={LoginPage} />
                <Route path="/logout" component={LogoutPage}></Route>
                <Route component={Page404} />
            </Switch>
        )
    }
}