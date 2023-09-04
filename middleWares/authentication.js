const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  const { authentication } = req.headers;
  if (!authentication) {
    res.status(401)({ message: "authourization denied" });
  }
  const token = authentication.split(" ");
  jwt.verify(token[1], process.env.SECRET_SALT, (err, decoded) => {
    if (!err) {
      req.user = decoded;
    } else if (err) {
      {
        res.status(401)({ message: "invalid token" });
      }
      next();
    } else {
      res.status(401)({ message: "token not found" });
    }
  });
};
module.exports = {  authentication };