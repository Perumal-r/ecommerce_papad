const jwt = require("jsonwebtoken");
const UserModel = require("../modules/register");
// const { secretKey } = require("../config/config");

const secretKey = "perumal123";

const auth = async (req, res, next) => {
  try {
    // const accessToken = req.cookies.accessToken;
    const headers = req.headers.authorization;

    if (headers && headers.startsWith("Bearer")) {
      accessToken = headers.split(" ")[1];
    }

    if (!accessToken) {
      console.log("No access token provided");
      return res.status(401).json({ message: "No access token provided" });
    }

    jwt.verify(accessToken, secretKey, async (err, decoded) => {
      if (err) {
        console.error("Token verification error:", err.message);
        return res.status(401).json({ message: "Invalid access token" });
      }

      console.log("Decoded Token:", decoded);

      try {
        let user;
        if (decoded.userId) {
          user = await UserModel.findById(decoded.userId).select(
            "-password"
          );

          console.log("User from database:", user);
        }

        if (!user) {
          console.log("User not found");
          return res.status(401).json({ message: "User not found" });
        }

        req.user = user;
        next();
      } catch (error) {
        console.error("Error fetching user:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
      }
    });
  } catch (error) {
    console.error("Error in auth middleware:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { auth };
