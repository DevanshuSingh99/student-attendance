module.exports = (req, res, next) => {
    if (req.userDetails.role === "Admin") {
        next();
    } else {
        next("UnAuthorized");
    }
};
