import React from "react";

const Dashboard = React.lazy(() => import("./views/pages/dashboard/Dashboard"));
const UploadEANs = React.lazy(() =>
  import("./views/pages/uploadEANs/UploadEANs")
);
const Combine2 = React.lazy(() =>
  import("./views/pages/combineFiles/CombineFiles")
);
const TrackedPage = React.lazy(() =>
  import("./views/pages/trackedPage/TrackedPage")
);
const SearchPage = React.lazy(() =>
  import("./views/pages/searchPage/SearchPage")
);

const routes = [
  { path: "/", exact: true, component: Dashboard },
  { path: "/dashboard/search", component: SearchPage },
  { path: "/dashboard/tracked", component: TrackedPage },
  { path: "/dashboard", exact: true, component: Dashboard },
  { path: "/dashboard/utils/combine2", component: Combine2 },
  { path: "/dashboard/utils/uploadEAN", component: UploadEANs },
];

export default routes;
