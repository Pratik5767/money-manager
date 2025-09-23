import Dashboard from "../components/Dashboard"
import { useUser } from "../hooks/useUser";

const Expense = () => {
    useUser();

    return (
        <Dashboard activeMenu="Expense">
            <div>This is Expense page</div>
        </Dashboard>
    )
}

export default Expense