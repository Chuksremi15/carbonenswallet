import React, { Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { PrivateRoute } from "../components/PrivateRoute";
import Home from "./Onboarding/Home";
import Dashboard from "./Dashboard";
import Unlock from "./Unlock";

const Pages = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/unlock" component={Unlock} />
    </Switch>
  );
};

export default Pages;
