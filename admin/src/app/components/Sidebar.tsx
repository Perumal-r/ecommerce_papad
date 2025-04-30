const Sidebar = () => {
  return (
    <aside className="w-64 bg-white h-screen shadow-md p-6 space-y-6">
      <div className="text-2xl font-bold text-gray-800">GoMeal.</div>
      <nav className="space-y-4 text-gray-700">
        <a href="#" className="block hover:text-yellow-500 font-semibold">
          Dashboard
        </a>
        <a href="#">Menu</a>
        <a href="#">Food Order</a>
        <a href="#">Reviews</a>
        <a href="#">Setting</a>
      </nav>
      <div className="mt-auto p-4 bg-yellow-100 text-sm rounded">
        Upgrade your Account to get more benefits
        <button className="mt-2 block bg-yellow-400 px-3 py-1 rounded text-white">
          Upgrade
        </button>
      </div>
    </aside>
  );
};
export default Sidebar;
