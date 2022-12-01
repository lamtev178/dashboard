import BoxTypes from "../pages/BoxTypes/BoxTypes";
import Home from "../pages/Home/Home";
import { BOXES_ROUTE, BOX_TYPES_ROUTE } from "./routes";

export const ROUTES = [
  {
    path: BOXES_ROUTE,
    component: <Home />,
  },
  {
    path: BOX_TYPES_ROUTE,
    component: <BoxTypes />,
  },
];
