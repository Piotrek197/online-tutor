const jwt = require("jsonwebtoken");
const User = require("../model/User");

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;

  console.log("cookies", JSON.stringify(req.cookies));

  if (!cookies?.jwt) return res.sendStatus(401);

  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ refreshToken });
  if (!foundUser) return res.sendStatus(403);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decodedToken) => {
    if (err || foundUser.username !== decodedToken.username) return sendStatus(403);
    const roles = Object.values(foundUser.roles);
    const accessToken = jwt.sign(
      {
        userInfo: {
          username: decodedToken.username,
          roles
        }
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10s" }
    );
    res.json({ accessToken });
  });
};

module.exports = { handleRefreshToken };
