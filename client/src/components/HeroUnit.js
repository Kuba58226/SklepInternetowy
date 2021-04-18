import React, {useContext, useEffect, useImperativeHandle, useState} from 'react'
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import {BrowserRouter as Router,Switch,Route,Link,Redirect} from "react-router-dom";
import {AppContext} from '../AppContext';

const useStyles = makeStyles((theme) => ({
    heroContent: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
      marginTop: theme.spacing(4),
    },
  }));

export default function HeroUnit() {
    const {Website} = require('../config/website.js');

    const {isUserLogged,toggleLoggedState,jwtToken,toggleTokenState,userRole,toggleRoleState} = useContext(AppContext)

    const classes = useStyles();

    return (
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Sklep Internetowy
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Sklep Internetowy to jeden z największych i najpopularniejszych sklepów komputerowych w Polsce.
              W szerokiej ofercie sklepu można znaleźć wydajne podzespoły komputerowe renomowanych producentów. 
              Oferta sklepu umożliwia skonfigurowanie i zakup komputerów o optymalnej wydajności i atrakcyjnej cenie.
            </Typography>
            {isUserLogged==false &&
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Link to="/login" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                    <Button variant="contained" color="primary">
                      Zaloguj się
                    </Button>
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/register" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                    <Button variant="outlined" color="primary">
                      Zarejestruj się
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </div>}
          </Container>
        </div>
    );
}