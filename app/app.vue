<template>
	<main class="main">
		<section :class="[$style.services, 'container']">
			<ul :class="$style.list" ref="list" v-if="services">
				<li
					:class="[
						$style.item,
						activeService?.name === item.name && $style.active,
					]"
					v-for="(item, index) in services"
					:key="index"
					@click="activeService = item"
					v-text="item.name"
				/>
			</ul>
		</section>

		<component :is="activeService?.component" />
	</main>
</template>

<script lang="ts">
import ToDo from './components/toDo/ToDo.vue';

const services = [
	{ name: 'Список задач', component: markRaw(ToDo) },
	{ name: "Бл'ОК", component: markRaw(ToDo) },
];

export default defineComponent({
	name: 'App',

	data() {
		return {
			activeService: services[0],
			services,
		};
	},
});
</script>

<style lang="css" module>
.list {
	list-style-type: none;
	padding-left: 0;
	display: flex;
	gap: 10px;
}
.item {
	cursor: pointer;
}
.item.active {
	color: red;
}
</style>
