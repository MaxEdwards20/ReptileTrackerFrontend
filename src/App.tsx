import { RouterProvider } from "react-router-dom";
import { useState } from "react";
import { User } from "./api/models";
import { AuthContext } from "./context/AuthContext";
import { authRouter, unAuthRouter } from "./utils/routes";
import { UnAuthContext } from "./context/UnAuthContext";

function App() {
  const [user, setUser] = useState<User>();

  return (
    <>
      {user ? (
        <AuthContext.Provider value={{ user, setUser }}>
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
