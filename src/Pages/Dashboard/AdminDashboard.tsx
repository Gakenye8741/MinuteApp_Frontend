import { Navbar } from "../../Components/Navbar"
import { AdminLayout } from "../../Dashboard/DashboardDesign/AdminLayout"



export const AdminDashBoard = () => {
  return (
    <div className="h-screen mt-0">
      <Navbar/>
      <AdminLayout/>        
    </div>
  )
}
