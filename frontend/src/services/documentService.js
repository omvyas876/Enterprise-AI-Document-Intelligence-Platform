import api from "./api";

export const uploadDocument = async (file) => {

    const formData = new FormData();

    formData.append("file", file);

    const response = await api.post(
        "/upload",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;
};

export const getDocuments = async () => {

    const response = await api.get("/documents");

    return response.data;
};

export const deleteDocument = async (filename) => {

    const response = await api.delete(
        `/documents/${filename}`
    );

    return response.data;
};

export const getDashboardData = async () => {

    const response = await api.get("/dashboard");

    return response.data;
};