import { useState } from "react"
import Input from "./Input";
import EmojiPickerPopup from "./EmojiPickerPopup";

const AddCategoryForm = () => {
    const [category, setCategory] = useState({
        name: "",
        type: "income",
        icon: ""
    });

    const categoryTypeOptions = [
        { value: "income", label: "Income" },
        { value: "expense", label: "Expense" }
    ]

    const handleChange = (key, value) => {
        setCategory({ ...category, [key]: value })
    }

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
                placeHolder={"e.g. Freelance, Salary, Bonous, etc."}
                type={"text"}
            />

            <Input
                label="Category Type"
                value={category.type}
                onChange={({ target }) => handleChange("type", target.value)}
                isSelect={true}
                options={categoryTypeOptions}
            />
        </div>
    )
}

export default AddCategoryForm