import React, {useContext, useEffect, useImperativeHandle, useState} from 'react'
import {BrowserRouter as Router,Switch,Route,Link,Redirect} from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {AppContext} from '../AppContext';

export default function Navbar() {
    const {Website} = require('../config/website.js');

    const {isUserLogged,toggleLoggedState,jwtToken,toggleTokenState,userRole,toggleRoleState} = useContext(AppContext)

    function handleLogout(){
        fetch(`${Website.serverName}auth/logout`,{method: "POST", headers: {
            'Authorization': 'Bearer '+jwtToken,
            Accept: 'application/json',
            'Content-Type': 'application/json',},
        })
        .then(response => response.json())
        .then(data => {
        if (data.success===true){
            toggleLoggedState(false)
            toggleTokenState(false)
            toggleRoleState(false)
        }
        })
    }

    return (
        <AppBar position="relative">
            <Toolbar>
            <Typography variant="h6" color="inherit" noWrap style={{ flex: 1 }}>
                <Link to="/">
                    Sklep Internetowy
                </Link>
            </Typography>
            {!isUserLogged?
                <div>
                    <Link to="/login"><Button variant="contained" color="primary">Zaloguj się</Button></Link>
                </div>
                :
                <div>
                    <Button onClick={handleLogout} variant="contained" color="secondary">Wyloguj się</Button>
                </div>}
            </Toolbar>
        </AppBar>
    );
}