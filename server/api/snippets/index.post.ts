export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	const snippet = {
		...body,
		id: snippets.length ? Math.max(...snippets.map((s) => s.id)) + 1 : 1,
	};
	snippets.push(snippet);
	return snippet;
});
