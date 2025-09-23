import Dashboard from "../components/Dashboard"
import { useUser } from "../hooks/useUser";

const Filter = () => {
    useUser();

    return (
        <Dashboard activeMenu="Filters">
            <div>This is Filter page</div>
        </Dashboard>
    )
}

export default Filter