const express = require('express');
const router = express.Router();
const db = require('../config/db.js');

const { deleteGrade, getGradeById, addGrade, updateGrade, getAllGrades} = require('../controllers/GradeApiController.js');
router.get('/', getAllGrades);
router.get('/:id', getGradeById);
router.delete('/:id', deleteGrade);
router.post('/', addGrade);
router.put('/:id', updateGrade);

module.exports = router;