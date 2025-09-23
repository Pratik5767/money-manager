import { useEffect, useState } from "react"
import Input from "./Input";
import EmojiPickerPopup from "./EmojiPickerPopup";
import { LoaderCircle } from "lucide-react";

const AddCategoryForm = ({ onAddCategory, initialCategoryData, isEditing }) => {
    const [category, setCategory] = useState({
        name: "",
        type: "income",
        icon: ""
    });
    const [loading, setLoading] = useState(false);

    const categoryTypeOptions = [
        { value: "income", label: "Income" },
        { value: "expense", label: "Expense" }
    ]

    const handleChange = (key, value) => {
        setCategory({ ...category, [key]: value })
    }

    const handleSubmit = async () => {
        setLoading(true);
        try {
            await onAddCategory(category);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (isEditing && initialCategoryData) {
            setCategory(initialCategoryData);
        } else {
            setCategory({ name: "", type: "income", icon: "" });
        }
    }, [isEditing, initialCategoryData]);

    return (
        <div className="p-4">
            <EmojiPickerPopup
                icon={category.icon}
                onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
            />

            <Input
                label="Category Name"
                value={category.name}
                onChange={({ target }) => handleChange("name", target.value)}
                placeHolder={"e.g. Freelance, Salary, Bonus, etc."}
                type={"text"}
            />

            <Input
                label="Category Type"
                value={category.type}
                onChange={({ target }) => handleChange("type", target.value)}
                isSelect={true}
                options={categoryTypeOptions}
            />

            <div className="flex justify-end mt-6">
                <button disabled={loading} type="button" onClick={handleSubmit} className="flex items-center gap-2 add-btn">
                    {
                        loading ? (
                            <>
                                <LoaderCircle className="w-5 h-5 animate-spin" />
                                {
                                    isEditing ? "Updating..." : "Adding..."
                                }
                            </>
                        ) : (
                            <>
                                {
                                    isEditing ? "Update Category" : "Add Category"
                                }
                            </>
                        )
                    }
                </button>
            </div>
        </div>
    )
}

export default AddCategoryForm