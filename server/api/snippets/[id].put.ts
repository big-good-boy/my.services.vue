export default defineEventHandler(async (event) => {
	const id = Number(getRouterParam(event, 'id'));
	const index = snippets.findIndex((snippet) => snippet.id === id);
	const body = await readBody(event);

	if (index === -1) {
		throw createError({
			statusCode: 404,
			statusMessage: 'Not Found',
			message: 'Сниппет не найден',
		});
	}

	const newData = {
		...snippets[index],
		...body,
		id,
	};
	snippets[index] = newData;
	return newData;
});
