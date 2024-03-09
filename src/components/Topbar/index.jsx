import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearToken } from "../../redux/authSlice";

export default function Topbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(clearToken());
    navigate("/signin");
  };
  return (
    <div className="h-16 flex items-center justify-end px-4 border border-gray-300">
      <div className="flex items-center space-x-4">
        <div className="cursor-pointer hover:text-gray-300">User Profile</div>
        <div className="cursor-pointer hover:text-gray-300">Settings</div>
        <button
          onClick={handleSignOut}
          className="cursor-pointer hover:text-gray-300"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
