const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }
    decoded.userId = parseInt(decoded.userId, 10); // Converting id into int for future use.

    console.log(typeof decoded.userId);
    req.user = decoded;
    next();
  });
}

module.exports = { verifyToken };
