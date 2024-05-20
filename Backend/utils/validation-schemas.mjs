// Kullanıcı Kayıt İşlemi Sırasında Kullanılacak Doğrulama Şeması.
export const UserValidation = {
    TCno: {
        isLength: {
            options: {
                min: 11,
                max: 11,
            },
            errorMessage: "'T.C. NO' Must be 11 Numbers!",
        },
        matches: {
            options: /^\d{11}$/,
            errorMessage: "'T.C. NO' Must Contain Only Numbers!",
        },
    },
    name: {
        isLength: {
            options: {
                min: 6,
                max: 36,
            },
            errorMessage: "'Name' Must be at Least 6 - 36 Characters!"
        },
    },
    email: {
        notEmpty: { 
            errorMessage: "'E-Mail' Must Not be Empty!",
        },
        matches: {
            options: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            errorMessage: "Please Check Your 'E-Mail' Address!",
        }
    },
    password: {
        isLength: {
            options: {
                min: 8,
                max: 24,
            },
            errorMessage: "'Password' Must be at Least 8 - 24 Characters!",
        },
        matches: {
            options: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&_.-]{8,24}$/,
            errorMessage: "'Password' Must Contain at Least One Uppercase Letter, One Lowercase Letter, and One Number!",
        },
    },
};

// Kullanıcı Şifresi Sıfırlama İşlemi Sırasında Kullanılacak Doğrulama Şeması.
export const PasswordValidation = {
    password: {
        isLength: {
            options: {
                min: 8,
                max: 24,
            },
            errorMessage: "'Password' Must be at Least 8 - 24 Characters!",
        },
        matches: {
            options: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&_.-]{8,24}$/,
            errorMessage: "'Password' Must Contain at Least One Uppercase Letter, One Lowercase Letter, and One Number!",
        },
    },
};

// Doktor Ekleme İşlemi Sırasında Kullanılacak Doğrulama Şeması.
export const DoctorAddValidation = {
    name: {
        isLength: {
            options: {
                min: 6,
                max: 32,
            },
            errorMessage: "'Doctor Name' Must be at Least 6 - 32 Characters!",
        },
    },
    speciality: {
        isLength: {
            options: {
                min: 3,
                max: 24,
            },
            errorMessage: "'Doctor Speciality' Must be at Least 3 - 24 Characters!",
        },
    },
};