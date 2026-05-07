<script lang="ts">
import type { Task } from '~/interfaces/task.interfaces.js';
import ToDoTask from './ToDoTask.vue';

export default defineComponent({
	name: 'ToDoList',

	components: {
		ToDoTask,
	},

	props: {
		tasks: {
			type: Array as () => Task[],
			required: true,
		},
	},

	emits: ['remove', 'edit'],

	computed: {
		numberOfActive(): number {
			return this.tasks.filter((task) => !task.done).length;
		},
	},

	methods: {
		formatActive(value: number): string {
			return `${value} ${
				value === 1 ? ' задача' : value < 5 ? ' задачи' : 'задач'
			}`;
		},
	},
});
</script>

<template>
	<header :class="$style.info">
		<span :class="$style.active" v-if="numberOfActive">
			{{ formatActive(numberOfActive) }}
		</span>
	</header>
	<ul :class="$style.list" v-if="tasks.length">
		<ToDoTask
			v-for="task in tasks"
			:key="task.id"
			:task="task"
			@remove="$emit('remove', task.id)"
			@edit="$emit('edit', task)"
		/>
	</ul>
</template>

<style lang="css" module>
.list {
	display: flex;
	flex-direction: column;
	gap: 16px;
	margin-bottom: 0;
	border-top: 1px solid var(--blue);
	padding-top: 16px;
	padding-left: 0;
}
.info {
	margin-top: 16px;
	color: var(--gray);
}
.active {
}
</style>
