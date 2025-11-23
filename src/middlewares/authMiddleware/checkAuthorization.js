const jwt = require("jsonwebtoken");
function checkAuthorization(req, res, next) {
  const { role } = req.user;
  if (role !== "admin") {
    return res.status(403).json({
      message: "Forbidden: You do not have access to this resource",
    });
  }
  next();
}

module.exports = { checkAuthorization };