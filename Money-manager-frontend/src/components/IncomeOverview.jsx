import { useEffect, useState } from "react"
import { prepareIncomeLineChartData } from "../util/util";
import CustomeLineChart from "./CustomeLineChart";
import { Plus } from "lucide-react";

const IncomeOverview = ({ transactions, onAddIncome }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const result = prepareIncomeLineChartData(transactions);
        setChartData(result);

        return () => { };
    }, [transactions]);

    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <div>
                    <h5 className="text-lg font-medium">Income Overview</h5>

                    <p className="text-xs text-gray-400 mt-0.5">
                        Track your earnings overtime and analyze income trends
                    </p>
                </div>

                <button className="add-btn flex items-center gap-1" onClick={onAddIncome}>
                    <Plus size={20} className="text-lg" /> Add Income
                </button>
            </div>

            <div className="mt-10">
                <CustomeLineChart data={chartData} />
            </div>
        </div>
    )
}

export default IncomeOverview