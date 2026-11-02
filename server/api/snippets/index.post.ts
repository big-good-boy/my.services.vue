import type { ResultSetHeader } from 'mysql2';
import type { Snippet } from '~/interfaces/snippet.interfaces';

export default defineEventHandler(async (event) => {
	const body = await readBody(event);

	const [result] = await db.query<ResultSetHeader>(
		'INSERT INTO snippets (title, description, language, category, code, demo) VALUES (?, ?, ?, ?, ?, ?)',
		[
			body.title,
			body.description,
			JSON.stringify(body.language),
			body.category,
			body.code,
			body.demo,
		]
	);

	const snippet: Snippet = {
		title: body.title,
		description: body.description,
		language: body.language,
		category: body.category,
		code: body.code,
		demo: body.demo,
		id: result.insertId,
	};

	return snippet;
});
