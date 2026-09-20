const db = require('../config/db.js');



const deleteStudent = async (req, res) => {
    try {
        const studentId = req.params.id;

        if (!studentId) {
            return res.status(400).send('Student ID is required');
        }

        const [result] = await db.query(
            'DELETE FROM students WHERE id = ?',
            [studentId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).send('Student not found!');
        }

        res.redirect('/student');

    } catch (err) {
        console.error('Delete Student Error:', err);

        res.status(500).send(
            'Error executing query!'
        );
    }
};


const getAllStudents = async (req, res) => {
    try {
        const [students] = await db.query(
            'SELECT * FROM students ORDER BY id DESC LIMIT 10'
        );

        console.log(students);

        res.render('student/index', {
            title: 'Student Page',
            message: 'Welcome to the student page!',
            students: students
        });

    } catch (err) {
        console.error('Get All Students Error:', err);

        res.status(500).send(
            'Error fetching students!'
        );
    }
};



const getStudentById = async (req, res) => {
    try {
        const studentId = req.params.id;

        if (!studentId) {
            return res.status(400).send(
                'Student ID is required'
            );
        }

        const [students] = await db.query(
            'SELECT * FROM students WHERE id = ?',
            [studentId]
        );

        if (students.length === 0) {
            return res.status(404).render(
                'student/not_found',
                {
                    title: 'Student not found',
                    message: 'The requested student was not found.'
                }
            );
        }

        console.log(students);

        res.render('student/show', {
            title: 'Student Show Page',
            message: `Welcome to the student page for student ID: ${studentId}`,
            student: students[0]
        });

    } catch (err) {
        console.error('Get Student Error:', err);

        res.status(500).send(
            'Error fetching student!'
        );
    }
};



const editStudent = async (req, res) => {
    try {
        const studentId = Number(req.params.id);

        if (!Number.isInteger(studentId) || studentId <= 0) {
            return res.status(400).send(
                'Invalid Student ID'
            );
        }

        const [students] = await db.query(
            'SELECT * FROM students WHERE id = ?',
            [studentId]
        );

        if (students.length === 0) {
            return res.status(404).render(
                'student/not_found',
                {
                    title: 'Student not found',
                    message: 'The requested student was not found.'
                }
            );
        }

        res.render('student/edit', {
            title: 'Edit Student ' + students[0].first_name,
            student: students[0]
        });

    } catch (err) {
        console.error('Edit Student Error:', err);

        res.status(500).send(
            'Database Error!'
        );
    }
};


const updateStudent = async (req, res) => {
    try {
        const studentId = Number(req.params.id);

        const {
            admission_number,
            first_name,
            last_name,
            gender,
            dob,
            nic_number,
            birth_certificate_number,
            tele_number,
            house_id,
            grade_id,
            medium,
            date_of_admission,
            per_address,
            family_id
        } = req.body;


     
        if (!Number.isInteger(studentId) || studentId <= 0) {
            return res.status(400).send(
                'Invalid Student ID'
            );
        }


       
        if (
            !admission_number ||
            !first_name ||
            !last_name ||
            !gender ||
            !dob ||
            !nic_number ||
            !birth_certificate_number ||
            !tele_number ||
            !house_id ||
            !grade_id ||
            !medium ||
            !date_of_admission ||
            !per_address ||
            !family_id
        ) {
            return res.status(400).send(
                'All fields are required'
            );
        }


    
        const [result] = await db.query(
            `UPDATE students
             SET admission_number = ?,
                 first_name = ?,
                 last_name = ?,
                 gender = ?,
                 dob = ?,
                 nic_number = ?,
                 birth_certificate_number = ?,
                 tele_number = ?,
                 house_id = ?,
                 grade_id = ?,
                 medium = ?,
                 date_of_admission = ?,
                 per_address = ?,
                 family_id = ?
             WHERE id = ?`,
            [
                admission_number,
                first_name,
                last_name,
                gender,
                dob,
                nic_number,
                birth_certificate_number,
                tele_number,
                house_id,
                grade_id,
                medium,
                date_of_admission,
                per_address,
                family_id,
                studentId
            ]
        );


   
        if (result.affectedRows === 0) {
            return res.status(404).send(
                'Student not found'
            );
        }


        // Success
        res.redirect('/student');

    } catch (err) {
        console.error('Update Student Error:', err);

        res.status(500).send(
            'Database Error!'
        );
    }
};



const createStudent = (req, res) => {

    res.render('student/create', {
        title: 'Student Create Page',
        message: 'Welcome to the student create page!'
    });

};



const addStudent = async (req, res) => {
    try {

        const {
            admission_number,
            first_name,
            last_name,
            gender,
            dob,
            nic_number,
            birth_certificate_number,
            tele_number,
            house_id,
            grade_id,
            medium,
            date_of_admission,
            per_address,
            family_id
        } = req.body;


   
        if (
            !admission_number ||
            !first_name ||
            !last_name ||
            !gender ||
            !dob ||
            !nic_number ||
            !birth_certificate_number ||
            !tele_number ||
            !house_id ||
            !grade_id ||
            !medium ||
            !date_of_admission ||
            !per_address ||
            !family_id
        ) {
            return res.status(400).send(
                'All fields are required'
            );
        }


        // Insert Student
        const [result] = await db.query(
            `INSERT INTO students
            (
                admission_number,
                first_name,
                last_name,
                gender,
                dob,
                nic_number,
                birth_certificate_number,
                tele_number,
                house_id,
                grade_id,
                medium,
                date_of_admission,
                per_address,
                family_id
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                admission_number,
                first_name,
                last_name,
                gender,
                dob,
                nic_number,
                birth_certificate_number,
                tele_number,
                house_id,
                grade_id,
                medium,
                date_of_admission,
                per_address,
                family_id
            ]
        );


        console.log(
            'Student created with ID:',
            result.insertId
        );


        // Success
        res.redirect('/student');

    } catch (err) {
        console.error('Add Student Error:', err);

        res.status(500).send(
            'Database Error!'
        );
    }
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