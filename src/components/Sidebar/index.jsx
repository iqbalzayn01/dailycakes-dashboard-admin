export default function Sidebar() {
  return (
    <div className="bg-gray-800 text-white h-screen w-64 flex flex-col">
      <div className="p-4">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
      </div>
      <div className="flex-grow">
        <ul className="space-y-2">
          <li className="p-4 hover:bg-gray-700 cursor-pointer">Dashboard</li>
          <li className="p-4 hover:bg-gray-700 cursor-pointer">Products</li>
          <li className="p-4 hover:bg-gray-700 cursor-pointer">Reports</li>
        </ul>
      </div>
    </div>
  );
}
