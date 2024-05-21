import { uploadOnCloudinary } from "../config/cloudinary.js";
import bcrypt from "bcryptjs";
import User from "../modals/user.modal.js";
import jwt from "jsonwebtoken";

// register function
export async function register(req, res) {
  const { name, email, password } = req.body;
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
        token: token,
      });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
