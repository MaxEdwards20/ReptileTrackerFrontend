import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HeaderNav from "./components/HeaderNav";
import CreateAccount from "./pages/CreateAccount";
import ProfilePage from "./pages/ProfilePage";
import SchedulesPage from "./pages/SchedulesPage";
import SignIn from "./pages/SignIn";
import HomePage from "./pages/HomePage";
import { DashboardPage } from "./pages/DashboardPage";
import { ReptilePage } from "./pages/ReptilePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HeaderNav />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "home", element: <HomePage /> },
      { path: "sign-in", element: <SignIn /> },
      { path: "schedules", element: <SchedulesPage /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "dashboard", element: <DashboardPage /> },
      { path: "reptiles", element: <ReptilePage /> },
      { path: "create-account", element: <CreateAccount /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
