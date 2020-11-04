const userModel = require("../user/user.model");
const User = require("../user/user.model");
const utils = require("../utils");
const { registerValSchem, loginValSchem } = require("../validation");

const auth = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id).select("-password");
    if (!user) throw res.status(404).json({ message: "User does not exists" });
    return res.status(200).json({ message: "Load user success", data: user });
  } catch (error) {
    next(error);
  }
};

const login = async ({ body }, res, next) => {
  const { email, password } = body;
  try {
    const user = await User.findOne({ email });
    const { error } = loginValSchem.validate(body);
    if (error)
      throw res.status(400).json({ message: error.details[0].message });
    if (!user) throw res.status(400).json({ message: "Invalid credentials" });
    if (!(await utils.compareHashed(password, user.password))) {
      throw res.status(400).json({ message: "Invalid credentials" });
    }
    const token = utils.genToken({ _id: user._id });
    return res.status(200).json({
      message: "Login success",
      data: token,
    });
  } catch (error) {
    next(error);
  }
};

const regsiter = async ({ body }, res, next) => {
  const { username, email, password } = body;
  try {
    const user = await User.findOne({ email });
    const { error } = registerValSchem.validate(body);
    if (error)
      throw res.status(400).json({ message: error.details[0].message });
    if (user) {
      throw res.status(400).json({ message: "User email already exists" });
    }
    const hashedPass = await utils.genHashed(password);
    const newUser = new User({
      username,
      email,
      password: hashedPass,
    });
    await newUser.save();
    return res.status(200).json({ message: "Register success" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  regsiter,
  login,
  auth,
};
