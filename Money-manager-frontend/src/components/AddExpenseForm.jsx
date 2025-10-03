import { useEffect, useState } from "react"
import Input from "./Input";
import EmojiPickerPopup from "./EmojiPickerPopup";
import { LoaderCircle } from "lucide-react";

const AddExpenseForm = ({ categories, onAddExpense }) => {
    const [expense, setExpense] = useState({
        name: "",
        amount: "",
        date: "",
        icon: "",
        categoryId: ""
    });
    const [loading, setLoading] = useState(false);

    const categoryOptions = categories.map((category) => ({
        value: category.id,
        label: category.name
    }))

    const handleChange = (key, value) => {
        setExpense({ ...expense, [key]: value });
    }

    const handleAddExpense = async () => {
        setLoading(true);
        try {
            await onAddExpense(expense);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (categories.length > 0 && !expense.categoryId) {
            setExpense((prev) => ({ ...prev, categoryId: categories[0].id }))
        }
    }, [categories, expense.categoryId])

    return (
        <div className="">
            <EmojiPickerPopup
                icon={expense.icon}
                onSelect={(selectedIcon) => handleChange('icon', selectedIcon)}
            />

            <Input
                value={expense.name}
                onChange={({ target }) => handleChange('name', target.value)}
                label="Expense Source"
                placeHolder="e.g., Medical, Transportation, Bills, etc."
                type={"text"}
            />

            <Input
                label={"Category"}
                value={expense.categoryId}
                onChange={({ target }) => handleChange('categoryId', target.value)}
                isSelect={true}
                options={categoryOptions}
            />

            <Input
                label={"Amount"}
                value={expense.amount}
                onChange={({ target }) => handleChange('amount', target.value)}
                placeHolder={"e.g., 500.00"}
                type={"number"}
            />

            <Input
                label={"Date"}
                value={expense.date}
                onChange={({ target }) => handleChange('date', target.value)}
                placeHolder={""}
                type={"date"}
            />

            <div className="flex justify-end mt-6">
                <button onClick={handleAddExpense} className="add-btn add-btn-fill flex items-center gap-1" disabled={loading}>
                    {
                        loading ? (
                            <>
                                <LoaderCircle className="w-5 h-5 animate-spin" /> Adding...
                            </>
                        ) : (
                            <>
                                Add Expense
                            </>
                        )
                    }
                </button>
            </div>
        </div>
    )
}

export default AddExpenseForm