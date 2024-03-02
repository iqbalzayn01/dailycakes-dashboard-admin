import { Navigate } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

export default function Dashboard() {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/" replace={true} />;

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-grow">
        <Topbar />
        {/* Main Content */}
        <div className="p-4 flex-grow">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          {/* Add your dashboard content here */}
        </div>
      </div>
    </div>
  );
}
