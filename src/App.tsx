import React, { lazy, Suspense } from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "./firebase/firebase";

const Login = lazy(() => import("./views/pages/login/Login"));
const Layout = lazy(() => import("./containers/Layout"));

const App: React.FC = () => {
  const [isUserLoged, setUserLoged] = useState(false);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUserLoged(!!user);
      if (user) {
        setUserLoged(!!user);
      }
    });
    return unsubscribe;
  }, []);

  console.log("app.tsx - isUserLoged", isUserLoged);

  const userLoged = (
    <HashRouter>
      <Suspense fallback={<h1>🚧</h1>}>
        <Switch>
          <Route path="/" component={Layout} />
        </Switch>
      </Suspense>
    </HashRouter>
  );

  const userNotLoged = (
    <HashRouter>
      <Suspense fallback={<h1>🚧</h1>}>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Redirect from="/" to="/login" />
        </Switch>
      </Suspense>
    </HashRouter>
  );

  return <>{isUserLoged ? userLoged : userNotLoged}</>;
};

export default App;

// TODO: add fallback component
