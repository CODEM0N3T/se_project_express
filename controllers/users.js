const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");
const {
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
  ConflictError,
} = require("../utils/errors");

const createUser = async (req, res, next) => {
  try {
    const { name, avatar, email, password } = req.body;

    if (!email || !password) {
      throw new BadRequestError("Email and password are required");
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, avatar, email, password: hash });

    // sanitize
    const { _id } = user;
    return res
      .status(201)
      .send({ _id, name: user.name, avatar: user.avatar, email: user.email });
  } catch (err) {
    if (err?.code === 11000)
      return next(new ConflictError("Email already exists"));
    if (err?.name === "ValidationError")
      return next(new BadRequestError("Validation error"));
    return next(err);
  }
};

// POST /signin
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new BadRequestError("Email and password are required");
    }

    const user = await User.findUserByCredentials(email, password);
    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "7d" });
    return res.send({ token });
  } catch (err) {
    if (err?.message === "Incorrect email or password") {
      return next(new UnauthorizedError("Invalid email or password"));
    }
    return next(err);
  }
};

// GET /users/me
const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) throw new NotFoundError("User not found");

    const { _id, name, avatar, email } = user;
    return res.send({ _id, name, avatar, email });
  } catch (err) {
    return next(err);
  }
};

// PATCH /users/me
const updateUserProfile = async (req, res, next) => {
  try {
    const { name, avatar } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, avatar },
      { new: true, runValidators: true }
    );

    if (!user) throw new NotFoundError("User not found");

    const { _id, email } = user;
    return res.send({ _id, name: user.name, avatar: user.avatar, email });
  } catch (err) {
    if (err?.name === "ValidationError" || err?.name === "CastError") {
      return next(new BadRequestError("Validation error"));
    }
    return next(err);
  }
};

module.exports = {
  createUser,
  login,
  getCurrentUser,
  updateUserProfile,
};
