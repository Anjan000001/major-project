import express from "express";
import { UserAuth, AdminAuth } from "../../../middlewares/auth.middleware.js";
import { ElectionController } from "../controllers/election.controller.js";

export const ElectionRouter = express.Router();
const electionController = new ElectionController();

/**
 * TODO: have to add auth so that only loggedin person can access this routes: done
 * TODO: call the respective function : done
 * TODO: add the authentication middleware
 */

//TODO: for testing i have removed the auth, add it later
ElectionRouter.post("/add", AdminAuth, (req, res, next) => {
    electionController.add(req, res, next);
})
ElectionRouter.get("/active", UserAuth, (req, res, next) => {
    electionController.active(req, res, next);
});

ElectionRouter.get("/:electionId/get-details", UserAuth, (req, res, next) => {
    electionController.getDetails(req, res, next);
});

ElectionRouter.get("/:electionId/get-candidates", UserAuth, (req, res, next) => {
    electionController.getCandidates(req, res, next);
});
/**
 * TODO: have to secure this route so that only admin can access this link
 */
ElectionRouter.post("/:electionId/add-candidate", AdminAuth, (req, res, next) => {
    electionController.addCandidates(req, res, next);
});
// This section endpoints are related to votes
ElectionRouter.post("/:electionId/vote", UserAuth, (req, res, next) => {
    electionController.vote(req, res, next);
});