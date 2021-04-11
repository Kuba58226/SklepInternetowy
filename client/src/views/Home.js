import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Navbar from '../components/Navbar';
import HeroUnit from '../components/HeroUnit';
import Products from '../components/Products';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Navbar/>
      <main>
        <HeroUnit/>
        <Products/>
      </main>
      <Footer/>
    </React.Fragment>
  );
}