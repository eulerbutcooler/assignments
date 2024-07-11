import { PrismaClient } from '@prisma/client/extension';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Context } from 'hono';

export async function getPosts(c: Context) {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

	try {
		const response = await prisma.posts.findMany({
			include: {
				tags: true,
				author: true,
			},
		});

		return c.json({
			post: response.map((res:any) => ({
				id: res.id,
				username: res.User.username,
				title: res.title,
				postbody: res.postbody,
				tags: res.tags,
				createdAt: res.createdAt,
			})),
		});
	} catch (error) {
		console.error('An error occurred while getting the posts', error);
		return c.body('Internal server error', 500);
	}
}

export async function getUserPosts(c: Context) {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

	try {
		const resp = await prisma.posts.findMany({
			where: {
				authorId: c.get('authorId'),
			},
		});
		return c.json({
			post: resp,
		});
	} catch (error) {
		console.error('An error occured while getting user posts', error);
		return c.body(`Internal server error: ${error}`, 500);
	}
}

export async function createPost(c: Context) {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

	try {
		const body: {
			title: string;
			postbody: string;
			tags: string;
		} = await c.req.json();

		const tagname = body.tags.split(',').map((tag) => tag.trim());

		if ((body.postbody && body.title) == null) {
			return c.body('Invalid user input', 500);
		}

		const res = await prisma.posts.create({
			data: {
				title: body.title,
				postbody: body.postbody,
				authorId: c.get('authorId'),
				tags: {
					connectOrCreate: tagname.map((tag) => ({
						where: { tag: tag },
						create: { tag: tag },
					})),
				},
			},
			include: {
				tags: true,
			},
		});
		return c.json({
			message: 'Post created successfully',
			post: {
				id: res.id,
				title: res.title,
				postbody: res.postbody,
				tags: res.tags.map((tag:any) => tag.tag),
				createdAt: res.createdAt,
			},
		});
	} catch (error) {
		console.error('An error occurred while creating the post', error);
		return c.body('Internal server error', 500);
	}
}

export async function updatePost(c: Context) {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

	try {
		const id: number = Number(c.req.param('id'));

		const body: {
			title: string;
			postbody: string;
			tags: string;
		} = await c.req.json();

		const tagname = body.tags.split(',').map((tag) => tag.trim());

		const postexists = await prisma.posts.findFirst({
			where: {
				id: id,
				authorId: c.get('authorId'),
			},
		});
		if (postexists == null) {
			return c.body('Post does not exists', 404);
		}

		const res = await prisma.posts.update({
			where: {
				id: id,
				authorId: c.get('authorId'),
			},
			data: {
				title: body.title,
				postbody: body.postbody,
				tags: {
					connectOrCreate: tagname.map((tag) => ({
						where: { tag },
						create: { tag },
					})),
				},
			},
			include: {
				tags: true,
			},
		});

		return c.json({
			data: {
				id: res.id,
				title: res.title,
				postbody: res.postbody,
				tags: res.tags,
				createdAt: res.createdAt,
			},
		});
	} catch (error) {
		console.error('An error occured while updating the post', 500);
		return c.body('Internal server error: ', 500);
	}
}

export async function deletePost(c: Context) {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

	try {
		const id: number = Number(c.req.param('id'));

		const postexists = await prisma.posts.findFirst({
			where: {
				id: id,
				authorId: c.get('authorId'),
			},
		});
		if (postexists == null) {
			return c.body('Post does not exists', 404);
		}

		const res = await prisma.posts.delete({
			where: {
				id: id,
				authorId: c.get('authorId'),
			},
		});

		return c.json({
			message: 'Post deleted.',
		});
	} catch (error) {
		console.error('An error occurred while deleting the post', 500);
		return c.body("Couldn't delete the post.", 500);
	}
}
