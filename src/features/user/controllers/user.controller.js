import jwt from "jsonwebtoken";
import { UserRepository } from "../repositories/user.repository.js";
import { customErrorHandler } from "../../../middlewares/errorhandler.middleware.js";
import { hashPassword } from "../../../utils/hashpassword.js";
/**
 * TODO: implement jwt token: done
 */
export class UserController {
    constructor() {
        this.userRepository = new UserRepository();
    }
    async register(req, res, next) {
        let { username, email, password } = req.body;
        password = await hashPassword(password, next);
        const userData = {
            username: username,
            email: email,
            password: password,
            isAdmin: false
        }
        // console.log(userData);
        const resp = await this.userRepository.register(userData, next);
        console.log(resp);
        if (resp.success) {
            res.status(201).json({
                success: true,
                msg: `${userData.email} registerred successfully`,
                res: resp.res
            });
        } else {
            next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
        }
    }
    async login(req, res, next) {
        // userData include email and password only
        const { email, password } = req.body;
        const userData = {
            email: email,
            password: password
        };
        const resp = await this.userRepository.login(userData, next);
        if (resp.success) {
            const token = jwt.sign({ _id: resp.res._id, isAdmin: resp.res.isAdmin }, process.env.SECRET_KEY, {
                expiresIn: "1h",
            });
            res
                .cookie("jwtToken", token, { maxAge: 12 * 60 * 60 * 1000, httpOnly: true, secure: false })
                .json({ success: true, msg: "user login successful", token });
        } else {
            next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
        }
    }
}