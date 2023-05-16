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
import getAllStudents from "./utils/admin/getAllStudents";
import getAllTeachers from "./utils/admin/getAllTeachers";
import getAllVenues from "./utils/admin/getAllVenues";

import "./App.css";
import TeacherForm from "./components/pages/TeacherForm";
import VenueForm from "./components/pages/VenueForm";
import DeclineForm from "./components/pages/DeclineForm";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route path="dashboard" element={<Dashboard />}>
          {/* Student Route */}
          <Route path="student/meetings-list" element={<RightPane />}>
            <Route index element={<MeetingList />} />
            <Route
              path="upcoming"
              element={<MeetingList url="my-meetings/creator" />}
            />
            <Route
              path="archived"
              element={<MeetingList url="my-archive-meetings/creator" />}
            />
            <Route path="dashboard-meeting-form" element={<MeetingForm />} />
          </Route>
          {/* Teacher Route */}
          <Route path="teacher/meetings-list" element={<RightPane />}>
            <Route index element={<MeetingList url="pending-meetings" />} />
            <Route
              path="archived"
              element={<MeetingList url="archive-meetings" />}
            />
            <Route
              path="upcoming"
              element={<MeetingList url="my-meetings" />}
            />
            <Route path="dashboard-meeting-form" element={<MeetingForm />} />
          </Route>
          <Route path=":code/decline-form" element={<RightPane />}>
            <Route index element={<DeclineForm />} />
          </Route>
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Route>
      <Route path="/verify-account/:id/:verify_token" element={<VerifyAcc />} />
      {/* Admin Route */}
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
          element={<Table title="Venues" callbackFn={getAllVenues} />}
        />
        <Route
          path="list-of-students"
          element={<Table title="Students" callbackFn={getAllStudents} />}
        />
        <Route
          path="list-of-teachers"
          element={<Table title="Teachers" callbackFn={getAllTeachers} />}
        />
        <Route path="add-teacher" element={<TeacherForm />} />
        <Route path="add-venue" element={<VenueForm />} />
      </Route>
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
