// auth middleware

import jwt from "jsonwebtoken";

async function userAuth(req, res, next) {
  const token = req.headers?.authorization?.split(" ")[1];

  try {
    if (!token) {
      return res
        .status(404)
        .json({ success: false, message: "Your are not  authorized" });
    }

    const { userId } = await jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!userId) {
      return res
        .status(404)
        .json({ success: false, message: "Your are not  authorized" });
    }

    req.userId = { userId };

    next();
  } catch (error) {
    return res.status(404).json({ success: false, message: error.message });
  }
}

export default userAuth;
