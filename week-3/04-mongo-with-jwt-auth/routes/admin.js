const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const {JWT_SECRET} = require("../config/config");
const router = Router();
const jwt = require("jsonwebtoken");
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

router.post('/signin', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log(JWT_SECRET);

    const user = await Admin.find({
        username,
        password
    })
    if (user) {
        const token = jwt.sign({
            username
        }, JWT_SECRET);

        res.json({
            token
        })
    } else {
        res.status(411).json({
            message: "Incorrect email and pass"
        })
    }
});


router.post('/courses', adminMiddleware, async (req, res) => {
    const courseSchema = zod.object({
        title: zod.string(),
        description: zod.string(),
        imageLink: zod.string(),
        price: zod.number()
    })
    
    const course = courseSchema.parse(req.body);
    
    const newCourse = await Course.create({
        title: course.title,
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