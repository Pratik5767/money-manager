import { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard"
import { useUser } from "../hooks/useUser";
import axiosConfig from "../util/AxiosConfig";
import { API_ENDPOINTS } from "../util/ApiEndpoints";
import toast from "react-hot-toast";
import IncomeList from "../components/IncomeList";
import Model from "../components/Model";
import AddIncomeForm from "../components/AddIncomeForm";
import DeleteAlert from "../components/DeleteAlert";
import IncomeOverview from "../components/IncomeOverview";
import ExpenseOverview from "../components/ExpenseOverview";
import ExpenseList from "../components/ExpenseList";
import AddExpenseForm from "../components/AddExpenseForm";

const Expense = () => {
    useUser();
    const [expenseData, setExpenseData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openAddExpenseModel, setOpenAddExpenseModel] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        show: false,
        data: null
    });

    // fetch income details from the api
    const fetchExpenseDetails = async () => {
        if (loading) return;

        setLoading(true);
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_EXPENSES);
            if (response.status === 200) {
                setExpenseData(response.data);
            }
        } catch (error) {
            console.log('Failed to fetch the expense details: ', error)
            toast.error(error.response?.data?.message || "Failed to fetch expense details");
        } finally {
            setLoading(false);
        }
    }

    // fetch categories for an income
    const fetchExpenseCatgories = async () => {
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.CATEGORY_BY_TYPE("expense"));
            if (response.status === 200) {
                setCategoryData(response.data);
            }
        } catch (error) {
            console.log('Failed to fetch the expense categories', error);
            toast.error(error.data.message || 'Failed to fetch expense categories')
        }
    }

    // save income details
    const handleAddExpense = async (expense) => {
        const { name, amount, date, icon, categoryId } = expense;
        // validation
        if (!name.trim()) {
            toast.error('name is required');
            return;
        }
        if (!amount || isNaN(amount) || Number(amount) <= 0) {
            toast.error('amount should be a valid number greater than 0');
            return;
        }
        if (!date) {
            toast.error('Please select a date');
            return;
        }
        const today = new Date().toISOString().split('T')[0];
        if (date > today) {
            toast.error('Date cannot be in future');
            return;
        }
        if (!categoryId) {
            toast.error('category is required');
            return;
        }
        try {
            const response = await axiosConfig.post(API_ENDPOINTS.ADD_EXPENSE, {
                name,
                amount: Number(amount),
                date,
                icon,
                categoryId
            })
            if (response.status === 201) {
                setOpenAddExpenseModel(false);
                toast.success("Expense added successfully");
                fetchExpenseDetails()
                fetchExpenseCatgories();
            }
        } catch (error) {
            console.log("Error adding expense", error);
            toast.error(error.message.data.response || "Failed to add expense");
        }
    }

    // delete income detail
    const deleteExpense = async (id) => {
        try {
            await axiosConfig.delete(API_ENDPOINTS.DELETE_EXPENSE(id));
            setOpenDeleteAlert({ show: false, data: null });
            toast.success('Expense deleted successfully');
            fetchExpenseDetails();
        } catch (error) {
            console.log('Error deleting the expense', error);
            toast.error(error.response.data.message || 'Failed to delete an expense');
        }
    }

    const handleDownloadExpenseDetails = async () => {
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.EXPENSE_EXCEL_DOWNLOAD, {
                responseType: 'blob'
            });
            console.log(response);
            let fileName = "expense_details.xlsx";
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
            toast.success('expense details Downloaded');
        } catch (error) {
            console.log('Error downloading the expense details: ', error);
            toast.error(error.response?.data?.message || 'Failed to download expense details');
        }
    }

    const handleEmailExpenseDetails = async () => {
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.EMAIL_EXPENSE_DOWNLOAD);
            if (response.status === 200) {
                toast.success('expense details emailed');
            }
        } catch (error) {
            console.log('Error emailing the expense details: ', error);
            toast.error(error.response?.data?.message || 'Failed to email expense details');
        }
    }

    useEffect(() => {
        fetchExpenseDetails();
        fetchExpenseCatgories();
    }, [])

    return (
        <Dashboard activeMenu="Expense">
            <div className="my-5 mx-auto">
                <div className="grid grid-cols-1 gap-6">
                    <div>
                        {/* overview for expense with line chart */}
                        <ExpenseOverview
                            transactions={expenseData}
                            onAddExpense={() => setOpenAddExpenseModel(true)}
                        />
                    </div>

                    <ExpenseList
                        transactions={expenseData}
                        onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
                        onDownload={handleDownloadExpenseDetails}
                        onEmail={handleEmailExpenseDetails}
                    />

                    {/* Add Expense Model */}
                    <Model
                        isOpen={openAddExpenseModel}
                        onClose={() => setOpenAddExpenseModel(false)}
                        title={"Add Expense"}
                    >
                        <AddExpenseForm
                            categories={categoryData}
                            onAddExpense={(expense) => handleAddExpense(expense)}
                        />
                    </Model>

                    {/* Delete Expense Model */}
                    <Model
                        isOpen={openDeleteAlert.show}
                        onClose={() => setOpenDeleteAlert({ show: false, data: null })}
                        title={"Delete Expense"}
                    >
                        <DeleteAlert
                            content={"Are you sure want to delete this expense detail?"}
                            onDelete={() => deleteExpense(openDeleteAlert.data)}
                        />
                    </Model>
                </div>
            </div>
        </Dashboard>
    )
}

export default Expense