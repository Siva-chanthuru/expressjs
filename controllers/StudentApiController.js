const db = require('../config/db');

const deleteStudent = (req, res) => {
    const studentId = req.params.id;
    db.connect((err) => {
        if (err) {
            console.error('Error connecting to the database!', err);
            return res.status(500).json({
                "success": false,
                "message": 'Error connecting to the database!',
            });
        } else {
            db.query('DELETE FROM students WHERE id = ?', [studentId], (err, results) => {
                if (err) {
                    console.error('Error executing query!', err);
                    return res.status(500).json({
                        "success": false,
                        "message": 'Error executing query!',
                    });
                }
                if (results.affectedRows === 0) {
                    return res.status(404).json({
                        "success": false,
                        "message": 'Student not found!',
                    });
                }
                return res.status(200).json({
                    "success": true,
                    "message": 'Student deleted successfully!',
                });
            });
        }
    });
};

const getAllStudents = (req, res) => {
    db.connect((err) => {
        if (err) {
            return res.status(500).json({
                "success": false,
                "message": 'Error connecting to the database!',
            });
        } else {
            db.query('SELECT * FROM students order by id  desc limit 10 ', (err, results) => {
                if (err) {
                    return res.status(500).json({
                        "success": false,
                        "message": 'Error executing query!',
                    });
                } else {
                    console.log(results);
                    return res.status(200).json({
                        "success": true,
                        "message": 'Students retrieved successfully!',
                        "data": results
                    });
                }
            });
        }
    });

};

const updateStudent = (req, res) => {
    const studentId = req.params.id;
    const { admission_number } = req.body;

    if (!admission_number   ) {
        
        return res.status(400).json({
            "success": false,
            "message": 'Admission number is required',
        });
    }

    db.connect((err) => {
        if (err) {
            return res.status(500).json({
                "success": false,
                "message": 'Error connecting to the database!',
            });
        } else {
            db.query('UPDATE students SET admission_number = ? WHERE id = ?', [admission_number, studentId], (err, results) => {
                if (err) {
                    return res.status(500).json({
                        "success": false,
                        "message": 'Error executing query!',
                    });
                } else {
                    return res.status(200).json({
                        "success": true,
                        "message": 'Admission number updated successfully!',
                    });
                }
            });
        }
    });
};

const addStudent =  (req, res) => {
    // res.send('Received data: ' + JSON.stringify(req.body));
    const { admission_number, first_name, last_name, gender, dob, nic_number, birth_certificate_number, tele_number, house_id, grade_id, medium, date_of_admission, per_address, family_id } = req.body;

    // res.send(`Received data: Admission Number - ${admission_no}, First Name - ${first_name}, Last Name - ${last_name}`);
    if (!admission_number || !first_name || !last_name || !gender || !dob || !nic_number || !birth_certificate_number || !tele_number || !house_id || !grade_id || !medium || !date_of_admission || !per_address || !family_id  ) {
        res.status(400).send('All fields are required');
        return;
    }


    db.connect((err) => {
        if (err) {
            res.send('Error connecting to the database!');
        } else {

            db.query('INSERT INTO students (admission_number, first_name, last_name, gender, dob, nic_number, birth_certificate_number, tele_number, house_id, grade_id, medium, date_of_admission, per_address, family_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [admission_number, first_name, last_name, gender, dob, nic_number, birth_certificate_number, tele_number, house_id, grade_id, medium, date_of_admission, per_address, family_id], (err, results) => {
                if (err) {
                    res.send('Error executing query!');
                } else {
                    res.redirect('/student');
                }
            });
        }
    });
};
const getStudentById = (req, res) => {
    const studentId = req.params.id;
    if (!studentId) {
       
        return res.status(400).json({
            "success": false,
            "message": 'Student ID is required',
        });
    }
    db.connect((err) => {
        if (err) {
            return res.status(500).json({
                "success": false,
                "message": 'Error connecting to the database!',
            });
        } else {
            db.query('SELECT * FROM students WHERE id = ?', [studentId], (err, results) => {
                if (err) {
                    return res.status(500).json({
                        "success": false,
                        "message": 'Error executing query!',
                    });
                }
                else if (results.length === 0) {
                    return res.status(404).json({
                        "success": false,
                        "message": 'Student not found!',
                    });
                }
                else {
                    console.log(results);
                    return res.status(200).json({
                        "success": true,
                        "message": 'Student retrieved successfully!',
                        "data": results[0]
                    });
                }
            });
        }
    });
};

module.exports = {
    deleteStudent,
    getAllStudents,
    getStudentById,
    addStudent,
    updateStudent,
};