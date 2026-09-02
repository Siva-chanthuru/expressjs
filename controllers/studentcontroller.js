const db = require('../config/db.js');

const deleteStudent = (req, res) => {
    const studentId = req.params.id;

    db.connect((err) => {
        if (err) {
            res.send('Error connecting to the database!');
        } else {
            db.query('DELETE FROM students WHERE id = ?', [studentId], (err, results) => {
                if (err) {
                    res.send('Error executing query!' + err);
                } else {
                    res.redirect('/student');
                }
            });
        }
    });
};

const getAllStudents = (req, res) => {
    db.connect((err) => {
        if (err) {
            res.send('Error connecting to the database!');
        } else {
            db.query('SELECT * FROM students order by id  desc limit 10 ', (err, results) => {
                if (err) {
                    res.send('Error executing query!');
                } else {
                    console.log(results);
                    res.render('student/index', { title: 'Student Page', message: 'Welcome to the student page!', students: results });
                }
            });
        }
    });

};

const getStudentById = (req, res) => {
    const studentId = req.params.id;
    if (!studentId) {
        res.status(400).send('Student ID is required');
        return;
    }
    db.connect((err) => {
        if (err) {
            res.send('Error connecting to the database!');
        } else {
            db.query('SELECT * FROM students WHERE id = ?', [studentId], (err, results) => {
                if (err) {
                    res.send('Error executing query!');
                }
                else if (results.length === 0) {
                    res.status(404).render('student/not_found', { title: 'Student not found', message: 'The requested student was not found.' });
                }
                else {
                    console.log(results);
                    res.render('student/show', { title: 'Student show Page', message: `Welcome to the student page for student ID: ${studentId}`, student: results[0] });
                }
            });
        }
    });
};

const editStudent = (req, res) => {
    const studentId = req.params.id;

    if (!studentId) {
        res.status(400).send('Student ID is required');
        return;
    }

    db.connect((err) => {
        if (err) {
            res.send('Error connecting to the database!');
        } else {
            db.query('SELECT * FROM students WHERE id = ?', [studentId], (err, results) => {
                if (err) {
                    res.send('Error executing query!');
                } else if (results.length === 0) {
                    res.status(404).render('student/not_found', { title: 'Student not found', message: 'The requested student was not found.' });
                } else {
                    res.render('student/edit', { title: 'Edit Student ' + results[0].first_name, student: results[0] });
                }
            });
        }
    });
};
const updateStudent = (req, res) => {
    const studentId = req.params.id;
    const { admission_number, first_name, last_name } = req.body;

    if (!admission_number || !first_name || !last_name) {
        res.status(400).send('All fields are required');
        return;
    }

    db.connect((err) => {
        if (err) {
            res.send('Error connecting to the database!');
        } else {
            db.query('UPDATE students SET admission_number = ?, first_name = ?, last_name = ? WHERE id = ?', [admission_number, first_name, last_name, studentId], (err, results) => {
                if (err) {
                    res.send('Error executing query!');
                } else {
                    res.redirect('/student');
                }
            });
        }
    });
};
const createStudent=(req, res) => {
    res.render('student/create', { title: 'Student Create Page', message: 'Welcome to the student create page!' });
};

const addStudent =  (req, res) => {
    // res.send('Received data: ' + JSON.stringify(req.body));
    const { admission_number, first_name, last_name } = req.body;

    // res.send(`Received data: Admission Number - ${admission_no}, First Name - ${first_name}, Last Name - ${last_name}`);
    if (!admission_number || !first_name || !last_name) {
        res.status(400).send('All fields are required');
        return;
    }


    db.connect((err) => {
        if (err) {
            res.send('Error connecting to the database!');
        } else {

            db.query('INSERT INTO students (admission_number, first_name, last_name) VALUES (?, ?, ?)', [admission_number, first_name, last_name], (err, results) => {
                if (err) {
                    res.send('Error executing query!');
                } else {
                    res.redirect('/student');
                }
            });
        }
    });
};
module.exports = {
    deleteStudent,
    getAllStudents,
    getStudentById,
    editStudent,
    updateStudent,
    createStudent,
    addStudent
};