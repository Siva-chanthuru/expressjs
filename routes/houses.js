const express = require('express');
const db = require('../config/db.js');

const router = express.Router();


// DELETE HOUSE

router.delete('/:id', (req, res) => {

    const houseId = req.params.id;

    db.connect((err) => {

        if (err) {
            return res.send('Error connecting to the database!');
        }

        db.query(
            'DELETE FROM houses WHERE id = ?',
            [houseId],
            (err, results) => {

                if (err) {
                    console.log(err);
                    return res.send('Error executing query! ' + err);
                }

                res.redirect('/houses');
            }
        );
    });
});



// SHOW ALL HOUSES

router.get('/', (req, res) => {

    db.connect((err) => {

        if (err) {
            return res.send('Error connecting to the database!');
        }

        db.query(
            'SELECT * FROM houses ORDER BY id DESC LIMIT 10',
            (err, results) => {

                if (err) {
                    console.log(err);
                    return res.send('Error executing query! ' + err);
                }

                console.log(results);

                res.render('houses/index', {
                    title: 'Houses Page',
                    message: 'Welcome to the houses page!',
                    houses: results
                });
            }
        );
    });
});



// SHOW SINGLE HOUSE

router.get('/:id/show', (req, res) => {

    const houseId = req.params.id;

    if (!houseId) {
        return res.status(400).send('House ID is required');
    }

    db.connect((err) => {

        if (err) {
            return res.send('Error connecting to the database!');
        }

        db.query(
            'SELECT * FROM houses WHERE id = ?',
            [houseId],
            (err, results) => {

                if (err) {
                    console.log(err);
                    return res.send('Error executing query! ' + err);
                }

                if (results.length === 0) {
                    return res.status(404).render('houses/not_found', {
                        title: 'House not found',
                        message: 'The requested house was not found.'
                    });
                }

                console.log(results);

                res.render('houses/show', {
                    title: 'House Show Page',
                    message: `Welcome to the house page for house ID: ${houseId}`,
                    house: results[0]
                });
            }
        );
    });
});



// EDIT HOUSE PAGE

router.get('/:id/edit', (req, res) => {

    const houseId = req.params.id;

    if (!houseId) {
        return res.status(400).send('House ID is required');
    }

    db.connect((err) => {

        if (err) {
            return res.send('Error connecting to the database!');
        }

        db.query(
            'SELECT * FROM houses WHERE id = ?',
            [houseId],
            (err, results) => {

                if (err) {
                    console.log(err);
                    return res.send('Error executing query! ' + err);
                }

                if (results.length === 0) {
                    return res.status(404).render('houses/not_found', {
                        title: 'House not found',
                        message: 'The requested house was not found.'
                    });
                }

                res.render('houses/edit', {
                    title: 'Edit House ' + results[0].house_name,
                    house: results[0]
                });
            }
        );
    });
});



// UPDATE HOUSE

router.put('/:id', (req, res) => {

    const houseId = req.params.id;

    const {
        house_name,
        house_color
    } = req.body;

    if (!house_name || !house_color) {
        return res.status(400).send('All fields are required');
    }

    db.connect((err) => {

        if (err) {
            return res.send('Error connecting to the database!');
        }

        db.query(
            `UPDATE houses
             SET house_name = ?,
                 house_color = ?
             WHERE id = ?`,
            [
                house_name,
                house_color,
                houseId
            ],
            (err, results) => {

                if (err) {
                    console.log(err);
                    return res.send('Error executing query! ' + err);
                }

                res.redirect('/houses');
            }
        );
    });
});



// CREATE HOUSE PAGE

router.get('/create', (req, res) => {

    res.render('houses/create', {
        title: 'House Create Page',
        message: 'Welcome to the house create page!'
    });

});


// ===============================
// CREATE HOUSE
// ===============================
router.post('/', (req, res) => {

    const {
        house_name,
        house_color
    } = req.body;

    if (!house_name || !house_color) {
        return res.status(400).send('All fields are required');
    }

    db.connect((err) => {

        if (err) {
            return res.send('Error connecting to the database!');
        }

        db.query(
            `INSERT INTO houses
            (house_name, house_color)
            VALUES (?, ?)`,
            [
                house_name,
                house_color
            ],
            (err, results) => {

                if (err) {
                    console.log(err);
                    return res.send('Error executing query! ' + err);
                }

                res.redirect('/houses');
            }
        );
    });

});

module.exports = router;