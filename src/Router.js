/* eslint-disable */
import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Home from "./List";
import Details from "./Details";

const BasicExample = () => (
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route exact path="/details/:id" component={Details} />
    </div>
  </Router>
);

export default BasicExample;
