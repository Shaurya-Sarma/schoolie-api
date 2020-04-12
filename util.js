const jwt = require("jsonwebtoken");
const config = require("./config");

module.exports = function (req, res, next) {
  let token = req.headers["authorization"];
  console.log("auth header ", token);
  if (token.startsWith("Bearer ")) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  if (token) {
    console.log("token = ", token);
    jwt.verify(token, config.secret, (err, decoded) => {
      console.log("decoded = ", decoded);
      if (err) {
        return next(err);
      } else {
        console.log("return decoded = ", decoded);
        req.user = decoded;
      }
    });
  }
  next();
};
