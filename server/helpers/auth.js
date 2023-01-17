import bcrypt from "bcrypt";
import randomstring from "randomstring";

export const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(12, (err, salt) => {
            if (err) {
                reject(err);
            }
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                    reject(err);
                }
                resolve(hash);
            });
        });
    });
};

export const comparePasswords = (password, hashed) => {
    return bcrypt.compare(password, hashed);
};

export const generateOtp = (length = 12, charset = "alphanumeric") => {
    return randomstring.generate({ length: { length }, charset: { charset } });
};
