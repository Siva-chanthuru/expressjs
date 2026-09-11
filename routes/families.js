const express = require('express');
const methodoverride = require('method-override');
const db = require('../config/db.js');
const router = express.Router();


// ===================== FAMILY LIST =====================

router.get('/', (req, res) => {

    db.connect((err) => {

        if (err) {
            return res.send('Error connecting to the database!');
        }

        db.query('SELECT * FROM families ORDER BY id DESC', (err, results) => {

            if (err) {
                console.log(err);
                return res.send(err);
            }

            res.render('families/index', {
                title: 'Family Page',
                families: results
            });

        });

    });

});


// ===================== FAMILY SHOW =====================

router.get('/:id/show', (req, res) => {

    const id = req.params.id;

    const sql = 'SELECT * FROM families WHERE id = ?';

    db.query(sql, [id], (err, results) => {

        if (err) {
            console.log(err);
            return res.status(500).send('Database Error');
        }

        if (results.length === 0) {
            return res.status(404).send('Family Not Found');
        }

        res.render('families/show', {
            title: 'Family Details',
            family: results[0]
        });

    });

});


// ===================== CREATE PAGE =====================

router.get('/create', (req, res) => {

    res.render('families/create', {
        title: 'Create Family'
    });

});


// ===================== INSERT =====================

router.post('/', (req, res) => {

    const { mobile_number, fa_first_name, mo_first_name, fa_job, mo_job, fa_nic_number, mo_nic_number, residential_address } = req.body;

    db.connect((err) => {

        if (err) {
            return res.send('Error connecting to database!');
        }

        db.query(
            'INSERT INTO families (mobile_number, fa_first_name, mo_first_name, fa_job, mo_job, fa_nic_number, mo_nic_number, residential_address) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [mobile_number, fa_first_name, mo_first_name, fa_job, mo_job, fa_nic_number, mo_nic_number, residential_address],
            (err, results) => {

                if (err) {
                    console.log(err);
                    return res.send(err);
                }

                res.redirect('/families');

            }
        );

    });

});


// ===================== EDIT PAGE =====================

router.get('/:id/edit', (req, res) => {

    const familyId = req.params.id;

    db.connect((err) => {

        if (err) {
            return res.send('Error connecting to the database!');
        }

        db.query(
            'SELECT * FROM families WHERE id = ?',
            [familyId],
            (err, results) => {

                if (err) {
                    console.log(err);
                    return res.send(err);
                }

                if (results.length === 0) {
                    return res.render('families/not_found', {
                        title: 'Family Not Found'
                    });
                }

                res.render('families/edit', {
                    title: 'Edit Family',
                    family: results[0]
                });

            }
        );

    });

});


// ===================== UPDATE =====================

router.put('/:id', (req, res) => {

    const familyId = req.params.id;

    const {
        mobile_number,
        fa_first_name,
        mo_first_name,
        fa_job,
        mo_job,
        fa_nic_number,
        mo_nic_number,
        residential_address
    } = req.body;

    db.connect((err) => {

        if (err) {
            return res.send('Error connecting to database!');
        }

        db.query(
            `UPDATE families
             SET mobile_number = ?,
                 fa_first_name = ?,
                 mo_first_name = ?,
                 fa_job = ?,
                 mo_job = ?,
                 fa_nic_number = ?,
                 mo_nic_number = ?,
                 residential_address = ?
             WHERE id = ?`,
            [
                mobile_number,
                fa_first_name,
                mo_first_name,
                fa_job,
                mo_job,
                fa_nic_number,
                mo_nic_number,
                residential_address,
                familyId
            ],
            (err, results) => {

                if (err) {
                    console.log(err);
                    return res.send(err);
                }

                res.redirect('/families');

            }
        );

    });

});




// ===================== DELETE =====================

router.delete('/:id', (req, res) => {

    const familyId = req.params.id;

    db.connect((err) => {

        if (err) {
            return res.send('Error connecting to database!');
        }

        db.query(
            'DELETE FROM families WHERE id = ?',
            [familyId],
            (err, results) => {

                if (err) {
                    console.log(err);
                    return res.send(err);
                }

                res.redirect('/families');

            }
        );

    });

});

module.exports = router;
