import express from "express";
import {
  loginWithEmailAndPassword,
  loginWithGoogle,
  register,
} from "../controllers/user.controller.js";
// import uploader from "../middleware/multer.js";
import uploader from "../middleware/multer.js";

const router = express.Router();

router.post("/register", uploader.single("profilePic"), register);
router.post("/login", loginWithEmailAndPassword);
router.post("/google/login", loginWithGoogle);

export default router;
