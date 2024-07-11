import { Hono } from "hono";
import { getPostsbyTag, getTags } from "../controllers/tags";

export const tagRouter = new Hono()

tagRouter.get('/getPost/:tag', getPostsbyTag)
tagRouter.get('/tags', getTags)