import React, {useEffect, useImperativeHandle, useState} from 'react'
import {BrowserRouter as Router,Switch,Route,Link,Redirect} from "react-router-dom";
import Home from './views/Home';
import Login from './views/Login';
import Register from './views/Register';
import Category from './views/Category';
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
          <Route path="/">
            <Home/>
          </Route>
        </Switch>
      </AppContext.Provider>
    </Router>
  );
}

export default App;
