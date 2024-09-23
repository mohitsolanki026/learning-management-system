const joi = require("joi");

const schemas = {};

schemas.auth = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
});

schemas.addCourse = joi.object({
  name: joi.string().required(),
  // subjectIdList: joi.array().items(joi.string()).required(),
  semesterCount: joi.number().required(),
  price: joi.number().required(),
});

schemas.editCourse = joi.object({
  name: joi.string(),
  newSubjects: joi.array().items(joi.object()),
  deleteSubjects: joi.array().items(joi.string()),
  semesterCount: joi.number(),
  price: joi.number(),
});

schemas.addSubject = joi.object({
  name: joi.string().required(),
  semester: joi.number().required(),
  courseId: joi.string(),
  // teacherIds: joi.array().items(joi.string()).required(),
});



module.exports = schemas;
