import React, { Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { PrivateRoute } from "../../components/PrivateRoute";
import Home from "./Home";

const Dashboard = ({ match: { path } }) => {
  return (
    <Switch>
      <Route exact path={`${path}`}>
        <Home />
      </Route>
    </Switch>
  );
};

export default Dashboard;
