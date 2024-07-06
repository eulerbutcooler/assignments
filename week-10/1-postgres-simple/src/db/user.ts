import { client } from "..";

/*
 * Should insert into the users table
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
export async function createUser(
  username: string,
  password: string,
  name: string
) {
  try {
    const query: string =
      "INSERT INTO users (username, password, name) VALUES ($1, $2, $3) RETURNING username, password, name";
    const result = await client.query(query, [username, password, name]);
    return result.rows[0];
  } catch (error) {
    console.error("Error creating user: ", error);
    throw error;
  }
}

/*
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
export async function getUser(userId: number) {
  try {
    const query: string =
      "SELECT id, username, password, name FROM users WHERE id = $1";
    const result = await client.query(query, [userId]);
    return result.rows[0];
  } catch (error) {
    console.error("Error fetching user: ", error);
    throw error;
  }
}
