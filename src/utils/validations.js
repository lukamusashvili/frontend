export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const doPasswordsMatch = (password, passwordRepeat) => {
    return password === passwordRepeat;
};
