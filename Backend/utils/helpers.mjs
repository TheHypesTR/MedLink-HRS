import bcrypt from "bcrypt";

const saltRounds = 10;

// Şifre'leri MongoDB'de Şifreleyerek Tutar
export const HashPassword = (password) => {
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password, salt);
};

// Kullanıcı Şifresini Girdiğinde MongoDB'deki Şifrelenmiş Şifre ile Karşılaştırır.
export const ComparePassword = (plain, hashed) => bcrypt.compareSync(plain, hashed);