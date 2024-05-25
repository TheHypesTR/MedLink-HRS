// Kullanıcı Kayıt İşlemi Sırasında Kullanılacak Doğrulama Şeması.
export const UserValidation = (language) => {
    return {
        TCno: {
            isLength: {
                options: {
                    min: 11,
                    max: 11,
                },
                errorMessage: language.TCnoLength,
            },
            matches: {
                options: /^\d{11}$/,
                errorMessage: language.TCnoMatch,
            },
        },
        name: {
            isLength: {
                options: {
                    min: 6,
                    max: 36,
                },
                errorMessage: language.nameLength,
            },
        },
        email: {
            notEmpty: { 
                errorMessage: language.emailEmpty,
            },
            matches: {
                options: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                errorMessage: language.emailMatch,
            }
        },
        password: {
            isLength: {
                options: {
                    min: 8,
                    max: 24,
                },
                errorMessage: language.passwordLength,
            },
            matches: {
                options: /^(?=.*[a-zçğıöşü])(?=.*[A-ZÇĞİÖŞÜ])(?=.*\d)[A-Za-zÇĞİÖŞÜçğıöşü\d@$!%*?&_.-]{8,24}$/,
                errorMessage: language.passwordMatch,
            },
        },
    }
};

// Kullanıcı Şifresi Sıfırlama İşlemi Sırasında Kullanılacak Doğrulama Şeması.
export const PasswordValidation = (language) => {
    return {
        password: {
            isLength: {
                options: {
                    min: 8,
                    max: 24,
                },
                errorMessage: language.passwordLength,
            },
            matches: {
                options: /^(?=.*[a-zçğıöşü])(?=.*[A-ZÇĞİÖŞÜ])(?=.*\d)[A-Za-zÇĞİÖŞÜçğıöşü\d@$!%*?&_.-]{8,24}$/,
                errorMessage: language.passwordMatch,
            },
        },
    }
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