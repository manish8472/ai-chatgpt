import { Router } from "express";
import { veriyfyToken } from "../utils/token-manager.js";
import { chatCompletionValidator, validate } from "../utils/validators.js";
import { deleteChats, generateChatCompletion, sendChatsToUser } from "../controllers/chat-controllers.js";
const chatRouters = Router();
chatRouters.post("/new", validate(chatCompletionValidator), veriyfyToken, generateChatCompletion);
chatRouters.get("/all-chats", veriyfyToken, sendChatsToUser);
chatRouters.delete("/delete", veriyfyToken, deleteChats);
export default chatRouters;
//# sourceMappingURL=chat-routers.js.map