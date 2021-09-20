/* eslint-disable no-unused-vars */
import "./App.css";
import React from "react";
import { Helmet } from "react-helmet";
import EventDetailsPage from "./EventDetailsPage";
import RegistrationPage from "./RegistrationPage";
import { ProtectedRoute } from "./ProtectedRoute";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export function App() {
  React.useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <>
      <Helmet>
        <title>Zista Events</title>
      </Helmet>
      <Router>
        <Switch>
          <Route exact path="/" component={RegistrationPage} />
          <ProtectedRoute exact path="/event" component={EventDetailsPage} />
          <Route path="*" component={() => {
            return (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '30px' }}>
                <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', height: '300px', justifyContent: 'center', color: 'red', fontWeight: '700', fontFamily: 'Exo', fontSize: '2.5rem', border: '3px solid red', width: '500px' }}>
                  404 PAGE NOT FOUND
                  <img style={{width: '200px'}} src="https://cdn1.iconfinder.com/data/icons/color-bold-style/21/08-512.png" alt="Logo" />
                </div>
              </div>
            )
          }} />
        </Switch>
      </Router>
    </>
  );
}
