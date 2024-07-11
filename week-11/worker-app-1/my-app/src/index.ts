import { Hono } from 'hono';
import { userRouter } from './router/userRouter';
import { cors } from 'hono/cors';
import { postRouter } from './router/postRouter';
import { tagRouter } from './router/tagRouter';
const app = new Hono();

app.use(cors());

app.route('/api/v1/user', userRouter);
app.route('/api/v1/posts', postRouter);
app.route('/api/v1/tags', tagRouter);

export default app;
