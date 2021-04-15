import React, {useContext, useEffect, useImperativeHandle, useState} from 'react'
import {BrowserRouter as Router,Link,useLocation,useParams} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Navbar from '../components/Navbar';
import Categories from '../components/Categories';
import Footer from '../components/Footer';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';

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

export default function Category() {
    const classes = useStyles();

    const {Website} = require('../config/website.js');

    let params = useParams();

    const [product,setProduct] = useState([])

    useEffect(()=>{
        fetch(`${Website.serverName}product/get/${params.productId}`,{method: "GET", headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',},
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.product)
            setProduct(data.product)
        })
    },[])

    return (
        <React.Fragment>
            <Navbar/>
            <Categories/>

            <Container className={classes.cardGrid} maxWidth="md">
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={product.img}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {product.name}
                    </Typography>
                    <Typography>
                      {product.short_description}
                    </Typography>
                    <Typography color="primary">
                      {product.price+'zł'}
                    </Typography>
                    <Button variant="contained" color="primary">
                        Dodaj do koszyka
                    </Button>
                  </CardContent>
                </Card>
            </Container>
            
            <Footer/>
        </React.Fragment>
    );
  }