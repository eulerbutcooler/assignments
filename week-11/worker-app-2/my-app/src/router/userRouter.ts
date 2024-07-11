import { Hono } from "hono";
import { signup, signin, userprofile, allusers } from "../controllers/user";
import { authMidlleware } from "../middlewares/authmiddleware";

export const userRouter = new Hono()

userRouter.post('/signup', signup)
userRouter.post('/signin', signin)

userRouter.get('/user/:id',authMidlleware, userprofile)
userRouter.get('/users', authMidlleware, allusers)
