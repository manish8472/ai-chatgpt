import { body, validationResult } from "express-validator";
export const validate = (validations) => {
    return async (req, res, next) => {
        for (let validation of validations) {
            const result = await validation.run(req);
            if (!result.isEmpty()) {
                break;
            }
        }
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }
        return res.status(422).json({ errors: errors.array() });
    };
};
export const loginValidator = [
    body("email").trim().isEmail().withMessage("Please Enter the correct Email"),
    body("password")
        .trim()
        .isLength({ min: 6 })
        .withMessage("password Should contains atleast 6 character"),
];
export const signupValidator = [
    body("name").notEmpty().withMessage("Name is required"),
    ...loginValidator
];
export const chatCompletionValidator = [
    body("message").notEmpty().withMessage("Message is required"),
];
//# sourceMappingURL=validators.js.map