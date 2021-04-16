import React, {useContext, useEffect, useImperativeHandle, useState} from 'react'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {useCart} from './../components/Cart';

export default function CartView() {
    const cart = useCart();

    return (
        <div>
            <Navbar/>
            {cart.map((item)=>(
                <div>
                <div>Nazwa: {item.name}</div>
                <div>Ilość: {item.count}</div>
                <div>Cena/szt: {item.price}</div>
                </div>
            ))}
            <Footer/>
        </div>
    )
}