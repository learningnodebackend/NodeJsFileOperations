const jwt = require("../utils/jwt");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  console.log("token",token)

  if (!token) {
    return res.status(401).json({ message: "Access denied, no token provided" });
  }

  const decoded = jwt.verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ message: "Invalid token" });
  }

  req.user = decoded;
  console.log("req.user",req.user)
  next();
};

module.exports = authMiddleware;
