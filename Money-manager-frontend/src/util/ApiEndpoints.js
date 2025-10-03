export const BASE_URL = "http://localhost:8080/api/v1";

const CLOUDNARY_CLOUD_NAME = `${import.meta.env.VITE_CLOUDNARY_CLOUD_NAME}`;

export const API_ENDPOINTS = {
    LOGIN: "/login",
    REGISTER: "/register",
    UPLOAD_IMAGE: `https://api.cloudinary.com/v1_1/${CLOUDNARY_CLOUD_NAME}/image/upload`,
    GET_USER_INFO: "/profile",
    GET_ALL_CATEGORIES: "/categories/get",
    ADD_CATEGORY: "/categories/save",
    UPDATE_CATEGORY: (id) => `/categories/${id}/update`,
    GET_ALL_INCOMES: "/incomes/get",
    CATEGORY_BY_TYPE: (type) => `/categories/${type}/get`,
    ADD_INCOME: "/incomes/add",
    DELETE_INCOME: (incomeId) => `/incomes/${incomeId}`,
    INCOME_EXCEL_DOWNLOAD: '/excel/download/income',
    EMAIL_INCOME_DOWNLOAD: '/email/income-excel',
    EXPENSE_EXCEL_DOWNLOAD: '/excel/download/expense',
    EMAIL_EXPENSE_DOWNLOAD: '/email/expense-excel',
}