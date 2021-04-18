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
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
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
    height: 550,
  },
}));

export default function AdminPanelProducts() {
  const {isUserLogged,toggleLoggedState,jwtToken,toggleTokenState,userRole,toggleRoleState} = useContext(AppContext)

  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const {Website} = require('../config/website.js');

  const [products,setProducts] = useState([])
  const [categories,setCategories] = useState([])
  const [productName,setProductName] = useState("")
  const [category,setCategory] = useState("")
  const [price,setPrice] = useState("")
  const [img,setImg] = useState("")
  const [description,setDescription] = useState("")
  const [short_description,setShortDescription] = useState("")
  const [toggleProductRefresh,setToggleProductRefresh] = useState(true)

  function handleOnChangeCategory(e){
    setCategory(e.target.value)
  }

  function handleOnChangeProductName(e){
    setProductName(e.target.value)
  }

  function handleOnChangePrice(e){
    setPrice(e.target.value)
  }

  function handleOnChangeImg(e){
    setImg(e.target.value)
  }

  function handleOnChangeDescription(e){
    setDescription(e.target.value)
  }

  function handleOnChangeShortDescription(e){
    setShortDescription(e.target.value)
  }

  function handleOnSubmit(e){
    e.preventDefault()
    fetch(`${Website.serverName}product/create`,{method: "POST", headers: {
      'Authorization': 'Bearer '+jwtToken,
      Accept: 'application/json',
      'Content-Type': 'application/json',},
    body: JSON.stringify({name: productName,
      category_id: category,
      price: price,
      img: img,
      description: description,
      short_description: short_description})})
    .then(response => response.json())
    .then(data => {
      if (data.success===true){
        console.log(data)
        setToggleProductRefresh(!toggleProductRefresh)
      }
    })
  }

  useEffect(()=>{
    fetch(`${Website.serverName}product/get`,{method: "GET", headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',},
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.products)
        setProducts(data.products)
    })
  },[toggleProductRefresh])

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
  },[])

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
                {products.map((product) => (
                  <ListItem>
                    <ListItemText primary={product.name} />
                  </ListItem>
                ))}
                </List>
              </Paper>
              <Paper className={fixedHeightPaper}>
              <form onSubmit={handleOnSubmit} className={classes.form} noValidate>
                <InputLabel id="label">Kategoria</InputLabel>
                <Select labelId="label" id="select" onChange={handleOnChangeCategory} style={{minWidth: 200}}>
                    {categories.map((category) => (
                        <MenuItem value={category.id}>{category.name}</MenuItem>
                    ))}
                </Select>
                <TextField onChange={handleOnChangeProductName}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="productName"
                  label="Nazwa produktu"
                  name="productName"
                  autoComplete="productName"
                  autoFocus
                />
                <TextField onChange={handleOnChangePrice}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="price"
                  label="Cena"
                  name="price"
                  autoComplete="price"
                />
                <TextField onChange={handleOnChangeImg}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="img"
                  label="URL obrazu"
                  name="img"
                  autoComplete="img"
                />
                <TextField onChange={handleOnChangeDescription}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="description"
                  label="Opis"
                  name="description"
                  autoComplete="description"
                />
                <TextField onChange={handleOnChangeShortDescription}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="short_description"
                  label="Krótki opis"
                  name="short_description"
                  autoComplete="short_description"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Dodaj produkt
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