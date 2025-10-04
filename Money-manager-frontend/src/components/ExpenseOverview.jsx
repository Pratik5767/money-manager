import { useEffect, useState } from "react"
import { prepareExpenseLineChartData } from "../util/util";
import CustomeLineChart from "./CustomeLineChart";
import { Plus } from "lucide-react";

const ExpenseOverview = ({ transactions, onAddExpense }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const result = prepareExpenseLineChartData(transactions);
        setChartData(result);

        return () => { };
    }, [transactions]);

    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <div>
                    <h5 className="text-lg font-medium">Expense Overview</h5>

                    <p className="text-xs text-gray-400 mt-0.5">
                        Track your spendings overtime and analyze expense trends
                    </p>
                </div>

                <button className="add-btn flex items-center gap-1" onClick={onAddExpense}>
                    <Plus size={20} className="text-lg" /> Add Expense
                </button>
            </div>

            <div className="mt-10">
                <CustomeLineChart data={chartData} />
            </div>
        </div>
    )
}

export default ExpenseOverview