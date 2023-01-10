export const apiErrorHandle = (error) => {
    const errorMessage = error.response?.data?.message ?? error.message;

    alert(errorMessage)

    return errorMessage
}