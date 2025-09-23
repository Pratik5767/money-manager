import Dashboard from "../components/Dashboard"
import { useUser } from "../hooks/useUser";

const Category = () => {
    useUser();

    return (
        <Dashboard activeMenu="Category">
            <div>This is category page</div>
        </Dashboard>
    )
}

export default Category