import React, {useContext, useEffect, useImperativeHandle, useState} from 'react'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {useCart} from './../components/Cart';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        width: 800,
    },
    img: {
        width: 177,
        height: 100,
    },
    product: {
        margin: 10,
    },
    products: {
        // width: 'auto',
        // height: '300px',
        margin: 30
    },
    details: {
        width: 600,
    },
    summary: {
        width: 300,
        height: 400,
        margin: 30,
        display: 'flex',
    },
    summaryGrid: {
        width: '100%'
    },
    checkoutButton: {
        marginBottom: 10
    }
}));

export default function CartView() {
    const classes = useStyles();

    const cart = useCart();

    function calculateTotalPrice(cart){
        let price=0
        for (const element of cart) {
            price+=parseFloat(element.price)*parseInt(element.count)
        }
        return price.toFixed(2);
    }

    const totalPrice = calculateTotalPrice(cart);

    return (
        <div>
            <Navbar/>
            <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            >
                <Paper className={classes.products}>
                    <Typography variant="h5">
                        {`Koszyk (${cart.length})`}
                    </Typography>
                    {cart.map((item)=>(
                        <Card className={classes.root}>
                            <Box display="flex">
                                <Box className={classes.product} display="flex">
                                    <CardMedia className={classes.img}
                                    image={item.img}
                                    />
                                    <Grid className={classes.details}
                                    container
                                    direction="column"
                                    justify="center"
                                    alignItems="center"
                                    >
                                        <Typography variant="h6">
                                            {item.name}
                                        </Typography>
                                        <div>Ilość: {item.count}</div>
                                        <div>Cena/szt: {item.price}</div>
                                        <Button size="small" variant="contained" color="secondary">
                                            Usuń
                                        </Button>
                                    </Grid>
                                </Box>
                            </Box>
                        </Card>
                    ))}
                </Paper>

                <Paper className={classes.summary}>
                    <Grid className={classes.summaryGrid}
                    container
                    direction="column"
                    justify="space-between"
                    alignItems="center"
                    >
                        <Typography variant="h5">
                            Podsumowanie
                        </Typography>
                        <Typography variant="h6">
                            Koszt zamówienia: {totalPrice}zł
                        </Typography>
                        <Typography variant="h6">
                            Koszt dostawy: Gratis
                        </Typography>
                        <Button className={classes.checkoutButton} variant="contained" color="primary">
                          Potwierdź zamówienie
                        </Button>
                    </Grid>
                </Paper>
            </Grid>
            <Footer/>
        </div>
    )
}