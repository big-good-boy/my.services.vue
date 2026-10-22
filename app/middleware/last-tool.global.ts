export default defineNuxtRouteMiddleware((to) => {
	if (import.meta.server) return;
	if (to.path === '/') {
		return navigateTo(localStorage.getItem('lastTool') ?? '/todos', {
			replace: true,
		});
	} else {
		localStorage.setItem('lastTool', to.path);
	}
});
