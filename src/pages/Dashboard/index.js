import React, { Suspense, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { PrivateRoute } from "../../components/PrivateRoute";
import Home from "./Home";
import { useDispatch, useSelector } from "react-redux";
import { getWalletDetails } from "../../features/onboarding/onboardingSlice";

const Dashboard = ({ match: { path } }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWalletDetails());
  }, [getWalletDetails]);
  return (
    <Switch>
      <Route exact path={`${path}`}>
        <Home />
      </Route>
    </Switch>
  );
};

export default Dashboard;
