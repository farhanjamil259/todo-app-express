import jwt from "jsonwebtoken"

const authenticateUser = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET)
    req.user = decoded
    next();
};

export default authenticateUser;
