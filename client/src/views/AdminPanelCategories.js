import React, {useContext, useEffect, useImperativeHandle, useState} from 'react'
import AdminPanelNavbar from './../components/AdminPanelNavbar';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {AppContext} from '../AppContext';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {BrowserRouter as Router,Switch,Route,Link,Redirect} from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 400,
  },
}));

export default function AdminPanelCategories() {
  const {isUserLogged,toggleLoggedState,jwtToken,toggleTokenState,userRole,toggleRoleState} = useContext(AppContext)

  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const {Website} = require('../config/website.js');

  const [categories,setCategories] = useState([])
  const [categoryName,setCategoryName] = useState("")
  const [toggleCategoryRefresh,setToggleCategoryRefresh] = useState(true)

  function handleOnChangeCategoryName(e){
    setCategoryName(e.target.value)
  }

  function handleOnSubmit(e){
    e.preventDefault()
    fetch(`${Website.serverName}category/create`,{method: "POST", headers: {
      'Authorization': 'Bearer '+jwtToken,
      Accept: 'application/json',
      'Content-Type': 'application/json',},
    body: JSON.stringify({name: categoryName})})
    .then(response => response.json())
    .then(data => {
      if (data.success===true){
        console.log(data)
        setToggleCategoryRefresh(!toggleCategoryRefresh)
      }
    })
  }

  useEffect(()=>{
    fetch(`${Website.serverName}category/get`,{method: "GET", headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',},
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.categories)
        setCategories(data.categories)
    })
  },[toggleCategoryRefresh])

  return (
    userRole==='admin'?
    <div className={classes.root}>
      <AdminPanelNavbar/>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={12}>
              <Paper className={fixedHeightPaper}>
                <List>
                {categories.map((category) => (
                  <ListItem>
                    <ListItemText primary={category.name} />
                  </ListItem>
                ))}
                </List>
              </Paper>
              <Paper className={fixedHeightPaper}>
              <form onSubmit={handleOnSubmit} className={classes.form} noValidate>
                <TextField onChange={handleOnChangeCategoryName}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="categoryName"
                  label="Nazwa kategorii"
                  name="categoryName"
                  autoComplete="categoryName"
                  autoFocus
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Dodaj kategorię
                </Button>
              </form>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
    :<Redirect to="/"/>
  );
}