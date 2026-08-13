const express = require('express');
const methodoverride = require('method-override');
const db = require('../config/db.js');
const router = express.Router();




// TEACHER LIST 

router.get('/', (req, res) => {

    db.connect((err) => {

        if (err) {
            return res.send('Error connecting to the database!');
        }

        db.query('SELECT * FROM teachers ORDER BY id DESC', (err, results) => {

            if (err) {
                console.log(err);
                return res.send(err);
            }

            res.render('teachers/index', {
                title: 'Teachers Page',
                teachers: results
            });

        });

    });

});


// ===================== TEACHER SHOW =====================

router.get('/:id/show', (req, res) => {

    const teacherId = req.params.id;

    db.connect((err) => {

        if (err) {
            return res.send('Error connecting to the database!');
        }

        db.query('SELECT * FROM teachers WHERE id = ?', [teacherId], (err, results) => {

            if (err) {
                console.log(err);
                return res.send(err);
            }

            if (results.length === 0) {
                return res.render('teacher/not_found', {
                    title: 'Teacher Not Found'
                });
            }

            res.render('teachers/show', {
                title: 'Teachers Details',
                teacher: results[0]
            });

        });

    });

});


// ===================== CREATE PAGE =====================

router.get('/create', (req, res) => {

    res.render('teachers/create', {
        title: 'Create Teachers'
    });

});


// ===================== INSERT =====================

router.post('/', (req, res) => {

    const {
        registration_number,
        nic_number,
        first_name,
        last_name,
        gender,
        title,
        date_of_birth,
        permanent_address,
        mobile_number,
        date_of_first_appointment
    } = req.body;

    db.connect((err) => {

        if (err) {
            return res.send('Error connecting to database!');
        }

        db.query(
            `INSERT INTO teachers
            (registration_number, nic_number, first_name, last_name, gender, title, date_of_birth, permanent_address, mobile_number, date_of_first_appointment)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                registration_number,
                nic_number,
                first_name,
                last_name,
                gender,
                title,
                date_of_birth,
                permanent_address,
                mobile_number,
                date_of_first_appointment
            ],
            (err, results) => {

                if (err) {
                    console.log(err);
                    return res.send(err);
                }

                res.redirect('/teachers');

            }
        );

    });

});


// ===================== EDIT PAGE =====================

router.get('/:id/edit', (req, res) => {

    const teacherId = req.params.id;

    db.connect((err) => {

        if (err) {
            return res.send('Error connecting to the database!');
        }

        db.query(
            'SELECT * FROM teachers WHERE id = ?',
            [teacherId],
            (err, results) => {

                if (err) {
                    console.log(err);
                    return res.send(err);
                }

                if (results.length === 0) {
                    return res.render('teacher/not_found', {
                        title: 'Teacher Not Found'
                    });
                }

                res.render('teachers/edit', {
                    title: 'Edit Teachers',
                    teacher: results[0]
                });

            }
        );

    });

});

// ===================== UPDATE =====================

router.put('/:id', (req, res) => {

    const teacherId = req.params.id;

    const {
        registration_number,
        nic_number,
        first_name,
        last_name,
        gender,
        title,
        date_of_birth,
        permanent_address,
        mobile_number,
        date_of_first_appointment
    } = req.body;

    db.connect((err) => {

        if (err) {
            return res.send('Error connecting to database!');
        }

        db.query(
            `UPDATE teachers
             SET registration_number = ?,
                 nic_number = ?,
                 first_name = ?,
                 last_name = ?,
                 gender = ?,
                 title = ?,
                 date_of_birth = ?,
                 permanent_address = ?,
                 mobile_number = ?,
                 date_of_first_appointment = ?
             WHERE id = ?`,
            [
                registration_number,
                nic_number,
                first_name,
                last_name,
                gender,
                title,
                date_of_birth,
                permanent_address,
                mobile_number,
                date_of_first_appointment,
                teacherId
            ],
            (err, results) => {

                if (err) {
                    console.log(err);
                    return res.send(err);
                }

                res.redirect('/teachers');

            }
        );

    });

});


// ===================== DELETE =====================

router.delete('/:id', (req, res) => {

    const teacherId = req.params.id;

    db.connect((err) => {

        if (err) {
            return res.send('Error connecting to database!');
        }

        db.query(
            'DELETE FROM teachers WHERE id = ?',
            [teacherId],
            (err, results) => {

                if (err) {
                    console.log(err);
                    return res.send(err);
                }

                res.redirect('/teachers');

            }
        );

    });

});

module.exports = router;