import React, {useContext, useEffect, useImperativeHandle, useState} from 'react'
import AdminPanelNavbar from './../components/AdminPanelNavbar';
import { makeStyles } from '@material-ui/core/styles';
import {AppContext} from '../AppContext';
import {BrowserRouter as Router,Switch,Route,Link,Redirect} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  }
}));

export default function AdminPanel() {
  const {isUserLogged,toggleLoggedState,jwtToken,toggleTokenState,userRole,toggleRoleState} = useContext(AppContext)

  const classes = useStyles();

  return (
    userRole==='admin'?
    <div className={classes.root}>
      <AdminPanelNavbar/>
    </div>
    :<Redirect to="/"/>
  );
}