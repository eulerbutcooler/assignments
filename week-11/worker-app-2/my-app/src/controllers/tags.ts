import { PrismaClient } from '@prisma/client/extension';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Context } from 'hono';

export async function getTags(c: Context) {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

	try {
		const res = await prisma.tags.findMany();

		return c.json({
			tags: res,
		});
	} catch (error) {
		console.error('An error occurred while fetching tags', error);
		return c.body('Internal server error', 500);
	}
}

export async function getPostsbyTag(c: Context) {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

	try {
		const res = await prisma.tags.findMany({
			where: {
				tag: String(c.req.param('tag')),
			},
			select: {
				post: {
					select: {
						User: { select: { username: true } },
						id: true,
						authorId: true,
						title: true,
						postbody: true,
						createdAt: true,
					},
				},
			},
		});

		return c.json({
			posts: res[0]?.post.map((post: any) => ({
				username: post.User.username,
				id: post.id,
				title: post.title,
				authorId: post.authorId,
				postbody: post.postbody,
				createdAt: post.createdAt,
			})),
		});
	} catch (error) {
		console.error('An error occurred while fetching posts by tag', error);
		return c.body('Internal server error', 500);
	}
}
