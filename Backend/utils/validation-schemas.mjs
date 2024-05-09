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
        notEmpty: { 
            errorMessage: "'T.C. NO' Must Not be Empty!",
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
        notEmpty: { 
            errorMessage: "'Name' Must Not be Empty!",
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
        notEmpty: { 
            errorMessage: "'Password' Must Not be Empty!",
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
        notEmpty: { 
            errorMessage: "'Password' Must Not be Empty!",
        },
        matches: {
            options: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&_.-]{8,24}$/,
            errorMessage: "'Password' Must Contain at Least One Uppercase Letter, One Lowercase Letter, and One Number!",
        },
    },
};

// Hastane Ekleme İşlemi Sırasında Kullanılacak Doğrulama Şeması.
export const HospitalAddValidation = {
    name: {
        isLength: {
            options: {
                min: 12,
                max: 52,
            },
            errorMessage: "'Hospital Name' Must be at Least 12 - 42 Characters!",
        },
        notEmpty: {
            errorMessage: "'Hospital Name' Must Not be Empty!", 
        },
    },
    city: {
        isLength: {
            options: {
                min: 3,
                max: 14,
            },
            errorMessage: "'City Name' Must be at Least 3 - 14 Characters!",
        },
        notEmpty: {
            errorMessage: "'City Name' Must Not be Empty!",
        },
    },
    district: {
        isLength: {
            options: {
                min: 3,
                max: 22,
            },
            errorMessage: "'District Name' Must be at Least 3 - 22 Characters!",
        },
        notEmpty: {
            errorMessage: "'District Name' Must Not be Empty!",
        },
    },
    address: {
        isLength: {
            options: {
                min: 24,
                max: 92,
            },
            errorMessage: "'Address' Must be at Least 24 - 92 Characters!",
        },
        notEmpty: {
            errorMessage: "'Address' Must Not be Empty!",
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
        notEmpty: {
            errorMessage: "'Doctor Name' Must Not be Empty!", 
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
        notEmpty: {
            errorMessage: "'Doctor Speciality' Must Not be Empty!", 
        },
    },
};