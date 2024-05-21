import mongoose from "mongoose";
import { ElectionSchema } from "../schemas/election.schema.js";
import { UserSchema } from "../../user/schemas/user.schema.js";

const ElectionModel = mongoose.model('Election', ElectionSchema);
const UserModel = mongoose.model('User', UserSchema);
/**
 * TODO: have to implement this function 
 */
export class ElectionRepository {
    async add(electionData) {
        try {
            //TODO:  some validation before saving 
            const currentDate = new Date();
            if (!(electionData.startDate >= currentDate && currentDate <= electionData.endDate) || (electionData.endDate < electionData.startDate)) {
                throw new Error("inappropriate date are chosen")
            }
            const newElection = new ElectionModel(electionData);
            await newElection.save();
            return {
                success: true,
                res: newElection
            }
        } catch (err) {
            return {
                success: false,
                error: {
                    statusCode: 500,
                    msg: err
                }
            }
        }
    }
    async active() {
        try {
            const currentDate = new Date();
            // currentDate.setHours(0, 0, 0, 0);
            // TODO: time related information need to be take care
            const results = await ElectionModel.find({ endDate: { $gte: currentDate } });
            return {
                success: true,
                res: results
            }
        } catch (err) {
            return {
                success: false,
                error: {
                    statusCode: 500,
                    msg: err
                }
            }
        }
    }
    async getDetails(electionId) {
        try {
            const results = await ElectionModel.findById(electionId);
            return {
                success: true,
                res: results
            };
        } catch (err) {
            return {
                success: false,
                error: {
                    statusCode: 500,
                    msg: err
                }
            }
        }
    }
    async getCandidates(electionId) {
        try {
            const results = await ElectionModel.findById(electionId).populate('candidates.candidateId');
            return {
                success: true,
                res: results.candidates
            }
        } catch (err) {
            return {
                success: false,
                error: {
                    statusCode: 500,
                    msg: err
                }
            }
        }
    }
    /**
     * TODO: have to figure out what information to take while we have to add a candidate, like id or direct email 
     */
    async addCandidates(electionId, candidateEmail) {
        try {
            // TODO: have to add the candidate if not already present in the list
            const candidateDetails = await UserModel.findOne({ email: candidateEmail });
            if (!candidateDetails) {
                throw new Error(`no candidate found with email : ${candidateEmail}`);
            }
            const isPresent = await ElectionModel.findOne({ _id: electionId, candidate: { $in: [candidateDetails._id] } });
            if (!isPresent) {
                const results = await ElectionModel.findOneAndUpdate({ _id: electionId }, { $push: { candidates: { candidateId: candidateDetails._id } } }, { new: true });
                // TODO: remove it after testing
                console.log(results);
            }
            return {
                success: true
            }
        } catch (err) {
            return {
                success: false,
                error: {
                    statusCode: 500,
                    msg: err
                }
            }
        }
    }

    // from here voting functionality is being added
    async voted(electionId, candidateId, userId) {
        try {
            const result = await ElectionModel.findOne({ _id: electionId, candidates: { $elemMatch: { candidateId: candidateId, votes: { $in: [userId] } } } });
            return (result ? true : false);
        } catch (err) {
            return {
                success: false,
                error: {
                    statusCode: 500,
                    msg: err
                }
            }
        }
    }
    async vote(electionId, candidateId, userId) {
        try {
            const currentDate = new Date();
            const electionDetails = await ElectionModel.findOneAndUpdate({ _id: electionId, startDate: { $lte: currentDate }, endDate: { $gte: currentDate }, candidates: { $elemMatch: { candidateId: candidateId } } }, { $push: { "candidates.$.votes": userId } },
                { new: true });
            if (!electionDetails) {
                throw new Error(`election not found or expired`);
            }
            // TODO: this response for testing remove it after it
            return {
                success: true,
                res: electionDetails
            }

        } catch (err) {
            return {
                success: false,
                error: {
                    statusCode: 500,
                    msg: err
                }
            }
        }
    }
    // this function are related to result and all those thing
    async getVoteCount(electionId) {
        try {
            const electionDetails = await ElectionModel.findById(electionId);
            const result = [];
            for (let i = 0; i < electionDetails.candidates.length; i++) {
                result.append({ candidateId: electionDetails[i].candidateId, voteCount: electionDetails[i].votes.length });
            }
            return {
                success: true,
                res: result
            }
        } catch (err) {
            return {
                success: false,
                error: {
                    statusCode: 500,
                    msg: err
                }
            }
        }
    }
}