import React, {useContext, useEffect, useImperativeHandle, useState} from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory
} from "react-router-dom";
import {AppContext} from '../AppContext';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Copyright from '../components/Copyright';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const {Website} = require('../config/website.js');

  const classes = useStyles();
  let history = useHistory();

  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")
  const [submitPassword,setSubmitPassword] = useState("")
  const [email,setEmail] = useState("")

  const {isUserLogged,toggleLoggedState,jwtToken,toggleTokenState,userRole,toggleRoleState} = useContext(AppContext)

  function handleOnChangeUsername(e){
    setUsername(e.target.value)
  }

  function handleOnChangePassword(e){
    setPassword(e.target.value)
  }

  function handleOnChangeSubmitPassword(e){
    setSubmitPassword(e.target.value)
  }

  function handleOnChangeEmail(e){
    setEmail(e.target.value)
  }

  function handleOnSubmit(e){
    e.preventDefault()
    fetch(`${Website.serverName}auth/register`,{method: "POST", headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',},
    body: JSON.stringify({name:username,email: email, password: password,password_confirmation:submitPassword})})
    .then(response => response.json())
    .then(data => {
        if (data.success===true){
            history.push("/");
        }
    })
  }

  return (
    <div>
    {!isUserLogged ?
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Zarejestruj się
          </Typography>
          <form onSubmit={handleOnSubmit} className={classes.form} noValidate>
            <TextField onChange={handleOnChangeUsername}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Nazwa użytkownika"
                name="username"
                autoComplete="username"
                autoFocus
            />
            <TextField onChange={handleOnChangeEmail}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="E-mail"
            name="email"
            autoComplete="email"
            />
            <TextField onChange={handleOnChangePassword}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Hasło"
            type="password"
            id="password"
            autoComplete="current-password"
            />
            <TextField onChange={handleOnChangeSubmitPassword}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Potwierdź Hasło"
            type="password"
            id="password"
            autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Zarejestruj się
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Zapomniałeś hasła?
                </Link>
              </Grid>
              <Grid item>
                <Link to='/login'>
                    {"Masz już konto? Zaloguj się"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
      : <Redirect to="/" />}
    </div>
  );
}