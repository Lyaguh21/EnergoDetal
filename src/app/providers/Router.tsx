import { createBrowserRouter, RouterProvider } from "react-router";
import MainLayout from "../../layout/MainLayout";
import About from "../../pages/About/About.page";
import Error404 from "../../pages/Errors/Error404.page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <About />,
      },
    ],
  },
  {
    path: "*",
    element: <Error404 />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
