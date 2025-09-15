import { createBrowserRouter, RouterProvider, useParams } from "react-router-dom";
import { Home } from "./Pages/Home";
import AboutPage from "./Pages/About";
import Login from "./Pages/Login";
import Meetings from "./Pages/Meetings";
import MeetingDetails from "./Pages/MeetingDetails";
import ProtectedRoutes from "./Components/ProtectedRoutes";
import { AdminLayout } from "./Dashboard/DashboardDesign/AdminLayout";
import { AdminDashBoard } from "./Pages/Dashboard/AdminDashboard";
import { ManageMeetings } from "./Dashboard/AdminDashboard/ManageMeetings";
import ManageAttendees from "./Dashboard/AdminDashboard/ManageAttendees";
import ManageTopics from "./Dashboard/AdminDashboard/ManageTopics";
import ManageSignatures from "./Dashboard/AdminDashboard/ManageSignatures";
import ManageOfficials from "./Dashboard/AdminDashboard/ManageOfficials";
import { ThemeProvider } from "./ThemeContext";
import ThemeToggle from "./ThemeToggle";

// Wrapper to extract meetingId from route params
const ManageAttendeesWrapper = () => {
  const { meetingId } = useParams<{ meetingId: string }>();
  if (!meetingId) return <div>Meeting ID is required</div>;
  return <ManageAttendees meetingId={meetingId} />;
}

const App = () => {
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/about", element: <AboutPage /> },
    { path: "/login", element: <Login /> },
    { path: "/meetings", element: <Meetings /> },
    { path: "/meetings/:id", element: <MeetingDetails /> },
    {
      path: "/Admindashboard",
      element: (
        <ProtectedRoutes>
          <AdminLayout />
        </ProtectedRoutes>
      ),
      children: [
        { index: true, element: <AdminDashBoard /> },
        { path: "AllOfficials", element: <ManageOfficials /> },
        { path: "AllMeetings", element: <ManageMeetings /> },
        { path: "AllAttendees", element: <ManageAttendees meetingId={""} /> },
        { path: "AllAttendees/:meetingId", element: <ManageAttendeesWrapper /> },
        { path: "AllTopics", element: <ManageTopics /> },
        { path: "AllSignatures", element: <ManageSignatures /> },
      ]
    },
    { path: "*", element: <Home /> },
  ]);

  return (
    <ThemeProvider>
      <div className="app">
        {/* Place toggle anywhere, for example top-right corner */}
        <ThemeToggle />
        <RouterProvider router={router} />
      </div>
    </ThemeProvider>
  );
};

export default App;
