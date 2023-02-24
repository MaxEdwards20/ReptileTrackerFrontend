import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HeaderNav } from "./components/HeaderNav";
import ProfilePage from "./pages/ProfilePage";
import SchedulesPage from "./pages/SchedulesPage";
import SignIn from "./pages/SignIn";
import { WelcomePage } from "./pages/WelcomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HeaderNav />,
    children: [
      { path: "", element: <WelcomePage /> },
      { path: "/sign-in", element: <SignIn /> },
      { path: "schedules", element: <SchedulesPage /> },
      { path: "profile", element: <ProfilePage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
