import React, {useContext, useEffect, useImperativeHandle, useState} from 'react'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AddressForm from './../components/AddressForm';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import {AppContext} from '../AppContext';
import {BrowserRouter as Router,Switch,Route,Link,Redirect} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        width: 1200,
        height: 600,
    },
}));

export default function Checkout() {
    const {isUserLogged,toggleLoggedState,jwtToken,toggleTokenState,userRole,toggleRoleState} = useContext(AppContext)

    const classes = useStyles();

    return (
    isUserLogged===true?
    <React.Fragment>
        <Navbar/>
        <Grid container justify = "center">
            <Paper className={classes.root}>
                <AddressForm/>
            </Paper>
        </Grid>
        <Footer/>
    </React.Fragment>
    :<Redirect to="/login"/>
    );
}