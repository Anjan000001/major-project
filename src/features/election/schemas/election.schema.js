import mongoose from "mongoose";

const CandidateSchema = new mongoose.Schema({
    candidateId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    votes: [{
        type: mongoose.Schema.ObjectId,
        ref: "User"
    }]
})
export const ElectionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    candidates: {
        type: [CandidateSchema]
    }
})