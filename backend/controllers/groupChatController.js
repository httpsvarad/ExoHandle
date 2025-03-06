// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// exports.createGroupChat = async (req, res) => {
//   try {
//     const { name, semester } = req.body;
//     const userId = req.user.id;
    
//     // Check if the user is a teacher or admin
//     const user = await prisma.user.findUnique({ where: { id: userId } });
//     if (user.role !== "TEACHER" && user.role !== "ADMIN") {
//       return res.status(403).json({ success: false, message: "Only teachers and admins can create group chats" });
//     }

//     // Find all students in the semester
//     const students = await prisma.user.findMany({ where: { semester, role: "STUDENT" } });
//     const studentIds = students.map(student => student.id);

//     // Create the group chat
//     const groupChat = await prisma.groupChat.create({
//       data: {
//         name,
//         semester,
//         createdById: userId,
//         users: { connect: studentIds.map(id => ({ id })) },
//       },
//     });

//     res.status(201).json({ success: true, groupChat });
//   } catch (error) {
//     console.log("Error creating group chat:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };




// exports.sendMessageToGroup = async (req, res) => {
//     try {
//       const { content, groupChatId } = req.body;
//       const userId = req.user.id;
  
//       // Check if the user is a teacher or admin
//       const user = await prisma.user.findUnique({ where: { id: userId } });
//       if (user.role !== "TEACHER" && user.role !== "ADMIN") {
//         return res.status(403).json({ success: false, message: "Only teachers and admins can send messages" });
//       }
  
//       // Check if the group exists
//       const groupChat = await prisma.groupChat.findUnique({ where: { id: groupChatId } });
//       if (!groupChat) {
//         return res.status(404).json({ success: false, message: "Group chat not found" });
//       }
  
//       // Send the message
//       const message = await prisma.message.create({
//         data: {
//           senderId: userId,
//           groupChatId,
//           content,
//         },
//       });
  
//       res.status(201).json({ success: true, message });
//     } catch (error) {
//       console.log("Error sending message:", error);
//       res.status(500).json({ success: false, message: "Server error" });
//     }
//   };


//   exports.getGroupConversation = async (req, res) => {
//     try {
//       const { groupChatId } = req.params;
  
//       const messages = await prisma.message.findMany({
//         where: { groupChatId: parseInt(groupChatId) },
//         orderBy: { createdAt: "asc" },
//       });
  
//       res.status(200).json({ success: true, messages });
//     } catch (error) {
//       console.error("Error fetching group conversation:", error);
//       res.status(500).json({ success: false, message: "Server error" });
//     }
//   };
  
  



const { PrismaClient } = require('@prisma/client');
// import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create Group Chat (Only Teachers and Admins can create)
exports.createGroupChat = async (req, res) => {
  try {
    const { name, semester } = req.body;
    const userId = req.user.id;
    
    // Check if the user is a teacher or admin
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (user.role !== "TEACHER" && user.role !== "ADMIN") {
      return res.status(403).json({ success: false, message: "Only teachers and admins can create group chats" });
    }

    // Find all students in the given semester
    const students = await prisma.user.findMany({ where: { semester, role: "STUDENT" } });
    const studentIds = students.map(student => ({ userId: student.id }));

    // Create the group chat
    const groupChat = await prisma.groupChat.create({
      data: {
        name,
        semester,
        createdById: userId,
        users: { create: studentIds },
      },
    });

    res.status(201).json({ success: true, groupChat });
  } catch (error) {
    console.log("Error creating group chat:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Send Message to Group (Only Teachers and Admins can send messages)
exports.sendMessageToGroup = async (req, res) => {
  try {
    const { content, groupChatId } = req.body;
    const userId = req.user.id;

    // Check if the user is a teacher or admin
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (user.role !== "TEACHER" && user.role !== "ADMIN") {
      return res.status(403).json({ success: false, message: "Only teachers and admins can send messages" });
    }

    // Check if the group exists
    const groupChat = await prisma.groupChat.findUnique({ where: { id: groupChatId } });
    if (!groupChat) {
      return res.status(404).json({ success: false, message: "Group chat not found" });
    }

    // Send the message
    const message = await prisma.message.create({
      data: {
        senderId: userId,
        groupChatId,
        content,
      },
    });

    res.status(201).json({ success: true, message });
  } catch (error) {
    console.log("Error sending message:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get Group Chat Messages
exports.getGroupConversation = async (req, res) => {
  try {
    const { groupChatId } = req.params;

    const messages = await prisma.message.findMany({
      where: { groupChatId: parseInt(groupChatId) },
      orderBy: { createdAt: "asc" },
    });

    res.status(200).json({ success: true, messages });
  } catch (error) {
    console.error("Error fetching group conversation:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};