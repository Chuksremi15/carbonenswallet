import { Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

export const PrivateRoute = ({
  component: Comp,
  path,
  redirectedPath = "/login",
  ...rest
}) => {
  const { location } = useHistory();
  const dispatch = useDispatch();

  const { token, isLoggedIn } = useSelector((state) => {
    const { token, isLoggedIn } = state.userData;

    return { token, isLoggedIn };
  });

  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        return token && isLoggedIn ? (
          <Comp {...props} />
        ) : (
          <Redirect
            to={{
              pathname: redirectedPath,
              state: {
                prevLocation: location.pathname,
                error: "Unauthorized Access!",
              },
            }}
          />
        );
      }}
    />
  );
};
