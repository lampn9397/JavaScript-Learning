import { StoryStatusLabel } from "../constants";
import { notification } from "antd";

export const apiErrorHandle = (error) => {
    const errorMessage = error.response?.data?.message ?? error.message;

    notification.error({
        message: errorMessage,
    });

    return errorMessage
}

export const getStoryStatusLabel = (storyStatus) => {
    return StoryStatusLabel[storyStatus]
}

export const getGenderLabel = (gender) => {
    const Gender = {
        MALE: 'Nam',
        FEMALE: 'Nữ',
        OTHER: 'Khác',
    }
    return Gender[gender]
}

export const getUserDisplayName = (user) => {
    return user?.name || user?.username
}

export const readFile = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader);
        reader.onerror = error => reject(error);
    });
}




