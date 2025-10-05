import { ArrowRight } from "lucide-react"
import TransactionInfoCard from "./TransactionInfoCard"
import moment from "moment"

const RecentTransactions = ({ transactions, onMore }) => {
    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold">Recent Transactions</h4>

                <button className="card-btn" onClick={onMore}>
                    More <ArrowRight className="text-base" size={15} />
                </button>
            </div>

            <div className="mt-6">
                {
                    transactions?.slice(0, 5)?.map(item => (
                        <TransactionInfoCard
                            key={item.id}
                            title={item.name}
                            icon={item.icon}
                            data={moment(item.data).format("Do MMM YYYY")}
                            amount={item.amount}
                            type={item.type}
                            hideDeleteButton
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default RecentTransactions