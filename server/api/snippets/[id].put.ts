import type { ResultSetHeader } from 'mysql2';
import type { Snippet } from '~/interfaces/snippet.interfaces';

export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	const id = Number(getRouterParam(event, 'id'));
	const [result] = await db.query<ResultSetHeader>(
		'UPDATE snippets SET title = ?, description = ?, language = ?, category = ?, code = ?, demo = ? WHERE id = ?',
		[
			body.title,
			body.description,
			JSON.stringify(body.language),
			body.category,
			body.code,
			body.demo,
			id,
		]
	);

	if (result.affectedRows === 0) {
		throw createError({
			statusCode: 404,
			statusMessage: 'Not Found',
			message: 'Сниппет не найден',
		});
	}

	const updated: Snippet = {
		title: body.title,
		description: body.description,
		language: body.language,
		category: body.category,
		code: body.code,
		demo: body.demo,
		id,
	};
	return updated;
});
