import CountDisplay from "./components/countDisplay";
import OrderRateChart from "./components/OrderRateChart";
import PerformanceDonut from "./components/PopularFoodChart";
import IncomeWidget from "./components/Incomwidget";

export default function Sidebar() {
  return (
    <>
      <div className="p-4 sm:ml-60">
        <div className=" rounded-lg dark:border-gray-700">
          {/* Count cards */}
          <CountDisplay />

          {/* Income and other widgets */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <IncomeWidget />
            {/* Add other widgets here */}
          </div>

          {/* Charts section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
            <OrderRateChart />
            <PerformanceDonut />
          </div>
        </div>
      </div>
    </>
  );
}
