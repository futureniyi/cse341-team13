const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// Get all students
const getAllStudents = async (req, res) => {
  //#swagger.tags = ['Students']
  try {
    const students = await mongodb
      .getDatabase()
      .db()
      .collection('students')
      .find()
      .toArray();

    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching students', error: error.message });
  }
};

// Get student by ID
const getStudentById = async (req, res) => {
  //#swagger.tags = ['Students']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid student ID' });
    }

    const userId = new ObjectId(req.params.id);
    const student = await mongodb
      .getDatabase()
      .db()
      .collection('students')
      .findOne({ _id: userId });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching student', error: error.message });
  }
};

// Create a new student
const createStudent = async (req, res) => {
  //#swagger.tags = ['Students']
  try {
    const { studentNumber, firstName, lastName, email, department, isActive } = req.body;

    if (!studentNumber || !firstName || !lastName || !email) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const student = { studentNumber, firstName, lastName, email, department, isActive };

    const result = await mongodb
      .getDatabase()
      .db()
      .collection('students')
      .insertOne(student);

    if (result.acknowledged) {
      res.status(201).json({ id: result.insertedId });
    } else {
      res.status(400).json({ message: 'Could not create student.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error creating student', error: error.message });
  }
};

// Update student by ID
const updateStudent = async (req, res) => {
  //#swagger.tags = ['Students']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid student ID' });
    }

    const student_id = new ObjectId(req.params.id);
    const { studentNumber, firstName, lastName, email, department, isActive } = req.body;

    const student = { studentNumber, firstName, lastName, email, department, isActive };

    const result = await mongodb
      .getDatabase()
      .db()
      .collection('students')
      .replaceOne({ _id: student_id }, student);

    if (result.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Student not found or no changes applied' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating student', error: error.message });
  }
};

// Delete student by ID
const deleteStudent = async (req, res) => {
  //#swagger.tags = ['Students']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid student ID' });
    }

    const student_id = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .db()
      .collection('students')
      .deleteOne({ _id: student_id });

    if (result.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting student', error: error.message });
  }
};

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
};
