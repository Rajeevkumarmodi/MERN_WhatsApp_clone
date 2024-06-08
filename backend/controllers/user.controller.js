import { uploadOnCloudinary } from "../config/cloudinary.js";
import bcrypt from "bcryptjs";
import User from "../modals/user.modal.js";
import jwt from "jsonwebtoken";

// register function
export async function register(req, res) {
  const { name, email, password, about } = req.body;

  const profilePic = req?.file?.originalname;

  try {
    const checkUser = await User.findOne({ email });

    if (!checkUser) {
      if (!email || !name || !password || !profilePic) {
        return res
          .status(404)
          .json({ success: false, message: "All fields are required" });
      } else {
        if (!email.includes("@") || !email.includes(".")) {
          return res
            .status(404)
            .json({ success: false, message: "Please enter valid email" });
        } else {
          const cloudRes = await uploadOnCloudinary(req.file.path);
          const hashPassword = bcrypt.hashSync(password, 13);

          const newUser = new User({
            name,
            email,
            about,
            password: hashPassword,
            profilePic: cloudRes.secure_url,
          });
          await newUser.save();
          return res
            .status(201)
            .json({ success: true, message: "Register successfully!" });
        }
      }
    } else {
      return res
        .status(404)
        .json({ success: false, message: "User already register " });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

// login function with emain and password

export async function loginWithEmailAndPassword(req, res) {
  const { email, password } = req.body;

  if ((!email, !password)) {
    return res
      .status(404)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const checkUser = await User.findOne({ email });

    if (checkUser) {
      // compare password

      const passwordMatch = bcrypt.compareSync(password, checkUser.password);
      if (!passwordMatch) {
        return res
          .status(404)
          .json({ success: false, message: "Invalid credentials" });
      }

      // generate jwt token

      const token = jwt.sign(
        { userId: checkUser._id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "30d" }
      );

      res.status(200).json({
        success: true,
        message: "User login successfully",
        data: { ...checkUser, token },
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "User not  exits ",
      });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

// login with google

export async function loginWithGoogle(req, res) {
  const { email, name, profilePic, sub } = req.body;

  if (!email || !name || !profilePic || !sub) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid credentials" });
  }

  try {
    const checkUser = await User.findOne({ email });

    if (checkUser) {
      const token = jwt.sign(
        { userId: checkUser._id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "30d" }
      );

      res.status(200).json({
        success: true,
        message: "User login successfully",
        data: { ...checkUser, token },
      });
    } else {
      const newUser = new User({ name, email, profilePic, googleId: sub });

      await newUser.save();

      // token generate
      const token = jwt.sign(
        { userId: newUser._id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "30d" }
      );

      res.status(200).json({
        success: true,
        message: "User login successfully",
        data: { ...newUser, token },
      });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

// all users

export async function allUsers(req, res) {
  try {
    const allUsers = await User.find({}).select("-password");

    return res.status(200).json({ success: true, message: "", data: allUsers });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

// update name

export async function updateName(req, res) {
  const { name } = req.body;
  const { userId } = req.userId;
  try {
    const updatedName = await User.findByIdAndUpdate(userId, {
      $set: { name },
    });

    return res.status(200).json({
      success: true,
      message: "Name update successfully",
      data: {
        profilePic: updatedName.profilePic,
        name,
        about: updatedName.about,
        id: updatedName._id,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

// update about

export async function updateAbout(req, res) {
  const { about } = req.body;
  const { userId } = req.userId;
  try {
    const updatedName = await User.findByIdAndUpdate(userId, {
      $set: { about },
    });

    return res.status(200).json({
      success: true,
      message: "Name update successfully",
      data: {
        profilePic: updatedName.profilePic,
        name: updatedName.name,
        about,
        id: updatedName._id,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
