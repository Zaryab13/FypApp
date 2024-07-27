import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import errorHandler from "../utils/errorHandler.js";

// Route for Registration of New users
export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const parsedDOB = new Date(req.body.dateOfBirth);

    const newUser = new User({
      fullName: req.body.fullName,
      dateOfBirth: parsedDOB,
      cell: req.body.cell,
      email: req.body.email,
      password: hashedPassword,
      gender: req.body.gender,
      role: req.body.role,
    });

    await newUser.save();
    res.status(200).json("User has successfully signed Up");
  } catch (error) {
    next(error);
  }
};
// Route for Login of user

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    if (!user) {
      res.status(401).json({ message: "User not found" });
      return next(errorHandler(404, "User Not Found!!"));
    }

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordCorrect) {
      return next(errorHandler(404, "Invalid Password or email"));
    }

    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET_KEY
    );

    const { password, isAdmin, ...other } = user._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ ...other });
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res) => {
  res.cookie("access_token", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json("User has successfully logged out");
};

export const authenticate = async (req, res) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json("You are not Authorised to access this Page");
  }

  try {
    const tokenCheck = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await User.findById(tokenCheck.userId);

    if (!user) {
      res.status(401).json("You are not Authorised to access this Page");
    }
  } catch (error) {}
};

export const registerTechnician = async (req, res, next) => {
  try {
    const { fullName, dateOfBirth, cell, email, gender, password } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    // Hash password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Create new technician user
    const newTechnician = new User({
      fullName,
      dateOfBirth,
      cell,
      email,
      password: hashedPassword, // Save hashed password
      gender,
      role: "technician",
    });

    // Save user to database
    await newTechnician.save();
    res.status(200).json({ message: "Technician has successfully signed Up" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete Technician
export const deleteTechnician = async (req, res, next) => {
  try {
    const userId = req.params.id;

    await User.findByIdAndDelete(userId);
    res.status(200).json("Technician has successfully been deleted");
  } catch (error) {
    next(error);
  }
};

export const getTechnicians = async (req, res, next) => {
  try {
    const technicians = await User.find({ role: "technician" });
    res.status(200).json(technicians);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};