import React from "react";

const Dashboard = React.lazy(() => import("./views/pages/dashboard/Dashboard"));
const TestPage = React.lazy(() => import("./views/pages/testPage/TestPage"));

const routes = [
  { path: "/", exact: true },
  { path: "/dashboard/testPage", component: TestPage },
  { path: "/dashboard", exact: true, component: Dashboard },
];

export default routes;
