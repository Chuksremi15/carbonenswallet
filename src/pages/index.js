import React, { Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { PrivateRoute } from "../components/PrivateRoute";
import Home from "./Onboarding/Home";
import Dashboard from "./Dashboard";
import Unlock from "./Unlock";
import Test from "./test";

const Pages = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/unlock" component={Unlock} />
      <Route path="/test" component={Test} />
    </Switch>
  );
};

export default Pages;
