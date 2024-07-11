import { Next, Context } from 'hono';
import { Jwt } from 'hono/utils/jwt';

export async function authMidlleware(c: Context, next: Next) {
	const jwt_token = c.env.JWT_SECRET_KEY;

	try {
		const authHeader = c.req.header('Authorization')?.split(' ')[1];
		if (authHeader) {
			const decodedUser = await Jwt.verify(authHeader, jwt_token);
			if (decodedUser) {
				c.set('id', decodedUser);
				await next();
			} else {
				return c.body('Unauthorized user', 401);
			}
		} else {
			return c.body('Unauthorized user', 401);
		}
	} catch (error) {
		return c.body('Unauthorized', 401);
	}
}
