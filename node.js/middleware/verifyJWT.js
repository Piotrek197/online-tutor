const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  console.log("AuthHeader", authHeader);
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];
  console.log("access token from browser", token);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
    if (err) {
      console.log("access token error:", err.message);
      return res.sendStatus(403);
    }
    req.user = decodedToken.userInfo.username;
    req.roles = decodedToken.userInfo.roles;
    console.log("access token verifed");
    next();
  });
};

module.exports = verifyJWT;
