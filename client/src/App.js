/* eslint-disable no-unused-vars */
import "./App.css";
import React from "react";
import EventDetailsPage from "./EventDetailsPage";
import RegistrationPage from "./RegistrationPage";
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
      <Router>
        <Switch>
          <Route path="/event" component={EventDetailsPage} />
          <Route component={RegistrationPage} />
        </Switch>
      </Router>
    </>
  );
}
