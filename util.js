const jwt = require("jsonwebtoken");
const config = require("./config");

module.exports = function (req, res, next) {
  let token = req.headers["authorization"];
  if (token.startsWith("Bearer ")) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  if (token) {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        res.status(401);
        res.json({});
        // return next(err);
      } else {
        req.user = decoded;
      }
    });
  }
  next();
};
