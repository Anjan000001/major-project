import jwt from "jsonwebtoken";

export const UserAuth = async (req, res, next) => {
    const jwtToken = req.headers['authorization'];
    const SECRET_KEY = process.env.SECRET_KEY;

    jwt.verify(jwtToken, SECRET_KEY, (err, data) => {
        if (err) {
            res.status(400).send("unauthorized! login to continue!");
        } else {
            req._id = data._id;
            next();
        }
    });
};
export const AdminAuth = async (req, res, next) => {
    const jwtToken = req.headers['authorization'];
    const SECRET_KEY = process.env.SECRET_KEY;

    jwt.verify(jwtToken, SECRET_KEY, (err, data) => {
        if (err) {
            res.status(400).send("unauthorized! login to continue!");
        } else {
            if (!data.isAdmin) {
                return res.status(400).json({
                    success: false,
                    msg: "this is admin only page"
                })
            }
            req._id = data._id;
            next();
        }
    });
};
