const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    if (!req.headers.token) {
        res.status(403).json({
            status: "failure",
            message: "Unable to authorize the user",
        });
        next("Unauthorised");
    } else {
        jwt.verify(req.headers.token, "Secret", async (err, decodedPayload) => {
            if (err) {
                res.status(403).json({
                    status: "failure",
                    message: "Unauthorized Token",
                });
                next(err.toString());
            } else {
                req.userDetails = decodedPayload;
                next();
            }
        });
    }
};
