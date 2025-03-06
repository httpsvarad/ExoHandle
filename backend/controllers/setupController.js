const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
exports.createInstitutes = async (req, res) => {
  const institutes = req.body; // Expecting an array of institute objects
  try {
    // Validate that the input is an array
    if (!Array.isArray(institutes)) {
      return res
        .status(400)
        .json({ error: "Request body must be an array of institutes." });
    }

    // Create multiple institutes in a single transaction
    const newInstitutes = await prisma.institute.createMany({
      data: institutes.map((institute) => ({
        createdBy: institute.createdBy,
        noOfClassRooms: institute.noOfClassRooms,
        noOfStudents: institute.noOfStudents,
        noOfTeachers: institute.noOfTeachers,
        noOfSemesters: institute.noOfSemesters,
        noOfBenches: institute.noOfBenches,
      })),
    });

    res.status(201).json({
      message: `Successfully created ${newInstitutes.count} institutes.`,
      count: newInstitutes.count,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating institutes." });
  }
};

exports.createSemesters = async (req, res) => {
  const semesters = req.body; // Expecting an array of semester objects
  try {
    // Validate that the input is an array
    if (!Array.isArray(semesters)) {
      return res
        .status(400)
        .json({ error: "Request body must be an array of semesters." });
    }

    // Create multiple semesters in a single transaction
    const newSemesters = await prisma.semester.createMany({
      data: semesters.map((semester) => ({
        instituteId: semester.instituteId,
        name: semester.name,
        department: semester.department,
      })),
    });

    res.status(201).json({
        message: `Successfully created ${newSemesters.count} semesters.`,
        count: newSemesters.count,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating semesters." });
  }
};

// Create Divisions
exports.createDivisions = async (req, res) => {
  try {
    const divisions = req.body;
    const createdDivisions = await Promise.all(
      divisions.map(async (division) => {
        return await prisma.division.create({
          data: division,
        });
      })
    );
    res.status(201).json(createdDivisions);
  } catch (error) {
    console.error("Error creating divisions:", error);
    res.status(500).json({ error: "Failed to create divisions" });
  }
};

exports.createBatches = async (req, res) => {
    const batches = req.body; // Expecting an array of batch objects
    try {
      // Validate that the input is an array
      if (!Array.isArray(batches)) {
        return res
          .status(400)
          .json({ error: "Request body must be an array of batches." });
      }
  
      // Create multiple batches in a single transaction
      const newBatches = await prisma.batch.createMany({
        data: batches.map((batch) => ({
          divisionId: batch.divisionId,
          name: batch.name
        })),
      });
  
      res.status(201).json({
        message: `Successfully created ${newBatches.count} batches.`,
        count: newBatches.count,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error creating batches." });
    }
  };

  exports.createClassrooms = async (req, res) => {
    const classrooms = req.body; // Expecting an array of classroom objects
    try {
      // Validate that the input is an array
      if (!Array.isArray(classrooms)) {
        return res
          .status(400)
          .json({ error: "Request body must be an array of classrooms." });
      }
  
      // Create multiple classrooms in a single transaction
      const newClassrooms = await prisma.classroom.createMany({
        data: classrooms.map((classroom) => ({
          name: classroom.name,
          floor: classroom.floor,
          capacity: classroom.capacity,
          instituteId:classroom.instituteId
        })),
      });
  
      res.status(201).json({
        message: `Successfully created ${newClassrooms.count} classrooms.`,
        count: newClassrooms.count,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error creating classrooms." });
    }
  };

  exports.setupDummySubjects = async (req, res) => {
    try {
      const dummySubjects = [
        { name: "Engineering Mathematics", type: "BOTH" },
        { name: "Engineering Physics", type: "BOTH" },
        { name: "Engineering Chemistry", type: "THEORY" },
        { name: "Electrical Circuits", type: "BOTH" },
        { name: "Computer Programming", type: "BOTH" },
        { name: "Data Structures & Algorithms", type: "BOTH" },
        { name: "Digital Electronics", type: "BOTH" },
        { name: "Mechanical Engineering Basics", type: "THEORY" },
        { name: "Thermodynamics", type: "THEORY" },
        { name: "Control Systems", type: "BOTH" },
        { name: "Microprocessors & Microcontrollers", type: "BOTH" },
        { name: "Communication Systems", type: "BOTH" },
        { name: "Software Engineering", type: "THEORY" },
        { name: "Operating Systems", type: "BOTH" },
        { name: "Database Management Systems", type: "BOTH" },
        { name: "Artificial Intelligence", type: "THEORY" },
        { name: "Machine Learning", type: "BOTH" },
        { name: "Computer Networks", type: "BOTH" },
        { name: "Embedded Systems", type: "BOTH" },
        { name: "Cybersecurity", type: "THEORY" }
      ];
      
  
      const subjects = await prisma.subject.createMany({
        data: dummySubjects,
        skipDuplicates: true, // Prevent duplicate insertion
      });
  
      res.status(201).json({ message: "Dummy subjects added successfully", subjects });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error setting up dummy subjects" });
    }
  };

  const dummyExams = [
    { 
      name: "Mid-Term Exam", 
      examDate: new Date("2024-04-15T09:00:00.000Z"), 
      description: "Mid-semester assessment for engineering subjects",
      instituteId: 14 
    },
    { 
      name: "End-Term Exam", 
      examDate: new Date("2024-06-20T10:00:00.000Z"), 
      description: "Final exam covering all syllabus",
      instituteId: 14 
    },
    { 
      name: "Practical Exam", 
      examDate: new Date("2024-05-05T11:30:00.000Z"), 
      description: "Lab practicals assessment",
      instituteId: 14
    }
  ];
  
  exports.setupDummyExams = async (req, res) => {
    try {
      // Insert dummy exam data
      const exams = await prisma.exam.createMany({
        data: dummyExams,
        skipDuplicates: true, // Avoid duplicate inserts
      });
  
      res.status(201).json({ message: "Dummy exams added successfully", exams });
    } catch (error) {
      console.error("Error setting up dummy exams:", error);
      res.status(500).json({ error: "Failed to insert dummy exams" });
    }
  };