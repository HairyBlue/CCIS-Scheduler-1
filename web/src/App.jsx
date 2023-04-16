import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom";

import Layout from "./components/layouts/Main";
import Navbar from "./components/layouts/Navbar";
import RightPane from "./components/layouts/RightPane";

import Dashboard from "./components/pages/Dashboard/Dashboard";
import MeetingList from "./components/pages/Dashboard/MeetingList";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import VerifyAcc from "./components/pages/VerifyAcc";
import Table from "./components/pages/Table";
import MeetingForm from "./components/pages/MeetingForm";

import getAllMeetings from "./utils/admin/getAllMeetings";
import getAllArchivedMeetings from "./utils/admin/getAllArchivedMeetings";

import "./App.css";
import TeacherForm from "./components/pages/TeacherForm";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route path="dashboard" element={<Dashboard />}>
          <Route path="meetings-list" element={<RightPane />}>
            <Route index element={<MeetingList />} />
            <Route
              path="archived"
              element={<MeetingList url="my-archive-meetings/creator" />}
            />
            <Route path="dashboard-meeting-form" element={<MeetingForm />} />
          </Route>
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Route>
      <Route path="/verify-account/:id/:verify_token" element={<VerifyAcc />} />
      <Route path="admin" element={<Navbar />}>
        <Route
          index
          element={<Table title="Meetings" callbackFn={getAllMeetings} />}
        />
        <Route
          path="archived-meetings"
          element={
            <Table
              title="Archived Meetings"
              callbackFn={getAllArchivedMeetings}
            />
          }
        />
        <Route
          path="list-of-venues"
          element={<Table title="Venues" callbackFn={getAllArchivedMeetings} />}
        />
        <Route
          path="list-of-students"
          element={
            <Table title="Students" callbackFn={getAllArchivedMeetings} />
          }
        />
        <Route
          path="list-of-teachers"
          element={
            <Table title="Teachers" callbackFn={getAllArchivedMeetings} />
          }
        />
        <Route path="add-teacher" element={<TeacherForm />} />
      </Route>
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
