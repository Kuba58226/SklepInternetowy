import React, {useContext, useEffect, useImperativeHandle, useState} from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import Navbar from '../components/Navbar';
import Categories from '../components/Categories';
import Footer from '../components/Footer';
import {BrowserRouter as Router,Link,useLocation,useParams} from "react-router-dom";
import { useHistory } from "react-router-dom";
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Slider from '@material-ui/core/Slider';
import {useDispatchCart} from './../components/Cart';

import Box from '@material-ui/core/Box';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  wrapper: {
    display: 'flex',
  },
  slider: {
    width: '95%',
  },
}));

function valuetext(value) {
  return `${value}??C`;
}

export default function Category() {
    const classes = useStyles();
    let history = useHistory();
    const [open, setOpen] = React.useState(true);

    let params = useParams();

    const {Website} = require('../config/website.js');

    const [products,setProducts] = useState([])
    const [category,setCategory] = useState([])
    const [pages,setPages] = useState(0)

    const dispatch = useDispatchCart();

    function addToCart(product) {
      dispatch({type: "ADD", item: product})
    }

    const [price, setPrice] = React.useState([params.minPrice, params.maxPrice]);

    const handlePriceChange = (event, newValue) => {
      setPrice(newValue);
    };

    const filter = () => {
      history.push(`/category/${params.categoryId}/${params.page}/${price[0]}/${price[1]}`);
    };

    useEffect(()=>{
      setPrice([params.minPrice, params.maxPrice])
    },[params.categoryId,params.page,params.minPrice,params.maxPrice])

    useEffect(()=>{
          fetch(`${Website.serverName}category/get/${params.categoryId}`,{method: "GET", headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',},
        })
        .then(response => response.json())
        .then(data => {
            setCategory(data.category)
        })
    },[params.categoryId,params.page,params.minPrice,params.maxPrice])

    useEffect(()=>{
          fetch(`${Website.serverName}product/get-by-category/${params.categoryId}/${params.minPrice}/${params.maxPrice}?page=${params.page}`,{method: "GET", headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',},
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const products = data.products.data.map(products=>products)
            setProducts(products)
            setPages(data.products.last_page)
        })
    },[params.categoryId,params.page,params.minPrice,params.maxPrice])

    return (
      <React.Fragment>
        <CssBaseline />
        <Navbar/>
        <Categories/>
        <div className={classes.wrapper}>
        <Drawer
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
        open={open}
        >
            <List>
            <ListItem>
              <Typography id="range-slider" gutterBottom>
                Cena
              </Typography>
            </ListItem>
            <ListItem>
              <Slider className={classes.slider}
                value={price}
                onChange={handlePriceChange}
                max = {15000}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                getAriaValueText={valuetext}
              />
            </ListItem>
            <ListItem>
              <Button onClick={filter} variant="contained" color="primary">
                Filtruj
              </Button>
            </ListItem>
            </List>
        </Drawer>

        <Box 
          display="flex" 
          alignItems="center"
          justifyContent="center"
          width='100%'
        >
        <main className={classes.content}>
        <div className={classes.appBarSpacer}/>
            <Container maxWidth="md" className={classes.cardGrid}>
            <Typography align='center' variant="h2" component="h3">
                {category.name}
            </Typography>
            <Grid container spacing={4}>
                {products.map((card) => (
                    <Grid item key={card} xs={12} sm={6} md={4}>
                    <Card className={classes.card}>
                      <CardMedia
                        className={classes.cardMedia}
                        image={card.img}
                        title="Image title"
                      />
                      <CardContent className={classes.cardContent}>
                      <Link to={`/product/${card.id}`} style={{ color: 'inherit', textDecoration: 'inherit'}}>
                          <Typography gutterBottom variant="h5" component="h2">
                              {card.name}
                          </Typography>
                        </Link>
                        <Typography>
                          {card.short_description}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button onClick={() => addToCart(card)} size="small" color="primary">
                          <ShoppingCartIcon/>
                        </Button>
                        <Typography size="small" color="primary">
                          {card.price+"z??"}
                        </Typography>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
                </Grid>
            </Container>

            <Box 
              display="flex" 
              alignItems="center"
              justifyContent="center"
              width='100%'
            >
            <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
              {Array.from({length: pages}, (_, i) => i + 1).map((button)=>(
                <Link to={`/category/${params.categoryId}/${button}/${params.minPrice}/${params.maxPrice}`}>
                  <Button>{button}</Button>
                </Link>
              ))}
            </ButtonGroup>
            </Box>

        </main>
        </Box>
        </div>
        <Footer/>
      </React.Fragment>
    );
  }