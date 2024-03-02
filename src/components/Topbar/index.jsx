export default function Topbar() {
  return (
    <div className="bg-gray-800 text-white h-16 flex items-center justify-between px-4">
      <div>Logo</div>
      <div className="flex items-center space-x-4">
        <div className="cursor-pointer hover:text-gray-300">User Profile</div>
        <div className="cursor-pointer hover:text-gray-300">Settings</div>
        <div className="cursor-pointer hover:text-gray-300">Sign Out</div>
      </div>
    </div>
  );
}
