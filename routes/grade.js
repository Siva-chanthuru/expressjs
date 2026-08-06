const express = require('express');
const methodoverride = require('method-override');
const db = require('../config/db.js');
const router = express.Router();


// ===================== GRADE LIST =====================

router.get('/', (req, res) => {

    db.connect((err) => {

        if (err) {
            return res.send('Error connecting to the database!');
        }

        db.query('SELECT * FROM grades ORDER BY id DESC', (err, results) => {

            if (err) {
                console.log(err);
                return res.send(err);
            }

            res.render('grade/index', {
                title: 'Grade Page',
                grades: results
            });

        });

    });

});


// ===================== GRADE SHOW =====================

router.get('/:id/show', (req, res) => {

    const gradeId = req.params.id;

    db.connect((err) => {

        if (err) {
            return res.send('Error connecting to the database!');
        }

        db.query('SELECT * FROM grades WHERE id = ?', [gradeId], (err, results) => {

            if (err) {
                console.log(err);
                return res.send(err);
            }

            if (results.length === 0) {
                return res.render('student/not_found', {
                    title: 'Grade Not Found'
                });
            }

            res.render('grade/show', {
                title: 'Grade Details',
                grade: results[0]
            });

        });

    });

});


// ===================== CREATE PAGE =====================

router.get('/create', (req, res) => {

    res.render('grade/create', {
        title: 'Create Grade'
    });

});


// ===================== INSERT =====================

router.post('/', (req, res) => {

    const { grade_name, grade_group, grade_order, colour } = req.body;

    db.connect((err) => {

        if (err) {
            return res.send('Error connecting to database!');
        }

        db.query(
            'INSERT INTO grades (grade_name, grade_group, grade_order, colour) VALUES (?, ?, ?, ?)',
            [grade_name, grade_group, grade_order, colour],
            (err, results) => {

                if (err) {
                    console.log(err);
                    return res.send(err);
                }

                res.redirect('/grade');

            }
        );

    });

});


// ===================== EDIT PAGE =====================

router.get('/:id/edit', (req, res) => {

    const gradeId = req.params.id;

    db.connect((err) => {

        if (err) {
            return res.send('Error connecting to the database!');
        }

        db.query(
            'SELECT * FROM grades WHERE id = ?',
            [gradeId],
            (err, results) => {

                if (err) {
                    console.log(err);
                    return res.send(err);
                }

                if (results.length === 0) {
                    return res.render('student/not_found', {
                        title: 'Grade Not Found'
                    });
                }

                res.render('grade/edit', {
                    title: 'Edit Grade',
                    grade: results[0]
                });

            }
        );

    });

});


// ===================== UPDATE =====================

router.put('/:id', (req, res) => {

    const gradeId = req.params.id;

    const { grade_name, grade_group, grade_order, colour } = req.body;

    db.connect((err) => {

        if (err) {
            return res.send('Error connecting to database!');
        }

        db.query(
            `UPDATE grades
             SET grade_name = ?,
                 grade_group = ?,
                 grade_order = ?,
                 colour = ?
             WHERE id = ?`,
            [
                grade_name,
                grade_group,
                grade_order,
                colour,
                gradeId
            ],
            (err, results) => {

                if (err) {
                    console.log(err);
                    return res.send(err);
                }

                res.redirect('/grade');

            }
        );

    });

});


// ===================== DELETE =====================

router.delete('/:id', (req, res) => {

    const gradeId = req.params.id;

    db.connect((err) => {

        if (err) {
            return res.send('Error connecting to database!');
        }

        db.query(
            'DELETE FROM grades WHERE id = ?',
            [gradeId],
            (err, results) => {

                if (err) {
                    console.log(err);
                    return res.send(err);
                }

                res.redirect('/grade');

            }
        );

    });

});

module.exports = router;
