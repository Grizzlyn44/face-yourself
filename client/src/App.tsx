import "./styles/main.scss";
import axios from "axios/axios";
import React, { Component, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  RouteProps
} from "react-router-dom";
import { useSelector } from "react-redux";
import { rootReducerType } from "reducers/index"

// const authReducer = useSelector((state:rootReducerType) => state.authReducer);

import LandingPage from "components/LandingPage/LandingPage"
import Dashboard from "components/Dashboard/Dashboard"
import Header from "components/core/Header/Header"

interface x {
  component: Component;
}

const App = () => {

  const PrivateRoute = (props: RouteProps) => {
    const { component: Component, ...rest } = props
    const authReducer = useSelector((state:rootReducerType) => state.authReducer)
    const { isSignedIn } = authReducer
    const { location } = {...props}

    console.log("private", isSignedIn, {...props})
    return (
        <Route
          {...rest}
          render={props => isSignedIn ? <Component {...props} /> : <Redirect to={{ pathname: "/signedin", state: { from: location } }} />}
        />
    );
  };

  return (
    <Router>
      <div className='main'>
        <Header />
        <Switch>
          <Route path="/" exact component={LandingPage} />
          <Route path="/home" exact component={LandingPage} />
          <PrivateRoute path="/dashboard" exact component={Dashboard} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;


//struktury

interface user {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  isDeleted: boolean;
  createdAt: Date;
  lastUpdatedAt: Date;
  deletedAt: Date | null;
}

// uživatel se regne

// uživatel se logne

// můžu si přidat basic todos -> to bude KATEOGIRE COMMON

// můžu si vytvořit kateogirii -> název, barva, ikonka

// do přidané kategorie si můžu přidat TODO

// můžu si vytvořit long-time goal
// to bude asi jen na statistiky/ v tabu -> takže to nebude TODO

// todo většina se bude držet, ALE může se naplánovat na konkrétní den(dny) který/é se pak ohou opakovat
