import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./Pages/Home";
import AboutPage from "./Pages/About";
import Login from "./Pages/Login";
import Meetings from "./Pages/Meetings"; // Meeting list page
import MeetingDetails from "./Pages/MeetingDetails"; // Meeting details page
import ProtectedRoutes from "./Components/ProtectedRoutes";
import { AdminLayout } from "./Dashboard/DashboardDesign/AdminLayout";
import { AdminDashBoard } from "./Pages/Dashboard/AdminDashboard";
import { ManageMeetings } from "./Dashboard/AdminDashboard/ManageMeetings";
import ManageAttendees from "./Dashboard/AdminDashboard/ManageAttendees";
import { useParams } from "react-router-dom";

// Wrapper to extract meetingId from route params and pass to ManageAttendees
const ManageAttendeesWrapper = () => {
  const { meetingId } = useParams<{ meetingId: string }>();
  if (!meetingId) return <div>Meeting ID is required</div>;
  return <ManageAttendees meetingId={meetingId} />;
}
import ManageTopics from "./Dashboard/AdminDashboard/ManageTopics";
import ManageSignatures from "./Dashboard/AdminDashboard/ManageSignatures";
import ManageOfficials from "./Dashboard/AdminDashboard/ManageOfficials";


// import Error from "./Pages/Error"; // optional

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/about",
      element: <AboutPage />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/meetings",
      element: <Meetings />, // List of meetings
    },
    {
      path: "/meetings/:id",
      element: <MeetingDetails />, // Details page for a single meeting
    },
    {
      path: "/Admindashboard",
      element: (
        <ProtectedRoutes>
          <AdminLayout />
        </ProtectedRoutes>
      ),
      // errorElement: <Error />,
      children: [
        { index: true, element: <AdminDashBoard /> }, // default at /Admindashboard
        { path: "AllOfficials", element: <ManageOfficials /> },
        { path: "AllMeetings", element: <ManageMeetings /> },
        { path: "AllAttendees", element: <ManageAttendees meetingId={""} /> },
        { path: "AllAttendees/:meetingId", element: <ManageAttendeesWrapper /> },
        { path: "AllTopics", element: <ManageTopics /> },
        { path: "AllSignatures", element: <ManageSignatures /> },
      ]
    },
    {
      path: "*",
      element: <Home />, // fallback for unknown routes
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
