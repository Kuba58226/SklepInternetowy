import React, {useContext, useEffect, useImperativeHandle, useState} from 'react'
import {BrowserRouter as Router,Switch,Route,Link,Redirect} from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {AppContext} from '../AppContext';
import {useCart} from './Cart';

export default function Navbar() {
    const cart = useCart();
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
                <Link to="/" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                    Sklep Internetowy
                </Link>
            </Typography>
            <div>
                <Link to="/cart" style={{ color: 'inherit', textDecoration: 'inherit'}}><Button variant="contained" color="primary">Koszyk ({cart.length})</Button></Link>
            </div>
            {userRole==='admin' &&
                <div>
                    <Link to="/admin-panel" style={{ color: 'inherit', textDecoration: 'inherit'}}><Button variant="contained" color="primary">Panel Administracyjny</Button></Link>
                </div>}
            {!isUserLogged?
                <div>
                    <Link to="/login" style={{ color: 'inherit', textDecoration: 'inherit'}}><Button variant="contained" color="primary">Zaloguj si??</Button></Link>
                </div>
                :
                <div>
                    <Button onClick={handleLogout} variant="contained" color="secondary">Wyloguj si??</Button>
                </div>}
            </Toolbar>
        </AppBar>
    );
}