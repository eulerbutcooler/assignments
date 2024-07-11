import { PrismaClient } from '@prisma/client/extension';
import { withAccelerate } from '@prisma/extension-accelerate';
import { userSigninSchema, userSignupSchema } from '../zodschema/zodschemas';
import { Jwt } from 'hono/utils/jwt';
import { Context } from 'hono';
import { compareSync, hashSync } from 'bcrypt-ts';

export async function signup(c: Context) {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

	try {
		const body: {
			username: string;
			email: string;
			password: string;
		} = await c.req.json();
		const validationResult = userSignupSchema.safeParse(body);
		if (!validationResult.success) {
			return c.json({ error: validationResult.error.flatten() }, 400);
		}

		const existingUsername = await prisma.user.findUnique({
			where: { username: body.username },
		});
		if (existingUsername) {
			return c.json({ error: 'Username already exists.' }, 400);
		}

		const existingEmail = await prisma.user.findUnique({
			where: { email: body.email },
		});
		if (existingEmail) {
			return c.json({ error: 'Email already in use.' }, 400);
		}

		const hashedpass = hashSync(body.password, 10);

		const res = await prisma.user.create({
			data: {
				username: body.username,
				email: body.email,
				password: hashedpass,
			},
		});

		const token = await Jwt.sign(res.id, c.env.JWT_SECRET_KEY);

		return c.json({
			msg: 'User Created',
			token: token,
			user: {
				id: res.id,
				username: res.username,
				email: res.email,
			},
		});
	} catch (error) {
		console.error('Database error: ', error);
		return c.body('An error occured while signin up', 500);
	}
}

export async function signin(c: Context) {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

	try {
		const body: {
			email: string;
			password: string;
		} = await c.req.json();
		const validationResult = userSigninSchema.safeParse(body);
		if (!validationResult.success) {
			return c.json({ error: validationResult.error.flatten() }, 400);
		}

		const userexists = await prisma.user.findUnique({
			where: { email: body.email },
		});

		if (!userexists) {
			return c.json({ error: 'Invalid user' });
		}

		const isPasswordValid = compareSync(body.password, userexists.password);

		if (isPasswordValid) {
			const token = Jwt.sign({ id: userexists.id }, c.env.JWT_SECRET_KEY);
			return c.json({
				msg: 'Succesfully signed in',
				token: token,
				user: {
					id: userexists.id,
					username: userexists.username,
					email: userexists.email,
				},
			});
		} else {
			return c.json({ error: 'Invalid username or password' });
		}
	} catch (error) {
		console.error('Sign in error:', error);
		return c.body('An error occcured while signing in', 500);
	}
}

export async function userprofile(c: Context) {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

	try {
		const res = await prisma.user.findFirst({
			where: { id: Number(c.req.param('id')) },
			include: { posts: true },
		});

		if (!res) {
			return c.body('User not found', 404);
		} else {
			return c.json({
				user: {
					id: res.id,
					username: res.username,
					email: res.email,
					posts: res.posts,
				},
			});
		}
	} catch (error) {
		console.error('Internal server error: ', error);
		return c.body('Internal server error', 500);
	}
}

export async function allusers(c: Context) {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

	try {
		const res = await prisma.user.findMany({
			select: {
				id: true,
				username: true,
				email: true,
			},
		});
		return c.json({ users: res });
	} catch (error) {
		console.error('Internal server error', 500);
		return c.body('Internal server error', 500);
	}
}
