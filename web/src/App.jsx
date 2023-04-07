import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom";

import Layout from "./components/layouts/Main";
import Login from "./components/AuthPage/Login";
import Signup from "./components/AuthPage/Signup";
import Dashboard from "./components/Dashboard";

import "./App.css";
import VerifyAcc from "./components/AuthPage/VerifyAcc";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="verify-account/:id/:verify_token" element={<VerifyAcc />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
