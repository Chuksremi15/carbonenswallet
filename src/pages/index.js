import React, { Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { PrivateRoute } from "../components/PrivateRoute";
import Home from "./Onboarding/Home";
import Dashboard from "./Dashboard";

const Pages = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/dashboard" component={Dashboard} />
    </Switch>
  );
};

export default Pages;
