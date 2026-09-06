const db = require('../config/db');

const deleteGrade = (req, res) => {
    const gradeId = req.params.id;
    db.connect((err) => {
        if (err) {
            console.error('Error connecting to the database!', err);
            return res.status(500).json({
                "success": false,
                "message": 'Error connecting to the database!',
            });
        } else {
            db.query('DELETE FROM grades WHERE id = ?', [gradeId], (err, results) => {
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
                        "message": 'Grade not found!',
                    });
                }
                return res.status(200).json({
                    "success": true,
                    "message": 'Grade deleted successfully!',
                });
            });
        }
    });
};

const getAllGrades = (req, res) => {
    db.connect((err) => {
        if (err) {
            return res.status(500).json({
                "success": false,
                "message": 'Error connecting to the database!',
            });
        } else {
            db.query('SELECT * FROM grades order by id  desc limit 10 ', (err, results) => {
                if (err) {
                    return res.status(500).json({
                        "success": false,
                        "message": 'Error executing query!',
                    });
                } else {
                    console.log(results);
                    return res.status(200).json({
                        "success": true,
                        "message": 'Grades retrieved successfully!',
                        "data": results
                    });
                }
            });
        }
    });

};

const updateGrade = (req, res) => {
    const gradeId = req.params.id;
    const { grade_name, grade_group, grade_order, colour } = req.body;

    if (!grade_name || !grade_group || !grade_order || !colour ) {
        return res.status(400).json({
            "success": false,
            "message": 'All fields are required',
        });
    }

    db.connect((err) => {
        if (err) {
            return res.status(500).json({
                "success": false,
                "message": 'Error connecting to the database!',
            });
        } else {
            db.query('UPDATE grades SET name = ?, group = ?, order = ?, colour = ? WHERE id = ?', [grade_name, grade_group, grade_order, colour, gradeId], (err, results) => {
                if (err) {
                    return res.status(500).json({
                        "success": false,
                        "message": 'Error executing query!',
                    });
                } else {
                    return res.status(200).json({
                        "success": true,
                        "message": 'Grade updated successfully!',
                    });
                }
            });
        }
    });
};

const addGrade =  (req, res) => {
    // res.send('Received data: ' + JSON.stringify(req.body));
    const { grade_name, grade_group, grade_order, colour } = req.body;

    // res.send(`Received data: Grade Name - ${grade_name}, Grade Group - ${grade_group}`);
    if (!grade_name || !grade_group || !grade_order || !colour ) {
        return res.status(400).json({
            "success": false,
            "message": 'All fields are required',
        });
    }

    db.connect((err) => {
        if (err) {
            return res.status(500).json({
                "success": false,
                "message": 'Error connecting to the database!',
            });
        } else {
            db.query('INSERT INTO grades (name, group, order, colour) VALUES (?, ?, ?, ?)', [grade_name, grade_group, grade_order, colour], (err, results) => {
                if (err) {
                    return res.status(500).json({
                        "success": false,
                        "message": 'Error executing query!',
                    });
                } else {
                    return res.status(201).json({
                        "success": true,
                        "message": 'Grade created successfully!',
                    });
                }
            });
        }
    });
};


    db.connect((err) => {
        if (err) {
            res.send('Error connecting to the database!');
        } else {

            db.query('INSERT INTO grades (grade_name, grade_group, grade_order, colour) VALUES ( ?, ?, ?, ?)', [grade_name, grade_group, grade_order, colour], (err, results) => {
                if (err) {
                    res.send('Error executing query!');
                } else {
                    res.redirect('/student');
                }
            });
        }
    });
    
const getGradeById = (req, res) => {
    const gradeId = req.params.id;
    if (!gradeId) {
       
        return res.status(400).json({
            "success": false,
            "message": 'Grade ID is required',
        });
    }
    db.connect((err) => {
        if (err) {
            return res.status(500).json({
                "success": false,
                "message": 'Error connecting to the database!',
            });
        } else {
            db.query('SELECT * FROM grades WHERE id = ?', [gradeId], (err, results) => {
                if (err) {
                    return res.status(500).json({
                        "success": false,
                        "message": 'Error executing query!',
                    });
                }
                else if (results.length === 0) {
                    return res.status(404).json({
                        "success": false,
                        "message": 'Grade not found!',
                    });
                }
                else {
                    console.log(results);
                    return res.status(200).json({
                        "success": true,
                        "message": 'Grade retrieved successfully!',
                        "data": results[0]
                    });
                }
            });
        }
    });
};

module.exports = {
    deleteGrade,
    getAllGrades,
    getGradeById,
    addGrade,
    updateGrade,
};