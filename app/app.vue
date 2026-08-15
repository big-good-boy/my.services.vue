<template>
	<main class="main">
		<!-- 		
		<section :class="[$style.servicesList, 'container']">
			<ul :class="$style.list" ref="list" v-if="servicesList">
				<li
					:class="[
						$style.item,
						activeService?.name === item.name && $style.active,
					]"
					v-for="(item, index) in servicesList"
					:key="index"
					@click="activeService = item"
					v-text="item.name"
				/>
			</ul>
		</section>
		-->

		<ServicesList :serviceNames />
		<component :is="activeService?.component" @activeService="selectService" />
	</main>
</template>

<script lang="ts">
import ToDo from './components/toDo/ToDo.vue';
import ToDoForm from './components/toDo/ToDoForm.vue';

const servicesList = [
	{ name: 'Список задач', component: markRaw(ToDo) },
	{ name: "Бл'ОК", component: markRaw(ToDoForm) },
];

export default defineComponent({
	name: 'App',

	data() {
		return {
			activeService: servicesList[0],
			servicesList,
		};
	},

	computed: {
		serviceNames(): string[] {
			return this.servicesList.map(({ name }) => name);
		},
	},

	methods: {
		selectService() {
			console.log(1);
		},
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
