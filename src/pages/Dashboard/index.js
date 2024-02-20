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

  const { accounts, getWalletDetaillsLoading, isUnlocked } = useSelector(
    (store) => {
      const { accounts, getWalletDetaillsLoading, isUnlocked } =
        store.onboarding;

      return {
        accounts,
        getWalletDetaillsLoading,
        isUnlocked,
      };
    }
  );

  useEffect(() => {
    dispatch(getWalletDetails());
  }, [getWalletDetails]);

  useEffect(() => {
    if (!getWalletDetaillsLoading) {
      if (accounts !== null) {
        if (isUnlocked) {
          history.push("/dashboard");
        } else {
          history.push("/unlock");
        }
      } else {
        history.push("/");
      }
    }
  }, [accounts, getWalletDetaillsLoading]);

  return (
    <Switch>
      <Route exact path={`${path}`}>
        <Home />
      </Route>
    </Switch>
  );
};

export default Dashboard;
