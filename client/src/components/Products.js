import React, {useContext, useEffect, useImperativeHandle, useState} from 'react'
import {BrowserRouter as Router,Switch,Route,Link,Redirect} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {useDispatchCart} from './Cart';

const useStyles = makeStyles((theme) => ({
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
}));

export default function HeroUnit() {
    const classes = useStyles();

    const {Website} = require('../config/website.js');

    const [products,setProducts] = useState([])

    const dispatch = useDispatchCart();

    function addToCart(product) {
      dispatch({type: "ADD", item: product})
    }

    useEffect(()=>{
      fetch(`${Website.serverName}product/get-random/9`,{method: "GET", headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',},
      })
      .then(response => response.json())
      .then(data => {
          const products = data.products.map(products=>products)
          setProducts(products)
      })
  },[])

    return (
        <Container className={classes.cardGrid} maxWidth="md">
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
                      {card.price+'z??'}
                    </Typography>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
    );
}