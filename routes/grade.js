const express = require('express');
const router = express.Router();
const db = require('../config/db.js');

const { deleteGrade, getAllGrades, getGradeById, editGrade, updateGrade, createGrade, addGrade } = require('../controllers/gradecontroller.js');

router.delete('/:id', deleteGrade);
router.get('/', getAllGrades);
router.get('/:id/show', getGradeById);
router.get('/:id/edit', editGrade);
router.put('/:id', updateGrade);
router.get('/create', createGrade);
router.post('/', addGrade);


module.exports = router;
