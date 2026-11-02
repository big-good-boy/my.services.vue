import type { SnippetRow } from '~~/server/utils/snippets';

export default defineEventHandler(async () => {
	let [rows] = await db.query<SnippetRow[]>('SELECT * FROM snippets');

	return rows.map((snippet) => ({
		...snippet,
		demo: !!snippet.demo,
	}));
});
