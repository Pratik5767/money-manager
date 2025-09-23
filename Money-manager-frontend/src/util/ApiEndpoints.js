export const BASE_URL = "http://localhost:8080/api/v1";

const CLOUDNARY_CLOUD_NAME = "dgjrebfv5";

export const API_ENDPOINTS = {
    LOGIN: "/login",
    REGISTER: "/register",
    UPLOAD_IMAGE: `https://api.cloudinary.com/v1_1/${CLOUDNARY_CLOUD_NAME}/image/upload`,
    GET_USER_INFO: "/profile",
    GET_ALL_CATEGORIES: "/categories/get"
}