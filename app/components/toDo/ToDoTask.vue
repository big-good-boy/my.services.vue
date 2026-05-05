<script lang="ts">
import type { Task } from "~/interfaces/task.interfaces.js"
import { TEXT } from '~/constants/toDo.js';

export default defineComponent ({
	name: 'ToDoTask',

	props: {
		task: {
			type: Object as () => Task,
			required: true,
		},
	},

	emits: ['remove'],

	data() {
		return {
			TEXT,
		};
	},

	methods: {
		formatDate(timestamp: number): string {
			const taskDate = new Date(timestamp);

			// Красивый вывод даты создания
			const now = new Date();
			const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
			const yesterday = new Date(today);
			yesterday.setDate(yesterday.getDate() - 1);
			const taskDay = new Date(taskDate.getFullYear(), taskDate.getMonth(), taskDate.getDate());
			const differenceDays = Math.floor((today.getTime() - taskDay.getTime()) / (1000 * 60 * 60 * 24));
			if (taskDate.toDateString() === today.toDateString()) {
				return "сегодня";
			};
			if((taskDate.toDateString() === yesterday.toDateString())) {
				return "вчера";
			};      
			if (differenceDays < 5) {
				return `${differenceDays} дня назад`;
			};
			if (differenceDays < 8) {
				return `${differenceDays} дней назад`;
			};
			
			return taskDate.toLocaleDateString('ru-RU', {
				day: 'numeric',
				month: 'long',
				year: 'numeric',
			});
		},

		handleRemove(): void {
			this.$emit('remove', this.task.id);
		},
	},
})
</script>

<template>
	<li :class="[
			$style.item,
			task.priority && $style.itemPriority,
	]">
		<input
			:class="$style.checkbox"
			type="checkbox"
			:id="`_${task.id}`"
			v-model="task.done"
		>

		<label
			:class="$style.text"
			:for="`_${task.id}`"
		>
			<span :class="$style.textTitle">
				{{ task.title }}
			</span>

			<p :class="$style.textDescription">
				{{ task.text }}
			</p>

			<small :class="$style.textDate">
				{{ TEXT.dateLabel + formatDate(task?.date) }}
			</small>
		</label>

		<Icon
			:class="$style.remove"
			@click="handleRemove"
			name="material-symbols:delete-outline"
			size="20"
		/>
	</li>
</template>

<style lang="css" module>
.item {
	position: relative;
  display: flex;
  gap: 16px;
  padding: 4px 8px;
  border: 1px solid var(--blue);
  border-radius: 4px;
}
.itemPriority {
	border: 1px solid var(--red);
}
.checkbox {
  display: none;
}
.checkbox:checked + .text .textTitle {
  text-decoration: line-through;
}
.checkbox:checked + .text .textDescription,
.checkbox:checked + .text .textDate {
  color: var(--gray);
}
.text {
  flex-grow: 1;
}
.textTitle {}
.textDescription {
  white-space: pre-wrap;
}
.textDate {}
.remove {
	position: absolute;
	align-self: flex-start;
	top: 4px;
	right: 8px;
  cursor: pointer;
	color: var(--red);
}
</style>
