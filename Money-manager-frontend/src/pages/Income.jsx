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

const Income = () => {
    useUser();
    const [incomeData, setIncomeData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openAddIncomeModel, setOpenAddIncomeModel] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        show: false,
        data: null
    });

    // fetch income details from the api
    const fetchIncomeDetails = async () => {
        if (loading) return;

        setLoading(true);
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_INCOMES);
            if (response.status === 200) {
                setIncomeData(response.data);
            }
        } catch (error) {
            console.log('Failed to fetch the income details: ', error)
            toast.error(error.response?.data?.message || "Failed to fetch income details");
        } finally {
            setLoading(false);
        }
    }

    // fetch categories for an income
    const fetchIncomeCatgories = async () => {
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.CATEGORY_BY_TYPE("income"));
            if (response.status === 200) {
                console.log('income categories', response.data)
                setCategoryData(response.data);
            }
        } catch (error) {
            console.log('Failed to fetch the income categories', error);
            toast.error(error.data.message || 'Failed to fetch income categories')
        }
    }

    // save income details
    const handleAddIncome = async (income) => {
        const { name, amount, date, icon, categoryId } = income;
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
            const response = await axiosConfig.post(API_ENDPOINTS.ADD_INCOME, {
                name,
                amount: Number(amount),
                date,
                icon,
                categoryId
            })
            if (response.status === 201) {
                setOpenAddIncomeModel(false);
                toast.success("Income added successfully");
                fetchIncomeDetails();
                fetchIncomeCatgories();
            }
        } catch (error) {
            console.log("Error adding income", error);
            toast.error(error.message.data.response || "Failed to add income");
        }
    }

    // delete income detail
    const deleteIncome = async (id) => {
        try {
            await axiosConfig.delete(API_ENDPOINTS.DELETE_INCOME(id));
            setOpenDeleteAlert({ show: false, data: null });
            toast.success('Income deleted successfully');
            fetchIncomeDetails();
        } catch (error) {
            console.log('Error deleting the income', error);
            toast.error(error.response.data.message || 'Failed to delete an income');
        }
    }

    const handleDownloadIncomeDetails = async () => {
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.INCOME_EXCEL_DOWNLOAD, {
                responseType: 'blob'
            });
            console.log(response);
            let fileName = "income_details.xlsx";
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
            toast.success('income details Downloaded');
        } catch (error) {
            console.log('Error downloading the income details: ', error);
            toast.error(error.response?.data?.message || 'Failed to download income');
        }
    }

    const handleEmailIncomeDetails = async () => {
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.EMAIL_INCOME_DOWNLOAD);
            if (response.status === 200) {
                toast.success('Income details emailed');
            }
        } catch (error) {
            console.log('Error emailing the income details: ', error);
            toast.error(error.response?.data?.message || 'Failed to email income');
        }
    }

    useEffect(() => {
        fetchIncomeDetails();
        fetchIncomeCatgories();
    }, [])

    return (
        <Dashboard activeMenu="Income">
            <div className="my-5 mx-auto">
                <div className="grid grid-cols-1 gap-6">
                    <div>
                        {/* overview for income with line chart */}
                        <IncomeOverview
                            transactions={incomeData}
                            onAddIncome={() => setOpenAddIncomeModel(true)}
                        />
                    </div>

                    <IncomeList
                        transactions={incomeData}
                        onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
                        onDownload={handleDownloadIncomeDetails}
                        onEmail={handleEmailIncomeDetails}
                    />

                    {/* Add Income Model */}
                    <Model
                        isOpen={openAddIncomeModel}
                        onClose={() => setOpenAddIncomeModel(false)}
                        title={"Add Income"}
                    >
                        <AddIncomeForm
                            categories={categoryData}
                            onAddIncome={(income) => handleAddIncome(income)}
                        />
                    </Model>

                    {/* Delete Income Model */}
                    <Model
                        isOpen={openDeleteAlert.show}
                        onClose={() => setOpenDeleteAlert({ show: false, data: null })}
                        title={"Delete Income"}
                    >
                        <DeleteAlert
                            content={"Are you sure want to delete this income detail?"}
                            onDelete={() => deleteIncome(openDeleteAlert.data)}
                        />
                    </Model>
                </div>
            </div>
        </Dashboard>
    )
}

export default Income