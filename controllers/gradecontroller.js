const db = require('../config/db.js');


const deleteGrade = async (req, res) => {
    try {
        const gradeId = Number(req.params.id);

        if (!Number.isInteger(gradeId) || gradeId <= 0) {
            return res.status(400).send('Invalid Grade ID');
        }

        const [result] = await db.query(
            'DELETE FROM grades WHERE id = ?',
            [gradeId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).send('Grade not found!');
        }

        res.redirect('/grade');

    } catch (err) {
        console.error('Delete Grade Error:', err);

        res.status(500).send(
            'Error executing query!'
        );
    }
};


const getAllGrades = async (req, res) => {
    try {
        const [grades] = await db.query(
            'SELECT * FROM grades ORDER BY id DESC LIMIT 10'
        );

        console.log(grades);

        res.render('grade/index', {
            title: 'Grade Page',
            message: 'Welcome to the grade page!',
            grades: grades
        });

    } catch (err) {
        console.error('Get All Grades Error:', err);

        res.status(500).send(
            'Error fetching grades!'
        );
    }
};



const getGradeById = async (req, res) => {
    try {
        const gradeId = Number(req.params.id);

        if (!Number.isInteger(gradeId) || gradeId <= 0) {
            return res.status(400).send(
                'Invalid Grade ID'
            );
        }

        const [grades] = await db.query(
            'SELECT * FROM grades WHERE id = ?',
            [gradeId]
        );

        if (grades.length === 0) {
            return res.status(404).render(
                'grade/not_found',
                {
                    title: 'Grade not found',
                    message: 'The requested grade was not found.'
                }
            );
        }

        console.log(grades);

        res.render('grade/show', {
            title: 'Grade Show Page',
            message: `Welcome to the grade page for grade ID: ${gradeId}`,
            grade: grades[0]
        });

    } catch (err) {
        console.error('Get Grade Error:', err);

        res.status(500).send(
            'Error fetching grade!'
        );
    }
};



const editGrade = async (req, res) => {
    try {
        const gradeId = Number(req.params.id);

        if (!Number.isInteger(gradeId) || gradeId <= 0) {
            return res.status(400).send(
                'Invalid Grade ID'
            );
        }

        const [grades] = await db.query(
            'SELECT * FROM grades WHERE id = ?',
            [gradeId]
        );

        if (grades.length === 0) {
            return res.status(404).render(
                'grade/not_found',
                {
                    title: 'Grade not found',
                    message: 'The requested grade was not found.'
                }
            );
        }

        res.render('grade/edit', {
            title: 'Edit Grade ' + grades[0].name,
            grade: grades[0]
        });

    } catch (err) {
        console.error('Edit Grade Error:', err);

        res.status(500).send(
            'Database Error!'
        );
    }
};



const updateGrade = async (req, res) => {
    try {
        const gradeId = Number(req.params.id);

        const {
            grade_name,
            grade_group,
            grade_order,
            colour
        } = req.body;



        if (!Number.isInteger(gradeId) || gradeId <= 0) {
            return res.status(400).send(
                'Invalid Grade ID'
            );
        }


 
        if (
            !grade_name ||
            !grade_group ||
            !grade_order ||
            !colour
        ) {
            return res.status(400).send(
                'All fields are required'
            );
        }


   
        const [result] = await db.query(
            `UPDATE grades
             SET name = ?,
                 \`group\` = ?,
                 \`order\` = ?,
                 colour = ?
             WHERE id = ?`,
            [
                grade_name,
                grade_group,
                grade_order,
                colour,
                gradeId
            ]
        );


      
        if (result.affectedRows === 0) {
            return res.status(404).send(
                'Grade not found'
            );
        }


       
        res.redirect('/grade');

    } catch (err) {
        console.error('Update Grade Error:', err);

        res.status(500).send(
            'Database Error!'
        );
    }
};


const createGrade = (req, res) => {

    res.render('grade/create', {
        title: 'Grade Create Page',
        message: 'Welcome to the grade create page!'
    });

};



const addGrade = async (req, res) => {
    try {

        const {
            grade_name,
            grade_group,
            grade_order,
            colour
        } = req.body;



        if (
            !grade_name ||
            !grade_group ||
            !grade_order ||
            !colour
        ) {
            return res.status(400).send(
                'All fields are required'
            );
        }



        const [result] = await db.query(
            `INSERT INTO grades
            (
                name,
                \`group\`,
                \`order\`,
                colour
            )
            VALUES (?, ?, ?, ?)`,
            [
                grade_name,
                grade_group,
                grade_order,
                colour
            ]
        );


        console.log(
            'Grade created with ID:',
            result.insertId
        );

        res.redirect('/grade');

    } catch (err) {
        console.error('Add Grade Error:', err);

        res.status(500).send(
            'Database Error!'
        );
    }
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