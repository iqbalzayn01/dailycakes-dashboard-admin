import { SidebarNavItem } from "./SidebarNavItem";

export default function Sidebar() {
  return (
    <div className="h-screen w-64 flex flex-col border border-gray-300 rounded-e-xl">
      <div className="p-4">
        <h1 className="font-bold text-2xl uppercase tracking-wider">
          DailyCakes <i className="text-blue-500">Admin</i>
        </h1>
      </div>
      <div className="flex-grow">
        <SidebarNavItem />
      </div>
    </div>
  );
}
