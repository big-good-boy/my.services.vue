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
});
</script>

<template>
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
</style>
