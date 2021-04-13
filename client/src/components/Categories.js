import React, {useContext, useEffect, useImperativeHandle, useState} from 'react'
import Toolbar from '@material-ui/core/Toolbar';
import {BrowserRouter as Router,Link,useLocation} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    toolbarSecondary: {
      justifyContent: 'space-between',
      overflowX: 'auto',
    },
    toolbarLink: {
      padding: theme.spacing(1),
      flexShrink: 0,
    },
  }));

export default function Header(props) {
    const classes = useStyles();

    const {Website} = require('../config/website.js');

    const [categories,setCategories] = useState([])

    useEffect(()=>{
        fetch(`${Website.serverName}category/get`,{method: "GET", headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',},
        })
        .then(response => response.json())
        .then(data => {
            const categories = data.categories.map(categories=>categories)
            setCategories(categories)
        })
    },[])

    return (
        <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
            {categories.map((section) => (
            <Link
                to={"/category/"+section.id+"/1"}
                color="primary"
                noWrap
                variant="body2"
                className={classes.toolbarLink}
                style={{ color: 'inherit', textDecoration: 'inherit'}}
            >
                {section.name}
            </Link>
            ))}
      </Toolbar>
    )
}