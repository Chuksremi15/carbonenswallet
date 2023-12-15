import React, { Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { PrivateRoute } from "../components/PrivateRoute";
import Home from "./Onboarding/Home";

const Pages = () => {
  return (
    <Switch>
      <Route path="/" component={Home} />
    </Switch>
  );
};

export default Pages;
