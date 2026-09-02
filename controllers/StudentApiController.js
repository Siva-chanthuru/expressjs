const db = require('../config/db');


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
    getAllStudents,
    getStudentById
};

