import { Plus } from "lucide-react";
import Dashboard from "../components/Dashboard"
import { useUser } from "../hooks/useUser";
import CategoryList from "../components/CategoryList";
import { useEffect, useState } from "react";
import axiosConfig from "../util/AxiosConfig";
import { API_ENDPOINTS } from "../util/ApiEndpoints";
import toast from "react-hot-toast";
import Model from "../components/Model";
import AddCategoryForm from "../components/AddCategoryForm";

const Category = () => {
    useUser();
    const [loading, setLoading] = useState(false);
    const [categoryData, setCategoryData] = useState([]);
    const [openAddCategoryModel, setOpenAddCategoryModel] = useState(false);
    const [openEditCategoryModel, setOpenEditCategoryModel] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const fetchCategories = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_CATEGORIES);
            if (response.status === 200) {
                console.log('Categories', response.data);
                setCategoryData(response.data);
            }
        } catch (error) {
            console.log('Something went wrong. Please try again.', error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <Dashboard activeMenu="Category">
            <div className="my-5 mx-auto">
                {/* Add Button to add category */}
                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-2xl font-semibold">All Categories</h2>

                    <button
                        onClick={() => setOpenAddCategoryModel(true)}
                        className="add-btn flex items-center gap-1 rounded-full">
                        <Plus size={16} /> Add Category
                    </button>
                </div>

                {/* Category list */}
                <CategoryList
                    categories={categoryData}
                />

                {/* Adding category model */}
                <Model
                    isOpen={openAddCategoryModel}
                    onClose={() => setOpenAddCategoryModel(false)}
                    title={"Add Category"}
                >
                    <AddCategoryForm />
                </Model>

                {/* Updating category model */}
            </div>
        </Dashboard>
    )
}

export default Category