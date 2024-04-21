//Password Hashing & Comparing
import bcrypt from "bcrypt";

const saltRounds = 10;

//Encrypts User's passwords
export const HashPassword = (password) => {
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password, salt);
};

//Comparing User's passwords (Encrypted vs Normal)
export const ComparePassword = (plain, hashed) => bcrypt.compareSync(plain, hashed);