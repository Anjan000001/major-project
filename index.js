import express from "express";
import cors from "cors";
import { appLevelErrorHandlerMiddleware } from "./src/middlewares/errorhandler.middleware.js"
import { UserRouter } from "./src/features/user/routes/user.route.js";
import { ElectionRouter } from "./src/features/election/routes/election.route.js";

export const server = express();

// application level middleware
server.use(cors());
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

server.use("/api/users", UserRouter);
server.use("/api/elections", ElectionRouter);

// default endpoint
server.get("/", (req, res, next) => {
    res.status(200).json({
        success: true,
        msg: "api server is on"
    });
})
// application level error handler
server.use(appLevelErrorHandlerMiddleware);

