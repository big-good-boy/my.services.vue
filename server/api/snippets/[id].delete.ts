export default defineEventHandler(async (event) => {
	const id = Number(getRouterParam(event, 'id'));
	const index = snippets.findIndex((snippet) => snippet.id === id);

	if (index === -1) {
		throw createError({
			statusCode: 404,
			statusMessage: 'Not Found',
			message: 'Сниппет не найден',
		});
	}

	snippets.splice(index, 1);
});
