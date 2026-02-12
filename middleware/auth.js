const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.trim();

  if (!token.startsWith("Bearer")) {
    return res.status(401).json({ error: "Invalid authorization header" });
  }

  const tokenValue = token.slice(6).trim(); // Remove 'Bearer' and trim

  try {
    const secret = process.env.APPLICATION_SECRET || "default-secret-key";
    const decoded = jwt.verify(tokenValue, secret);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
