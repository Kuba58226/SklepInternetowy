import React, {useEffect, useImperativeHandle, useState} from 'react'
import {BrowserRouter as Router,Switch,Route,Link,Redirect} from "react-router-dom";
import Home from './views/Home';
import Login from './views/Login';
import Register from './views/Register';
import Category from './views/Category';
import Product from './views/Product';
import AdminPanel from './views/AdminPanel';
import AdminPanelCategories from './views/AdminPanelCategories';
import AdminPanelProducts from './views/AdminPanelProducts';
import {contextObject,AppContext} from './AppContext';

function App() {
  const [loggedIn,setLoggedIn] = useState(contextObject.isUserLogged)
  const [token,setToken] = useState(contextObject.jwtToken)
  const [role,setAccountType] = useState(contextObject.accountType)

  return (
    <Router>
      <AppContext.Provider value={{isUserLogged:loggedIn,toggleLoggedState:setLoggedIn,jwtToken:token,toggleTokenState:setToken,userRole:role,toggleRoleState:setAccountType}}>
        <Switch>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/register">
            <Register/>
          </Route>
          <Route path="/category/:categoryId/:page">
            <Category/>
          </Route>
          <Route path="/product/:productId">
            <Product/>
          </Route>
          <Route path="/admin-panel">
            <AdminPanel/>
          </Route>
          <Route path="/admin-panel-categories">
            <AdminPanelCategories/>
          </Route>
          <Route path="/admin-panel-products">
            <AdminPanelProducts/>
          </Route>
          <Route path="/">
            <Home/>
          </Route>
        </Switch>
      </AppContext.Provider>
    </Router>
  );
}

export default App;
