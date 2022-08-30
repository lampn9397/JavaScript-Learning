import { appSnackBarRef } from "../constants";

export const readFile = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader);
        reader.onerror = error => reject(error);
    });
}

export const ValidateEmail = (mail) => {
    const emailRegExp = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
    if (emailRegExp.test(mail)) {
        return (true)
    }
    return (false)
}
export const apiErrorHandle = (error) => {
    const errorMessage = error.response?.data?.message ?? error.message;

    appSnackBarRef.current.open(errorMessage)

    return errorMessage
}