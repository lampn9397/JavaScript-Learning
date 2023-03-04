export const apiErrorHandle = (error) => {
    const errorMessage = error.response?.data?.message ?? error.message;

    alert(errorMessage)

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