import { Router } from "express";
import { getAllUsers, userLogin, userLogout, userSignup, verifyUser } from "../controllers/user.controllers.js";
import { loginValidator, signupValidator, validate } from "../utils/validators.js";
import { veriyfyToken } from "../utils/token-manager.js";
const userRouters = Router();
userRouters.get("/", getAllUsers);
userRouters.post("/signup", validate(signupValidator), userSignup); //domain/api/v1/user/signup
userRouters.post("/login", validate(loginValidator), userLogin); //domain/api/v1/user/login
userRouters.get("/auth-status", veriyfyToken, verifyUser);
userRouters.get("/logout", veriyfyToken, userLogout);
export default userRouters;
//# sourceMappingURL=user-routes.js.map