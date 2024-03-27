import app from './app.js';
import { connectToDatabase } from './db/connections.js';
//connections and listeners
connectToDatabase()
    .then(() => {
    app.listen("https://manish8472.github.io/ai-chatgpt/", () => console.log(""));
})
    .catch((err) => console.log(err));
//# sourceMappingURL=index.js.map