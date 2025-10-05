import { addThousandsSeparator } from "../util/util";
import CustomePieChart from "./CustomePieChart"

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {
    const COLORS = ["#591688", "#a0090e", "#016630"];

    const balanceData = [
        { name: 'Total Balance', amount: totalBalance },
        { name: 'Total Expenses', amount: totalExpense },
        { name: 'Total Income', amount: totalIncome },
    ];

    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg font-semibold">Financial Overview</h5>
            </div>

            <CustomePieChart
                data={balanceData}
                label="Total Balance"
                totalAmount={`₹${addThousandsSeparator(totalBalance)}`}
                colors={COLORS}
                showTextAnchor
            />
        </div>
    )
}

export default FinanceOverview