import { Hono } from 'hono';
import { createPost, deletePost, getPosts, getUserPosts, updatePost } from '../controllers/posts';
import { authMidlleware } from '../middlewares/authmiddleware';

export const postRouter = new Hono();

postRouter.get('/all-posts', getPosts);
postRouter.get('/posts', authMidlleware, getUserPosts);
postRouter.post('/create-post', authMidlleware, createPost);
postRouter.get('/post/:id', authMidlleware, getPosts);
postRouter.put('/post/:id', authMidlleware, updatePost);
postRouter.delete('/post/:id', authMidlleware, deletePost);
