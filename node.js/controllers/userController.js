const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/User");

const register = async (req, res) => {
  const { username, password } = req.body;
  console.log("body:", req.body);
  //username and password are required
  if (!username.length || !password.length) {
    res.status(400).send("Username and password are required");
    return;
  }

  //check duplicate
  const duplicate = await User.findOne({ username }).exec();
  console.log("duplicate", duplicate);
  if (duplicate) {
    res.status(409).send("User already exists");
    return;
  }

  try {
    const hash = await bcrypt.hash(password, 10);
    console.log("hash:", hash);
    const result = await User.create({
      username,
      password: hash
    });

    console.log("User created", result);

    return res.status(201).send("User " + username + " created!");
  } catch (err) {
    return res.status(500);
  }
};

const auth = async (req, res) => {
  const { username, password } = req.body;

  console.log("body", req.body);

  //username and password are required
  if (!username?.length || !password?.length) {
    res.status(400).send("Username and password are required");
    return;
  }

  const foundUser = await User.findOne({ username });
  if (!foundUser) return res.status(401).send("User doesn't exist");

  try {
    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
      const roles = Object.values(foundUser.roles);
      //create JWTs
      const accessToken = jwt.sign(
        {
          userInfo: {
            username: foundUser.username,
            roles
          }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "30s" }
      );
      const refreshToken = jwt.sign(
        { username: foundUser.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
      );

      console.log("accessToken", accessToken);
      console.log("refreshToken", refreshToken);

      // //saving refreshToken with current user
      // const otherUsers = userDB.users.filter(person => person.username !== foundUser.username);
      // const currentUser = { ...foundUser, refreshToken };
      // userDB.setUsers([...otherUsers, currentUser]);
      // await fsPromises.writeFile(
      //   path.join(__dirname, "..", "model", "users.json"),
      //   JSON.stringify(userDB.users)
      // );

      foundUser.refreshToken = refreshToken;
      const result = await foundUser.save();
      console.log("login user result", result);
      if (!result) return res.status(500);

      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        sameSite: "None",
        // secure: true,
        maxAge: 24 * 60 * 60 * 1000
      });
      return res.status(200).json({ username, accessToken });
    } else {
      res.status(401).send("Bad data. Sorry.");
    }
  } catch (err) {
    console.log("Error: ", err.message);
    // res.status(500);
  }
};

module.exports = { register, auth };
