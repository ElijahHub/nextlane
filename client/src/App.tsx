import { useContext, ReactNode } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Navbar, LeftBar, RightBar } from "./components";
import { Home, Profile, Login, Register } from "./pages";
import { DarkModeContext } from "./context/darkMode.context";
import { AuthContext } from "./context/auth.context";

const queryClient = new QueryClient();

const Layout = () => {
  const darkContext = useContext(DarkModeContext);

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Navbar />
        <div
          className={`flex  ${
            darkContext?.darkMode
              ? "bg-[#323235] text-gray-200"
              : "bg-white text-black"
          } `}
        >
          <LeftBar />
          <div
            className={`flex-6 p-4 ${
              darkContext?.darkMode ? "bg-[#323235]" : "bg-gray-100"
            } `}
          >
            <Outlet />
          </div>
          <RightBar />
        </div>
      </div>
    </QueryClientProvider>
  );
};

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const authContext = useContext(AuthContext);

  if (!authContext?.currentUser) return <Navigate to="/login" />;

  return children;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/profile/:id",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/sign-up",
    element: <Register />,
  },
]);

export default function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
