import {
  createBrowserRouter
} from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import AddExpense from "../pages/AddExpense/AddExpense";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Authentication/Login/Login";
import Register from "../pages/Authentication/Register/Register";
import EditExpense from "../pages/EditExpense/EditExpense";
import PrivateRoute from "../routes/PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute><RootLayout/></PrivateRoute>,
    children: [
        {
            index: true,
            Component: Home
        },
        {
            path: 'addExpense',
            Component: AddExpense
        },
        {
            path: 'editExpense/:id',
            Component: EditExpense
        }
    ]
  },
  {
    path: '/',
    Component: AuthLayout,
    children: [
      {
        path: 'login',
        Component: Login 
      },
      {
        path: 'register',
        Component: Register
      }
    ]
  }
]);