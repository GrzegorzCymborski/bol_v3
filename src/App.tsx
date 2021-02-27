import React, { lazy, Suspense } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";

const Login = lazy(() => import("./views/pages/login/Login"));
const Layout = lazy(() => import("./containers/Layout"));

const App: React.FC = () => {
  return (
    <HashRouter>
      <Suspense fallback={<h1>🚧</h1>}>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route path="/" component={Layout} />
        </Switch>
      </Suspense>
    </HashRouter>
  );
};

export default App;

// TODO: add fallback component
