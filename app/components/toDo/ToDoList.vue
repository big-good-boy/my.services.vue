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
			showHidden: true as boolean,
		};
	},

	computed: {
		numberOfActive(): number {
			return this.tasks.filter((task) => !task.done).length;
		},

		hidden(): Task[] {
			return !this.showHidden
				? this.tasks.filter((task) => !task.done)
				: this.tasks;
		},
	},

	methods: {
		formatActive(value: number): string {
			const { one, few, many } = this.TEXT.tasks;
			const lastDigit = value % 10;
			const lastTwo = value % 100;
			if (lastTwo >= 11 && lastTwo <= 14) return `${value} ${many}`;
			if (lastDigit === 1) return `${value} ${one}`;
			if (lastDigit >= 2 && lastDigit <= 4) return `${value} ${few}`;
			return `${value} ${many}`;
		},
	},
});
</script>

<template>
	<header :class="$style.info">
		<span :class="$style.active" v-if="numberOfActive">
			{{ formatActive(numberOfActive) }}
		</span>

		<label :class="$style.hidden">
			<span :class="$style.hiddenLabel">
				{{ TEXT.hiddenLabel }}
			</span>

			<input
				:class="$style.hiddenCheckbox"
				type="checkbox"
				v-model="showHidden"
			/>

			<div :class="[$style.hiddenIcon, showHidden && $style.hiddenIconChecked]">
				<Icon
					:name="
						showHidden
							? 'cuida:checkbox-checked-outlined'
							: 'cuida:checkbox-unchecked-outlined'
					"
					size="20"
				/>
			</div>
		</label>
	</header>
	<ul :class="$style.list" v-if="tasks.length">
		<ToDoTask
			v-for="task in hidden"
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
	display: flex;
	justify-content: space-between;
	gap: 8px;
	margin-top: 16px;
	color: var(--gray);
}
.hidden {
	display: flex;
	align-items: flex-end;
	gap: 4px;
	cursor: pointer;
}
.hiddenIcon {
	line-height: 0;
	color: var(--blue);
	width: 20px;
	height: 20px;
}
.hiddenIconChecked {
}
.hiddenCheckbox {
	display: none;
}
.hiddenLabel {
	position: relative;
	top: 1px;
	color: var(--gray);
}
.active {
}
</style>
