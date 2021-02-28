import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { useEffect } from "react";
import { auth } from "./firebase/firebase";
import { useAppSelector, useAppDispatch } from "./hooks/reduxHooks";
import { login, logout } from "./redux/user";

const Login = lazy(() => import("./views/pages/login/Login"));
const Layout = lazy(() => import("./containers/Layout"));

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { userLoged } = useAppSelector((state: any) => state.user);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(login());
      } else {
        dispatch(logout());
      }
    });
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("app.tsx - isUserLoged", userLoged);

  const userLoged2 = (
    <BrowserRouter>
      <Suspense fallback={<h1>🚧</h1>}>
        <Switch>
          <Route path="/" component={Layout} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );

  const userNotLoged = (
    <BrowserRouter>
      <Suspense fallback={<h1>🚧</h1>}>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Redirect from="/" to="/login" />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );

  return <>{userLoged ? userLoged2 : userNotLoged}</>;
};

export default App;

// TODO: add fallback component
