import { RouterProvider } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { authRouter, unAuthRouter } from "./utils/routes";
import { UnAuthContext } from "./context/UnAuthContext";
import { useUserInfo } from "./utils/hooks";

function App() {
  const { user, setUser, logout } = useUserInfo();

  return (
    <>
      {user ? (
        <AuthContext.Provider value={{ user, setUser, logout }}>
          <RouterProvider router={authRouter} />
        </AuthContext.Provider>
      ) : (
        <UnAuthContext.Provider value={{ setUser }}>
          <RouterProvider router={unAuthRouter} />
        </UnAuthContext.Provider>
      )}
    </>
  );
}

export default App;
