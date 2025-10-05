import { Coins, Wallet } from "lucide-react";
import Dashboard from "../components/Dashboard"
import InfoCard from "../components/InfoCard";
import { useUser } from "../hooks/useUser"
import { addThousandsSeparator } from "../util/util";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosConfig from "../util/AxiosConfig";
import { API_ENDPOINTS } from "../util/ApiEndpoints";
import toast from "react-hot-toast";
import RecentTransactions from "../components/RecentTransactions";
import FinanceOverview from "../components/FinanceOverview";
import Transactions from "../components/Transactions";

const Home = () => {
    useUser();
    const navigate = useNavigate();
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchDashboardData = async () => {
        if (loading) true;
        setLoading(true)

        try {
            const response = await axiosConfig.get(API_ENDPOINTS.DASHBOARD_DATA);
            if (response.status === 200) {
                setDashboardData(response.data);
            }
        } catch (error) {
            console.log('Something went wrong while fetching dashboard data', error);
            toast.error('Something went wrong');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchDashboardData();
        return () => { };
    }, []);

    return (
        <div>
            <Dashboard activeMenu="Dashboard">
                <div className="my-5 mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Display the card */}
                        <InfoCard
                            icon={<Wallet />}
                            label={"Total balance"}
                            value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
                            color="bg-purple-800"
                        />

                        <InfoCard
                            icon={<Coins />}
                            label={"Total Income"}
                            value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
                            color="bg-green-800"
                        />

                        <InfoCard
                            icon={<Coins />}
                            label={"Total Expense"}
                            value={addThousandsSeparator(dashboardData?.totalExpense || 0)}
                            color="bg-red-800"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        {/* Recent Transactions */}
                        <RecentTransactions
                            transactions={dashboardData?.recentTransaction}
                            onMore={() => navigate("/expense")}
                        />

                        {/* Finance Overview Chart */}
                        <FinanceOverview
                            totalBalance={dashboardData?.totalBalance || 0}
                            totalIncome={dashboardData?.totalIncome || 0}
                            totalExpense={dashboardData?.totalExpense || 0}
                        />

                        {/* Expense Transactions */}
                        <Transactions
                            transactions={dashboardData?.recent5Expenses || []}
                            onMore={() => navigate('/expense')}
                            type="expense"
                            title="Recent Expense"
                        />

                        {/* Income Transactions */}
                        <Transactions
                            transactions={dashboardData?.recent5Incomes || []}
                            onMore={() => navigate('/income')}
                            type="income"
                            title="Recent Income"
                        />
                    </div>
                </div>
            </Dashboard>
        </div>
    )
}

export default Home