const teacherModel = require('../../models/teacher.model');
const courseModel = require('../../models/course.model');
const subjectModel = require('../../models/Subject.model');
const doubtModel = require('../../models/doubt.model');
const studentModel = require('../../models/student.model');
const studyMaterialModel = require('../../models/StudyMaterial.model');
const RecordedLectureModel = require('../../models/RecordedLecture.model');
const mcqExamModel = require('../../models/mcqExam.model');
const assignmentExamModel = require('../../models/assignmentExam.model');
const schemas = require('../../validations/joi.validation');
const parentModel = require('../../models/parent.model');
const transactionModel = require('../../models/transaction.model');

const routes = {};

routes.dashboard = async (req, res) => {
    try {
        const teacherCount = await teacherModel.countDocuments();
        const studentCount = await studentModel.countDocuments();
        const courseCount = await courseModel.countDocuments();
        const videoCount = await RecordedLectureModel.countDocuments();
        const quizCount = await mcqExamModel.countDocuments();
        const assignmentCount = await assignmentExamModel.countDocuments();
        const subjectCount = await subjectModel.countDocuments();
        const studyMaterialCount = await studyMaterialModel.countDocuments();
        const totalTransactions = await transactionModel.aggregate([
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: '$amount',
                    },
                },
            },
        ]);
        // const subjectCount = await subjectModel.countDocuments();
        // const doubtCount = await doubtModel.countDocuments();
        // const studyMaterialCount = await studyMaterialModel.countDocuments();
        
        res.status(200).json({
            teacherCount,
            studentCount,
            courseCount,
            videoCount,
            quizCount,
            assignmentCount,
            subjectCount,
            totalTransactions,
            studyMaterialCount
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

routes.addCourse = async (req, res) => {
    try {
        const { name, price, semesterCount } = req.body;
        const error = schemas.addCourse.validate(req.body);
        if (error.error) {
            return res.status(400).json({ message: error.error.details[0].message });
        }
        const newCourse = await courseModel.create({ name, price, semesterCount });        
        res.status(200).json({ message: 'Course created successfully' , newCourse});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

routes.getCourses = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        // const {status} = req.query;
        // const query = {};
        // if(status) {
        //     query.status = status;
        // }
        const totalCourses = await courseModel.countDocuments();
        const courses = await courseModel.find().populate("subjectIdList").skip((page - 1) * limit).limit(limit);
        
        res.status(200).json({ courses, totalCourses, message: 'Courses found', totalPages: Math.ceil(totalCourses / limit), currentPage: page });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

routes.getCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await courseModel.findOne({ _id: id }).populate('subjectIdList');
        
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        res.status(200).json({ course, message: 'Course found' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

routes.editCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, semesterCount, newSubjects, deleteSubjects } = req.body;

        const error = schemas.editCourse.validate(req.body);

        if (error.error) {
            return res.status(400).json({ message: error.error.details[0].message });
        }

        newSubjects.forEach(subject => {
            const newError = schemas.addSubject.validate(subject);
            if (newError.error) {
                return res.status(400).json({ message: newError.error.details[0].message });
            }
        });

        const course = await courseModel.findOne({ _id: id });
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        if (name) {
            course.name = name;
        }
        if (price) {
            course.price = price;
        }
        if (semesterCount) {
            course.semesterCount = semesterCount;
        }
        if (newSubjects) {
            newSubjects.forEach(async(subject) => {
                if(subject.semester > course.semesterCount) {
                    return res.status(400).json({ message: 'Semester of subject cannot be greater than semester count of course' });
                }
            // const newSubject = await subjectModel.create({ name: subject.name, semester: subject.semester, courseId: id });
            const newSubject = new subjectModel({ name: subject.name, semester: subject.semester, courseId: id });
            course.subjectIdList.push(newSubject._id);
            await newSubject.save();
            });
        }
        if (deleteSubjects) {
            deleteSubjects.forEach(async(subjectId) => {
                course.subjectIdList.pull(subjectId);
                await subjectModel.findByIdAndUpdate(subjectId, { courseId: null });
            });
        }

// console.log(course,"old");
        const newCourse = await course.save();
        // console.log(newCourse,"new");
        res.status(200).json({ message: 'Course updated successfully' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

routes.addSubject = async (req, res) => {
    try {
        const { name, semester, courseId } = req.body;
        const error = schemas.addSubject.validate(req.body);
        if (error.error) {
            return res.status(400).json({ message: error.error.details[0].message });
        }
        const newSubject = await subjectModel.create({ name, semester, courseId });        
        return res.status(200).json({ message: 'Subject created successfully' , newSubject});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

routes.getSubjects = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const totalSubjects = await subjectModel.countDocuments();
        const subjects = await subjectModel.find().populate('courseId',"-subjectIdList").skip((page - 1) * limit).limit(limit);
        if(!subjects) {
            return res.status(404).json({ message: 'Subjects not found' });
        }
        res.status(200).json({ subjects, totalSubjects, message: 'Subjects found', totalPages: Math.ceil(totalSubjects / limit), currentPage: page});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

routes.getSubject = async (req, res) => {
    const { id } = req.params;
    try {
        const subject = await subjectModel.findOne({ _id: id }).populate('courseId teacherIds studyMaterialId');
        if(!subject) {
            return res.status(404).json({ message: 'Subject not found' });
        }
        res.status(200).json({ subject, message: 'Subject found'});
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

routes.editSubject = async (req, res) => {
    try {
        const { subjectId } = req.params;
        const { name, semester, courseId, teacherIds, studyMaterialId } = req.body;

        const error = schemas.editSubject.validate(req.body);

        if (error.error) {
            return res.status(400).json({ message: error.error.details[0].message });
        }

        const subject = await subjectModel.findOne({ _id: subjectId });
        if (!subject) {
            return res.status(404).json({ message: 'Subject not found' });
        }

        if (name) {
            subject.name = name;
        }
        if (semester) {
            subject.semester = semester;
        }
        if (courseId) {
            subject.courseId = courseId;
        }
        if (teacherIds) {
            subject.teacherIds = teacherIds;
        }
        if (studyMaterialId) {
            subject.studyMaterialId = studyMaterialId;
        }

        await subject.save();
        res.status(200).json({ message: 'Subject updated successfully' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

routes.getTeachers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const {status} = req.query;
        const query = {};
        if(status) {
            query.status = status;
        }
        const totalTeachers = await teacherModel.countDocuments(query);
        const teachers = await teacherModel.find(query).skip((page - 1) * limit).limit(limit);
        
        return res.status(200).json({ teachers, totalTeachers, message: 'Teachers found', totalPages: Math.ceil(totalTeachers / limit), currentPage: page });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
} 

routes.getTeacher = async (req, res) => {
    try {
        const { teacherId } = req.params;
        const teacher = await teacherModel.findOne({ _id: teacherId }).populate('subjects');
        if(!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }
        res.status(200).json({ teacher });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

routes.changeStatusTeacher = async (req, res) => {
    try {
        const { teacherId } = req.params;
        const { status } = req.body;

        if(status !== 'active' && status !== 'inactive') {
            return res.status(400).json({ message: 'Invalid status' });
        }

        await teacherModel.updateOne({ _id: teacherId }, { status });
        return res.status(200).json({ message: 'Status updated successfully' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

routes.getStudents = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const {status} = req.query;
        const query = {};
        if(status) {
            query.status = status;
        }
        const totalStudents = await studentModel.countDocuments(query);
        const students = await studentModel.find(query).skip((page - 1) * limit).limit(limit);
        if(!students) {
            return res.status(404).json({ message: 'Students not found' });
        }
        res.status(200).json({ students, totalStudents, message: 'Students found', totalPages: Math.ceil(totalStudents / limit), currentPage: page });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

routes.changeStatusStudent = async (req, res) => {
    try {
        const { studentId } = req.params;
        const { status } = req.body;
        // 'active', 'inactive', 'pending', 'blocked', 'deleted', 'suspended', 'graduated', 'dropped', 'transferred', 'other'
        if(status !== 'active' && status !== 'inactive' && status !== 'pending' && status !== 'blocked' && status !== 'deleted' && status !== 'suspended' && status !== 'graduated' && status !== 'dropped' && status !== 'transferred' && status !== 'other') {
            return res.status(400).json({ message: 'Invalid status' });
        }

        await studentModel.updateOne({ _id: studentId }, { status });
        return res.status(200).json({ message: 'Status updated successfully' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

routes.getStudent = async (req, res) => {
    try {
        const { studentId } = req.params;
        const student = await studentModel.findOne({ _id: studentId }).populate('courseId');
        if(!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json({ student, message: 'Student found' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

routes.getParents = async (req, res) => {
    try { 
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const parents = await parentModel.find().populate('studentId', 'name course rollNo currentSem').skip((page-1)*limit).limit(limit);
        if(!parents) {
            return res.status(404).json({ message: 'Parents not found' });
        }
        return res.status(200).json({ parents, message: 'Parents found' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

routes.getDoubts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const {status} = req.query;
        const query = {};
        if(status) {
            query.status = status;
        }
        const totalDoubts = await doubtModel.countDocuments(query);
        const doubts = await doubtModel.find(query).populate('studentId', 'name course rollNo currentSem').skip((page-1)*limit).limit(limit);
        if(!doubts) {
            return res.status(404).json({ message: 'Doubts not found' });
        }
        return res.status(200).json({ doubts, totalDoubts, message: 'Doubts found', totalPages: Math.ceil(totalDoubts / limit), currentPage: page });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

routes.transactions = async (req, res) => {
    try {
        const transactions = await transactionModel.find().populate('studentId', 'name course rollNo currentSem');
        if(!transactions) {
            return res.status(404).json({ message: 'Transactions not found' });
        }
        return res.status(200).json({ transactions, message: 'Transactions found' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

module.exports = routes;