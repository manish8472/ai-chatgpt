import { connect } from "mongoose";
async function connectToDatabase() {
    try {
        await connect(process.env.MONGODB_URL);
    }
    catch (error) {
        console.log(error);
        throw new Error("Cannot connect to MongoDB");
    }
}
async function disconnectFromDatabase() {
    try {
        await process.disconnect();
    }
    catch (error) {
        console.log(error);
        throw new Error("Cannot connect to MongoDB");
    }
}
export { connectToDatabase, disconnectFromDatabase };
//# sourceMappingURL=connections.js.map