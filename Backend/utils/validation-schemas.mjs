export const UserValidation = {
    TCno: {
        isLength: {
            options: {
                min: 11,
                max: 11,
            },
            errorMessage: "'T.C. NO' Must be 11 Digits!",
        },
        notEmpty: { 
            errorMessage: "'T.C. NO' Must Not be Empty!",
        },
        matches: {
            options: /^\d{11}$/,
            errorMessage: "'T.C. NO' Must Contain Only Number!",
        },
    },
    name: {
        notEmpty: { 
            errorMessage: "Name Must Not be Empty!",
        },
    },
    email: {
        notEmpty: { 
            errorMessage: "E-Mail Must Not be Empty!",
        },
    },
    password: {
        isLength: {
            options: {
                min: 8,
                max: 24,
            },
            errorMessage: "Password Must be at Least 8 - 24 Characters!",
        },
        notEmpty: { 
            errorMessage: "Password Must Not be Empty!",
        },
        matches: {
            options: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,24}$/,
            errorMessage: "Password Must Contain at Least One Uppercase Letter, One Lowercase Letter, and One Number!",
        },
    },
};

export const PasswordValidation = {
    password: {
        isLength: {
            options: {
                min: 8,
                max: 24,
            },
            errorMessage: "Password Must be at Least 8 - 24 Characters!",
        },
        notEmpty: { 
            errorMessage: "Password Must Not be Empty!",
        },
        matches: {
            options: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,24}$/,
            errorMessage: "Password Must Contain at Least One Uppercase Letter, One Lowercase Letter, and One Number!",
        },
    },
};