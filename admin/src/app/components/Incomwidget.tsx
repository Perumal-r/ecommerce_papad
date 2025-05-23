'use client'

import { useOrderContext } from "./context/orderContext";

const IncomeWidget = () => {
  const { orderStatus } = useOrderContext();
  const grandTotal = orderStatus.reduce((sum, order) => sum + order.totalAmount, 0);

  return (
    <div className="bg-white p-4 rounded shadow col-span-3 flex justify-between items-center border-1 border-gray-200 w-full">
      <div>
        <h3 className="text-gray-500 text-sm">Total Income</h3>
        <p className="text-2xl font-bold">&#8377;{grandTotal}</p>
      </div>
      <div className="text-right space-y-2">
        <p className="text-green-500 font-semibold">
          Income: &#8377;4345 (+15%)
        </p>
        <p className="text-red-500 font-semibold">
          Expense: &#8377;2890 (-10%)
        </p>
        <button className="bg-green-700 px-4 py-2 rounded text-white hover:bg-green-600">
          Withdraw →
        </button>
      </div>
    </div>
  );
};
export default IncomeWidget;
