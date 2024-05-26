import express from "express";
import {
  allUsers,
  loginWithEmailAndPassword,
  loginWithGoogle,
  register,
} from "../controllers/user.controller.js";
// import uploader from "../middleware/multer.js";
import uploader from "../middleware/multer.js";
import userAuth from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", uploader.single("profilePic"), register);
router.post("/login", loginWithEmailAndPassword);
router.post("/google/login", loginWithGoogle);
router.get("/allusers", userAuth, allUsers);

export default router;
