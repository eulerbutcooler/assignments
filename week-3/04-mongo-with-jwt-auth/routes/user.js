const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { Admin, User, Course } = require("../db");
const {JWT_SECRET} = require("../config");
const jwt = require("jsonwebtoken");

// User Routes
router.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    await User.create({
        username: username,
        password: password
    })

});

router.post('/signin', async (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    console.log(JWT_SECRET);

    const user = await User.find({
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

router.get('/courses', async (req, res) => {
    try{
        const courses = await Course.find();
        res.json(courses);
    }
    catch(err){
        res.status(500).json({ message: 'Error fetching courses' });
    }
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    try{
        const course = await Course.findById(req.params.courseId);
        if(!course){
            res.status(404).json({ message: 'Course not found' });
        }
        res.json(course);
    } catch(err){
        res.status(500).json({ message: 'Error fetching course' });
    }
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('purchasedCourses');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user.purchasedCourses);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching purchased courses' });
    }
});

module.exports = router