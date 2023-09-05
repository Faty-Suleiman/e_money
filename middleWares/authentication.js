const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  const { authentication } = req.headers;
  if (!authentication) {
    res.status(401).json({
      status: false,
      message: "authourization denied",
    });
  }
  const token = authentication.split(" ");
  jwt.verify(token[1], process.env.SECRET_SALT, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        status: false,
        message: "Unauthorised",
      });
    } else {
      res.status(401).json({
        status: false,
        message: "token not found",
      });
    }
  });
};
module.exports = { authentication };
