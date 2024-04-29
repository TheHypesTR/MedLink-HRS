// Kullanıcı kaydı sırasında kullanılacak şema.
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
            errorMessage: "'T.C. NO' Must Contain Only Digits!",
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

// Şifre sıfırlamada kullanılacak şema.
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

// Hastane eklerken kullanılacak şema.
export const HospitalValidation = {
    name: {
        isLength: {
            options: {
                min: 12,
                max: 64,
            },
            errorMessage: "Hospital Name Must be at Least 12 - 64 Characters!",
        },
        notEmpty: {
            errorMessage: "Hospital Name Must Not be Empty!", 
        },
    },
    city: {
        isLength: {
            options: {
                min: 3,
                max: 14,
            },
            errorMessage: "City Name Must be at Least 3 - 14 Characters!",
        },
        notEmpty: {
            errorMessage: "City Name Must Not be Empty!",
        },
    },
    district: {
        isLength: {
            options: {
                min: 3,
                max: 22,
            },
            errorMessage: "District Name Must be at Least 3 - 22 Characters!",
        },
        notEmpty: {
            errorMessage: "District Name Must Not be Empty!",
        },
    },
    address: {
        isLength: {
            options: {
                min: 24,
                max: 96,
            },
            errorMessage: "Address Must be at Least 24 - 96 Characters!",
        },
        notEmpty: {
            errorMessage: "Address Must Not be Empty!",
        },
    },
};