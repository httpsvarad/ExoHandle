const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const generateTokenAndSetCookie = require('../utils/generateTokenAndSetCookie');

exports.login = async (req, res) => {
  try {
    const { email } = req.body;
    console.log("BODY: ", req.body);

    // Checking if user already exists
    let user = await prisma.user.findUnique({
      where: { email }
    });

    if (user) {
      console.log("User exists");
      await generateTokenAndSetCookie(res, user.id);
      res.status(200).json({ message: "Account found, returning user", result: user });
      
    } else {
      console.log("User doesn't exist, creating new account");
      user = await prisma.user.create({
        data: {
          email ,
          role:'STUDENT', // Set default availability
          semester: 3 // Set default semester
        }
      });

      await generateTokenAndSetCookie(res, user.id);

      res.status(201).json({ message: "User Created!", result: user });

      
    }
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.checkauth = async (req, res) => {
  try {
    res.status(200).json({ success: true, user: req.user });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};
