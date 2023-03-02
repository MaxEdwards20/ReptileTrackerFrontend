import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import HeaderNav from "../components/HeaderNav";
import CreateAccount from "../pages/CreateAccount";
import { DashboardPage } from "../pages/DashboardPage";
import HomePage from "../pages/HomePage";
import ProfilePage from "../pages/ProfilePage";
import { ReptilePage } from "../pages/ReptilePage";
import SchedulesPage from "../pages/SchedulesPage";
import SignIn from "../pages/SignIn";

type RoutePath =
  | "home"
  | "dashboard"
  | "schedules"
  | "profile"
  | "reptiles"
  | "sign-in"
  | "create-account";

const pathPageMap: Record<RoutePath, JSX.Element> = {
  home: <HomePage />,
  dashboard: <DashboardPage />,
  schedules: <SchedulesPage />,
  profile: <ProfilePage />,
  reptiles: <ReptilePage />,
  "sign-in": <SignIn />,
  "create-account": <CreateAccount />,
};

export const unAuthRoutes: RoutePath[] = ["home", "sign-in", "create-account"];
export const authRoutes: RoutePath[] = [
  ...unAuthRoutes,
  "schedules",
  "profile",
  "dashboard",
  "reptiles",
];

export const authRouter = createBrowserRouter([
  {
    path: "/",
    element: <HeaderNav auth={true} />,
    errorElement: <Navigate to="home" replace />,
    children: [...generateRouteObjects(authRoutes)],
  },
]);

export const unAuthRouter = createBrowserRouter([
  {
    path: "/",
    element: <HeaderNav />,
    errorElement: <Navigate to="home" replace />,
    children: [...generateRouteObjects(unAuthRoutes)],
  },
]);

function generateRouteObjects(routes: RoutePath[]): RouteObject[] {
  return routes.map((route) => {
    return {
      path: route,
      element: pathPageMap[route],
    };
  });
}
