import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Navbar } from "../../Components/Navbar";
import { AdminLayout } from "../../Dashboard/DashboardDesign/AdminLayout";
export const AdminDashBoard = () => {
    return (_jsxs("div", { className: "h-screen mt-0", children: [_jsx(Navbar, {}), _jsx(AdminLayout, {})] }));
};
