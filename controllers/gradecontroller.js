const db = require('../config/db.js');

const deleteGrade = (req, res) => {
    const gradeId = req.params.id;

    db.connect((err) => {
        if (err) {
            res.send('Error connecting to the database!');
        } else {
            db.query('DELETE FROM grades WHERE id = ?', [gradeId], (err, results) => {
                if (err) {
                    res.send('Error executing query!' + err);
                } else {
                    res.redirect('/grade');
                }
            });
        }
    });
};

const getAllGrades = (req, res) => {
    db.connect((err) => {
        if (err) {
            res.send('Error connecting to the database!');
        } else {
            db.query('SELECT * FROM grades order by id  desc limit 10 ', (err, results) => {
                if (err) {
                    res.send('Error executing query!');
                } else {
                    console.log(results);
                    res.render('grade/index', { title: 'Grade Page', message: 'Welcome to the grade page!', grades: results });
                }
            });
        }
    });

};

const getGradeById = (req, res) => {
    const gradeId = req.params.id;
    if (!gradeId) {
        res.status(400).send('Grade ID is required');
        return;
    }
    db.connect((err) => {
        if (err) {
            res.send('Error connecting to the database!');
        } else {
            db.query('SELECT * FROM grades WHERE id = ?', [gradeId], (err, results) => {
                if (err) {
                    res.send('Error executing query!');
                }
                else if (results.length === 0) {
                    res.status(404).render('grade/not_found', { title: 'Grade not found', message: 'The requested grade was not found.' });
                }
                else {
                    console.log(results);
                    res.render('grade/show', { title: 'Grade show Page', message: `Welcome to the grade page for grade ID: ${gradeId}`, grade: results[0] });
                }
            });
        }
    });
};

const editGrade = (req, res) => {
    const gradeId = req.params.id;

    if (!gradeId) {
        res.status(400).send('Grade ID is required');
        return;
    }

    db.connect((err) => {
        if (err) {
            res.send('Error connecting to the database!');
        } else {
            db.query('SELECT * FROM grades WHERE id = ?', [gradeId], (err, results) => {
                if (err) {
                    res.send('Error executing query!');
                } else if (results.length === 0) {
                    res.status(404).render('grade/not_found', { title: 'Grade not found', message: 'The requested grade was not found.' });
                } else {
                    res.render('grade/edit', { title: 'Edit Grade ' + results[0].name, grade: results[0] });
                }
            });
        }
    });
};
const updateGrade = (req, res) => {
    const GradeId = req.params.id;
    const {  grade_name, grade_group, grade_order, colour } = req.body;

    if (!grade_name || !grade_group || !grade_order || !colour ) {
        res.status(400).send('All fields are required');
        return;
    }

    db.connect((err) => {
        if (err) {
            res.send('Error connecting to the database!');
        } else {
            db.query('UPDATE grades SET name = ?, group = ?, order = ?, colour = ? WHERE id = ?', [grade_name, grade_group, grade_order, colour, GradeId], (err, results) => {
                if (err) {
                    res.send('Error executing query!');
                } else {
                    res.redirect('/grade');
                }
            });
        }
    });
};
const createGrade=(req, res) => {
    res.render('grade/create', { title: 'Grade Create Page', message: 'Welcome to the grade create page!' });
};

const addGrade =  (req, res) => {
    // res.send('Received data: ' + JSON.stringify(req.body));
    const { grade_name, grade_group, grade_order, colour } = req.body;

    // res.send(`Received data: Admission Number - ${admission_no}, First Name - ${first_name}, Last Name - ${last_name}`);
    if (!grade_name || !grade_group || !grade_order || !colour ) {
        res.status(400).send('All fields are required');
        return;
    }


    db.connect((err) => {
        if (err) {
            res.send('Error connecting to the database!');
        } else {

            db.query('INSERT INTO grades (name, group, order, colour) VALUES (?, ?, ?, ?)', [grade_name, grade_group, grade_order, colour], (err, results) => {
                if (err) {
                    res.send('Error executing query!');
                } else {
                    res.redirect('/grade');
                }
            });
        }
    });
};
module.exports = {
    deleteGrade,
    getAllGrades,
    getGradeById,
    editGrade,
    updateGrade,
    createGrade,
    addGrade
};