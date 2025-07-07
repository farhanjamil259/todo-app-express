import jwt from "jsonwebtoken"

const authenticateUser = (req, res, next) => {

    if(!req.headers.authorization){
        throw new Error("No Token Present")
    }

    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET)
    req.user = decoded
    next();
};

export default authenticateUser;
