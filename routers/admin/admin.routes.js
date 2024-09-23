const router = require('express').Router();
const authController = require('../../controllers/admin/auth.admin.controller.js');
const adminController = require('../../controllers/admin/admin.controller.js');
const auth = require('../../middlewares/admin.middlewares.js');

// --------auth routes--------
router.post('/signup', authController.signup);
router.post('/signin', authController.signin);

// --------dashboard stats routes--------

router.get('/dashboardStats', auth, adminController.dashboard);

// --------course routes--------

router.post('/addCourse', auth, adminController.addCourse);
router.get('/getCourses', auth, adminController.getCourses);
router.get('/getCourse/:id', auth, adminController.getCourse);
router.patch('/updateCourse/:id', auth, adminController.editCourse);

// --------subject routes--------
router.post('/addSubject', auth, adminController.addSubject);
router.get('/getSubjects', auth, adminController.getSubjects);
router.get('/getSubject/:id', auth, adminController.getSubject);
router.patch('/updateSubject/:id', auth, adminController.editSubject);

// --------teacher routes--------
router.get('/getTeachers', auth, adminController.getTeachers);
router.get('/getTeacher/:id', auth, adminController.getTeacher);
router.patch('/changeTeacherStatus/:id', auth, adminController.changeStatusTeacher);

// --------student routes--------
router.get('/getStudents', auth, adminController.getStudents);
router.get('/getStudent/:id', auth, adminController.getStudent);
router.patch('/changeStudentStatus/:id', auth, adminController.changeStatusStudent);

// --------parent routes--------
router.get('/getParents', auth, adminController.getParents);

// --------doubt routes--------
router.get('/getDoubts', auth, adminController.getDoubts);

// --------transaction routes--------
router.get('/getTransactions', auth, adminController.transactions);

module.exports = router;