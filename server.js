// importing the env variable before anything
import dotenv from "dotenv";
dotenv.config();
import { server } from "./index.js";
import { connectToDB } from "./src/config/mongoose.config.js";

const PORT = 3000 || process.env.PORT;

server.listen(PORT, async () => {
    await connectToDB();
    console.log(`server is running on PORT: ${PORT}`);
})