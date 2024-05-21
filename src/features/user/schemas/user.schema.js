import mongoose from "mongoose";
/**
 * TODO: have to add validation in email and if possible in password as well
 * TODO: email validation addition : done
 * 
 */
export const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                const regex = /^[^\.\s][\w\-]+(\.[\w\-]+)*@([\w-]+\.)+[\w-]{2,}$/gm;
                return regex.test(value);
            },
            message: "email is invalid, please enter valid email"
        }
    },
    isAdmin: {
        type: Boolean,
        required: true
    }
})