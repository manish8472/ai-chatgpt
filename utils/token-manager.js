import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "./constansts.js";
export const createToken = (id, email, expiresIn) => {
    const palyload = { id, email };
    const token = jwt.sign(palyload, process.env.JWT_SECRET, {
        expiresIn,
    });
    return token;
};
export const veriyfyToken = async (req, res, next) => {
    // find cookie is present or not
    const token = req.signedCookies[`${COOKIE_NAME}`];
    if (!token || token.trim() == "") {
        return res.status(401).json({ message: "Token Expired" });
    }
    return new Promise((resolve, reject) => {
        return jwt.verify(token, process.env.JWT_SECRET, (err, success) => {
            if (err) {
                reject(err.message);
                return res.status(401).json({ message: "Token Expired" });
            }
            else {
                resolve();
                res.locals.jwtData = success;
                return next();
            }
        });
    });
};
//# sourceMappingURL=token-manager.js.map