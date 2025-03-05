// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();

// exports.createUser = async (req, res) => {
//   try {
//     const dummyInstitute = {
//       createdBy: '123e4567-e89b-12d3-a456-426614174000', // Example UUID
//       access: ['admin', 'teacher', 'student'], // JSON array
//       noOfClassRooms: 20,
//       noOfStudents: 500,
//       noOfTeachers: 30,
//       noOfSemesters: 8,
//       noOfBenches: 400,
//     };

//     // Insert the single record into the database
//     const createdInstitute = await prisma.institute.create({
//       data: dummyInstitute,
//     });
//     console.log('Inserted Institute:', createdInstitute);
//     // Define the user object
//     // const user = {
//     //   name: 'John',
//     //   age: 30,
//     //   email: 'john@example.com',
//     // };

//     // // Create a new user in the database
//     // const createdUser = await prisma.user.create({
//     //   data: user,
//     // });
//     // console.log('New user created:', createdUser);

//     // // Fetch all users from the database
//     // const users = await prisma.user.findMany();
//     // console.log('Getting all users from the database:', users);

//     // // Update the user's age where the email matches
//     // const updatedUser = await prisma.user.update({
//     //   where: {
//     //     email: user.email,
//     //   },
//     //   data: {
//     //     age: 31,
//     //   },
//     // });
//     // console.log('User info updated:', updatedUser);

//     // // Delete the user where the email matches
//     // const deletedUser = await prisma.user.delete({
//     //   where: {
//     //     email: user.email,
//     //   },
//     // });
//     // console.log('User deleted:', deletedUser);

//     res.send('done');
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).send('An error occurred');
//   } finally {
//     // Disconnect Prisma Client
//     await prisma.$disconnect();
//   }
// };




const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// ✅ Create User
exports.createUser = async (req, res) => {
  try {
    const { email, role, availabilityStatus } = req.body;

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const newUser = await prisma.user.create({
      data: {
        email,
        role,
        availabilityStatus,
      },
    });

    res.status(201).json({ message: 'User created', newUser });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get All Users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get User by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(req.params.id) },
    });

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
};

// ✅ Update User
exports.updateUser = async (req, res) => {
  try {
    const { role, availabilityStatus } = req.body;

    const updatedUser = await prisma.user.update({
      where: { id: parseInt(req.params.id) },
      data: { role, availabilityStatus },
    });

    res.json({ message: 'User updated', updatedUser });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
};

// ✅ Delete User
exports.deleteUser = async (req, res) => {
  try {
    await prisma.user.delete({
      where: { id: parseInt(req.params.id) },
    });

    res.json({ message: 'User deleted' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
};
