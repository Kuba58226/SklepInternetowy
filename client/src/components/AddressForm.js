import React, {useContext, useEffect, useImperativeHandle, useState} from 'react'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import {useCart} from './Cart';
import {AppContext} from '../AppContext';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 30,
    },
    button: {
        margin: 30,
    },
}));

export default function AddressForm() {
  const classes = useStyles();
  const cart = useCart();
  const {Website} = require('../config/website.js');
  const {isUserLogged,toggleLoggedState,jwtToken,toggleTokenState,userRole,toggleRoleState} = useContext(AppContext)

  const [firstName,setFirstName] = useState("");
  const [lastName,setLastName] = useState("");
  const [address1,setAddress1] = useState("");
  const [address2,setAddress2] = useState("");
  const [city,setCity] = useState("");
  const [state,setState] = useState("");
  const [postalCode,setPostalCode] = useState("");
  const [country,setCountry] = useState("");

  function handleOnChangeFirstName(e){
    setFirstName(e.target.value)
  }

  function handleOnChangeLastName(e){
    setLastName(e.target.value)
  }

  function handleOnChangeAddress1(e){
    setAddress1(e.target.value)
  }

  function handleOnChangeAddress2(e){
    setAddress2(e.target.value)
  }

  function handleOnChangeCity(e){
    setCity(e.target.value)
  }

  function handleOnChangeState(e){
    setState(e.target.value)
  }

  function handleOnChangePostalCode(e){
    setPostalCode(e.target.value)
  }

  function handleOnChangeCountry(e){
    setCountry(e.target.value)
  }

  function submitOrder(){
    fetch(`${Website.serverName}order/create`,{method: "POST", headers: {
      'Authorization': 'Bearer '+jwtToken,
      Accept: 'application/json',
      'Content-Type': 'application/json',},
    body: JSON.stringify({
      cart: cart,
      firstName: firstName,
      lastName: lastName,
      address1: address1,
      address2: address2,
      city: city,
      state: state,
      postalCode: postalCode,
      country: country,
    })})
    .then(response => response.json())
    .then(data => {
        console.log(data)
    })
  }

  return (
    <Box className={classes.root}>
      <Typography variant="h6" gutterBottom>
        Dane do dostawy
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField onChange={handleOnChangeFirstName}
            required
            id="firstName"
            name="firstName"
            label="Imię"
            fullWidth
            autoComplete="given-name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField onChange={handleOnChangeLastName}
            required
            id="lastName"
            name="lastName"
            label="Nazwisko"
            fullWidth
            autoComplete="family-name"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField onChange={handleOnChangeAddress1}
            required
            id="address1"
            name="address1"
            label="Adres"
            fullWidth
            autoComplete="shipping address-line1"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField onChange={handleOnChangeAddress2}
            id="address2"
            name="address2"
            label="Adres"
            fullWidth
            autoComplete="shipping address-line2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField onChange={handleOnChangeCity}
            required
            id="city"
            name="city"
            label="Miejscowość"
            fullWidth
            autoComplete="shipping address-level2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField onChange={handleOnChangeState} id="state" name="state" label="Województwo" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField onChange={handleOnChangePostalCode}
            required
            id="zip"
            name="zip"
            label="Kod pocztowy"
            fullWidth
            autoComplete="shipping postal-code"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField onChange={handleOnChangeCountry}
            required
            id="country"
            name="country"
            label="Kraj"
            fullWidth
            autoComplete="shipping country"
          />
        </Grid>
        <Button onClick={submitOrder} className={classes.button} variant="contained" color="primary">
            Potwierdź zamówienie
        </Button>
      </Grid>
    </Box>
  );
}