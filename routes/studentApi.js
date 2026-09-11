const express = require('express');
const router = express.Router();
const db = require('../config/db.js');

const { deleteStudent, getAllStudents, getStudentById, addStudent, updateStudent} = require('../controllers/StudentApiController.js');
router.get('/', getAllStudents);
router.get('/:id', getStudentById);
router.delete('/:id', deleteStudent);
router.post('/', addStudent);
router.put('/:id', updateStudent);

module.exports = router;