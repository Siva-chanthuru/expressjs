const express = require('express');
const router = express.Router();
const db = require('../config/db.js');

const { deleteStudent, getAllStudents, getStudentById, editStudent, updateStudent, createStudent, addStudent } = require('../controllers/StudentController.js');

router.delete('/:id', deleteStudent);
router.get('/', getAllStudents);
router.get('/:id/show', getStudentById);
router.get('/:id/edit', editStudent);
router.put('/:id', updateStudent);
router.get('/create', createStudent);
router.post('/', addStudent);


module.exports = router;