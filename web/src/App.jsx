import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom";

import Layout from "./components/layouts/Main";
import Dashboard from "./components/layouts/Dashboard";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import VerifyAcc from "./components/pages/VerifyAcc";

import RightPane from "./components/layouts/RightPane";
import MeetingList from "./components/MeetingList";
import MeetingForm from "./components/MeetingForm";

import "./App.css";
import ArchiveList from "./components/ArchiveList";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route path="dashboard" element={<Dashboard />}>
          <Route path="meetings-list" element={<RightPane />}>
            <Route index element={<MeetingList />} />
            <Route path="archived" element={<ArchiveList />} />
            <Route path="dashboard-meeting-form" element={<MeetingForm />} />
          </Route>
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Route>
      <Route path="/verify-account/:id/:verify_token" element={<VerifyAcc />} />
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
