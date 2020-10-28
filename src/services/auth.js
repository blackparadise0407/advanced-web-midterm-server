const utils = require("../utils");

module.exports.auth = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader)
    throw res.status(401).json({ message: "Unauthorized, no token provided" });
  const token = authHeader.split(" ");
  if (token[0] !== "Bearer")
    throw res.status("400").json({ message: "Invalid header" });
  if (!token[1])
    return res
      .status("400")
      .json({ message: "Unauthorized, no token provided" });
  try {
    const decoded = utils.verifyToken(token[1]);
    req.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};
