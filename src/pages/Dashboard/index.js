import React, { Suspense, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { PrivateRoute } from "../../components/PrivateRoute";
import Home from "./Home";
import { useDispatch, useSelector } from "react-redux";
import { getWalletDetails } from "../../features/onboarding/onboardingSlice";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Dashboard = ({ match: { path } }) => {
  const dispatch = useDispatch();

  const history = useHistory();

  const { accounts } = useSelector((store) => {
    const { accounts } = store.onboarding;

    return {
      accounts,
    };
  });

  useEffect(() => {
    dispatch(getWalletDetails());
  }, [getWalletDetails]);

  useEffect(() => {
    if (accounts === null) history.push("/");
  }, [accounts]);

  return (
    <Switch>
      <Route exact path={`${path}`}>
        <Home />
      </Route>
    </Switch>
  );
};

export default Dashboard;
