import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import { RouterProvider, createBrowserRouter,Outlet } from "react-router-dom";

import App from "./App.jsx";
import About from "./Components/About";
import Contacts from "./Components/Contacts";
import "./index.css";
import Errorcomp from "./Components/Errorcomp.jsx";
import Body from "./Components/Body.jsx";
import RestaurantMenu from "./Components/RestaurantMenu.jsx";

const appRouter = createBrowserRouter([
  { path: "/", 
    element: <App /> ,
    errorElement:<Errorcomp />,
    children:[
      {
        path:"/",
        element:<Body />
      },
      { path: "/about",
         element: <About /> 
        },
      { path: "/contacts", 
       element: <Contacts />
       },
       {
        path:"/restaurants/:resId",
        element:<RestaurantMenu />
       }
    ]
  }
  
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={appRouter} />
  </StrictMode>
);
