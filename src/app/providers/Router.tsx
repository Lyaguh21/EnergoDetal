import { createBrowserRouter, RouterProvider } from "react-router";
import MainLayout from "../../layout/MainLayout";
import About from "../../pages/About/About.page";
import Error404 from "../../pages/Errors/Error404.page";
import Products from "../../pages/Products/Products.page";
import Gallery from "../../pages/Gallery/Gallery.page";
import Contacts from "../../pages/Contacts/Contacts.page";
import ExecutionProduct from "../../pages/Products/ExecutionProduct.page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <About />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/products/:BlueprintId",
        element: <ExecutionProduct />,
      },
      {
        path: "/gallery",
        element: <Gallery />,
      },
      {
        path: "/contacts",
        element: <Contacts />,
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
