import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { useEffect } from "react";
import { auth } from "./firebase/firebase";
import { useAppSelector, useAppDispatch } from "./hooks/reduxHooks";
import { login, logout } from "./redux/user";
import Spinner from "./components/spinner/Spinner";

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

  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={userLoged ? Layout : Login} />
          <Route path="*" render={() => <Redirect to="/" />} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
