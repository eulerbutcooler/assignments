const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin } = require("../db");
const { Course } = require("../db");
const router = Router();
const zod = require("zod");

// Admin Routes
router.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    await Admin.create({
        username: username,
        password: password
    })

    res.json({
        message: 'Admin created successfully'
    })
});

router.post('/courses', adminMiddleware, async (req, res) => {

    const courseSchema = zod.object({
        title: zod.string(),
        description: zod.string(),
        imageLink: zod.string().url(),
        price: zod.number()
    })

    const course = courseSchema.parse(req.body);
   
    const newCourse = await Course.create({
        course: course.title,
        description: course.description,
        imageLink: course.imageLink,
        price: course.price
    })

    res.json({
        message: 'Course created successfully', courseId: newCourse._id
    })
});

router.get('/courses', adminMiddleware, async (req, res) => {
    const response = await Course.find({});
    res.json({
        courses: response
    })
});

module.exports = router;