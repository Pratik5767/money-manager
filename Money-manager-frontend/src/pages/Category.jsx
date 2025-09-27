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
                setCategoryData(response.data);
            }
        } catch (error) {
            console.log('Something went wrong. Please try again.', error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    const handleAddCategory = async (category) => {
        const { name, type, icon } = category;
        if (!name.trim()) {
            toast.error('Category name is required');
            return;
        }

        // check if already category already exists
        const isDuplicate = categoryData.some((category) => {
            return category.name.toLowerCase() === name.trim().toLowerCase();
        });
        if (isDuplicate) {
            toast.error('Category with this name already exists');
            return;
        }

        try {
            const response = await axiosConfig.post(API_ENDPOINTS.ADD_CATEGORY, { name, type, icon });
            if (response.status === 201) {
                toast.success('Category added successfully');
                setOpenAddCategoryModel(false);
                fetchCategories();
            }
        } catch (error) {
            console.log('Error adding category', error);
            toast.error(error.response?.data?.message || "Failed to add category.")
        }
    }

    const handleEditCategory = (categoryToEdit) => {
        setSelectedCategory(categoryToEdit);
        setOpenEditCategoryModel(true);
    }

    const handleUpdateCategory = async (updatedCategory) => {
        const { id, name, type, icon } = updatedCategory;
        if (!name.trim()) {
            toast.error('Category name is required');
            return;
        }
        if (!id) {
            toast.error('Category Id is missing for update');
            return;
        }

        try {
            await axiosConfig.put(API_ENDPOINTS.UPDATE_CATEGORY(id), { name, type, icon });
            setOpenEditCategoryModel(false);
            setSelectedCategory(null);
            toast.success('Category updated successfully');
            fetchCategories();
        } catch (error) {
            console.log("Error updating the category", error.response.data.message || error.message);
            toast.error(error.response?.data?.message, "Failed to update the category");
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
                        className="add-btn flex items-center gap-1">
                        <Plus size={16} /> Add Category
                    </button>
                </div>

                {/* Category list */}
                <CategoryList
                    categories={categoryData}
                    onEditCategory={handleEditCategory}
                />

                {/* Adding category model */}
                <Model
                    isOpen={openAddCategoryModel}
                    onClose={() => setOpenAddCategoryModel(false)}
                    title={"Add Category"}
                >
                    <AddCategoryForm onAddCategory={handleAddCategory} />
                </Model>

                {/* Updating category model */}
                <Model
                    isOpen={openEditCategoryModel}
                    onClose={() => {
                        setOpenEditCategoryModel(false);
                        setSelectedCategory(null);
                    }}
                    title={"Update Category"}
                >
                    <AddCategoryForm
                        initialCategoryData={selectedCategory}
                        onAddCategory={handleUpdateCategory}
                        isEditing={true}
                    />
                </Model>
            </div>
        </Dashboard>
    )
}

export default Category