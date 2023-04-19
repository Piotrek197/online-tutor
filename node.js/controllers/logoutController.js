const fsPromises = require("fs").promises;
const path = require("path");
const User = require("../model/User");
// const userDB = {
//   users: require("../model/users.json"),
//   setUsers: function (data) {
//     this.users = data;
//   }
// };

const handleLogout = async (req, res) => {
  //On client, also delete the accessToken
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(204);
  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ refreshToken: refreshToken });
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    return res.sendStatus(204);
  }

  //Delete refreshToken in db
  // const otherUsers = userDB.users.filter(person => person.refreshToken !== foundUser.refreshToken);
  // const currentUser = { ...foundUser, refreshToken: "" };
  // userDB.setUsers([...otherUsers, currentUser]);
  // await fsPromises.writeFile(
  //   path.join(__dirname, "..", "model", "users.json"),
  //   JSON.stringify(userDB.users)
  // );

  foundUser.refreshToken = "";
  const result = foundUser.save();
  console.log("logout result", result);

  res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }); //secure: true (add this to production)
  res.sendStatus(204);
};

module.exports = { handleLogout };
