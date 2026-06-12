<template>
	<main class="main">
		<ServicesList />
		<component :is="activeService?.component" />
	</main>
</template>

<script lang="ts">
import ToDo from './components/toDo/ToDo.vue';

const servicesList = [
	{ name: 'Список задач', component: markRaw(ToDo) },
	{ name: "Бл'ОК", component: markRaw(ToDo) },
];

export default defineComponent({
	name: 'App',

	data() {
		return {
			activeService: servicesList[0],
			servicesList,
		};
	},
});
</script>

<style lang="css" module></style>
