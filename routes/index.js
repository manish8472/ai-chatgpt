import { Router } from "express";
import userRouters from "./user-routes.js";
import chatRouters from "./chat-routers.js";
const appRouter = Router();
appRouter.use("/user", userRouters); //domain/api/v1/user
appRouter.use("/chat", chatRouters);
export default appRouter;
//# sourceMappingURL=index.js.map