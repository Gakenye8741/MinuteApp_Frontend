import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    const { meetingId } = useParams();
    if (!meetingId)
        return _jsx("div", { children: "Meeting ID is required" });
    return _jsx(ManageAttendees, { meetingId: meetingId });
};
const App = () => {
    const router = createBrowserRouter([
        { path: "/", element: _jsx(Home, {}) },
        { path: "/about", element: _jsx(AboutPage, {}) },
        { path: "/login", element: _jsx(Login, {}) },
        { path: "/meetings", element: _jsx(Meetings, {}) },
        { path: "/meetings/:id", element: _jsx(MeetingDetails, {}) },
        {
            path: "/Admindashboard",
            element: (_jsx(ProtectedRoutes, { children: _jsx(AdminLayout, {}) })),
            children: [
                { index: true, element: _jsx(AdminDashBoard, {}) },
                { path: "AllOfficials", element: _jsx(ManageOfficials, {}) },
                { path: "AllMeetings", element: _jsx(ManageMeetings, {}) },
                { path: "AllAttendees", element: _jsx(ManageAttendees, { meetingId: "" }) },
                { path: "AllAttendees/:meetingId", element: _jsx(ManageAttendeesWrapper, {}) },
                { path: "AllTopics", element: _jsx(ManageTopics, {}) },
                { path: "AllSignatures", element: _jsx(ManageSignatures, {}) },
            ]
        },
        { path: "*", element: _jsx(Home, {}) },
    ]);
    return (_jsx(ThemeProvider, { children: _jsxs("div", { className: "app", children: [_jsx(ThemeToggle, {}), _jsx(RouterProvider, { router: router })] }) }));
};
export default App;
