const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const protectRoute = async (req, res, next) => {
  const secretKey = process.env.JWT_SECRET;
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized - No token provided." });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, secretKey);
    if (!decoded) {
      return res.status(401).json({ success: false, message: "Unauthorized - Invalid token." });
    }

    // Fetch user from Prisma DB
    const currentUser = await prisma.user.findUnique({
      where: { id: decoded.id }, // Using `decoded.id` as Prisma uses `id`
      select: { id: true, email: true, role: true }, // Selecting only necessary fields
    });

    if (!currentUser) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    // Attach user data to request
    req.user = currentUser;

    next();
  } catch (error) {
    console.error("Error in protectRoute:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

module.exports = protectRoute;
