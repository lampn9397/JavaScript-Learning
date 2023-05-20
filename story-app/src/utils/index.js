import { notification } from "antd";

export const apiErrorHandle = (error) => {
    const errorMessage = error.response?.data?.message ?? error.message;

    notification.error({
        message: errorMessage,
    });

    return errorMessage
}

export const getChapterSlug = (chapterNumber) => {
    return `chuong-${chapterNumber}`
}

export const getChapterStatus = (chapterStatus) => {
    const chapterStatusLabel = {
        ON_GOING: 'Đang ra',
        COMPLETED: 'Đã hoàn thành',
        DROP: 'Đã hủy',
    }
    return chapterStatusLabel[chapterStatus]
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
