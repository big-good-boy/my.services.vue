import type { ResultSetHeader } from 'mysql2';

export default defineEventHandler(async (event) => {
	const id = Number(getRouterParam(event, 'id'));

	const [result] = await db.query<ResultSetHeader>(
		'DELETE FROM snippets WHERE id = ?',
		[id]
	);

	if (result.affectedRows === 0) {
		throw createError({
			statusCode: 404,
			statusMessage: 'Not Found',
			message: 'Сниппет не найден',
		});
	}
});
