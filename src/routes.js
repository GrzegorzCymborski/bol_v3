import React from "react";

const TestPage = React.lazy(() => import("./views/pages/testPage/TestPage"));

const routes = [
  { path: "/", exact: true },
  { path: "/dashboard/testPage", component: TestPage },
];

export default routes;
