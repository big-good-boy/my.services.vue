<script lang="ts">
import type { Task, Translations } from '~/interfaces/task.interfaces.js';
import ToDoTask from './ToDoTask.vue';
import { TEXT } from '~/constants/toDo.js';

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

	data() {
		return {
			TEXT,
		};
	},

	computed: {
		numberOfActive(): number {
			return this.tasks.filter((task) => !task.done).length;
		},
	},

	methods: {
		formatActive(value: number, text: Translations): string {
			return `${value} ${
				value === 1
					? text.tasks.one
					: value < 5
					? text.tasks.few
					: text.tasks.many
			}`;
		},
	},
});
</script>

<template>
	<header :class="$style.info">
		<span :class="$style.active" v-if="numberOfActive">
			{{ formatActive(numberOfActive, TEXT) }}
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
