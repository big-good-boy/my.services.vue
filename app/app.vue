<template>
	<main class="main">
		<section :class="[$style.services, 'container']">
			<ul :class="$style.list" ref="list">
				<li
					:class="[$style.item, activeService === item ? $style.active : '']"
					v-for="(item, index) in services"
					:key="index"
					@click="activeService = item"
				>
					{{ item }}
				</li>
			</ul>
		</section>

		<ToDo v-if="activeService == services[0]" />
		<ToDo v-if="activeService == services[1]" />
	</main>
</template>

<script lang="ts">
export default defineComponent({
	name: 'App',

	data() {
		return {
			activeService: 'Список задач',
			services: ['Список задач', "Бл'ОК"],
		};
	},

	mounted() {},

	methods: {},
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
