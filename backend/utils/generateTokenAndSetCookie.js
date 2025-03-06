const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const generateTokenAndSetCookie = async (res, userId) => {
  const secretKey = process.env.JWT_SECRET;

  try {
    // ✅ Check if userId is valid
    if (!userId) {
      throw new Error("User ID is required but received undefined.");
    }

    // ✅ Fetch user details from Prisma DB
    const user = await prisma.user.findUnique({
      where: { id: userId },  // Ensure userId is valid
      select: { id: true, email: true, role: true },
    });

    if (!user) {
      throw new Error("User not found.");
    }

    // ✅ Generate JWT token with user details
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      secretKey,
      { expiresIn: "7d" }
    );

    // ✅ Set HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return token;
  } catch (error) {
    console.error("Error generating token:", error.message);
    throw error;
  }
};

module.exports = generateTokenAndSetCookie;
