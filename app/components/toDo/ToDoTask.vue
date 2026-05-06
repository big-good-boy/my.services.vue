<script lang="ts">
import type { Task } from '~/interfaces/task.interfaces.js';
import { TEXT } from '~/constants/toDo.js';

export default defineComponent({
	name: 'ToDoTask',

	props: {
		task: {
			type: Object as () => Task,
			required: true,
		},
	},

	emits: ['remove', 'edit'],

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
			const taskDay = new Date(
				taskDate.getFullYear(),
				taskDate.getMonth(),
				taskDate.getDate()
			);
			const differenceDays = Math.floor(
				(today.getTime() - taskDay.getTime()) / (1000 * 60 * 60 * 24)
			);
			if (taskDate.toDateString() === today.toDateString()) {
				return 'сегодня';
			}
			if (taskDate.toDateString() === yesterday.toDateString()) {
				return 'вчера';
			}
			if (differenceDays < 5) {
				return `${differenceDays} дня назад`;
			}
			if (differenceDays < 8) {
				return `${differenceDays} дней назад`;
			}

			return taskDate.toLocaleDateString('ru-RU', {
				day: 'numeric',
				month: 'long',
				year: 'numeric',
			});
		},

		handleRemove(): void {
			this.$emit('remove', this.task.id);
		},

		handleEdit(): void {
			this.$emit('edit', this.task);
		},

		formatDeadline(value: string): string {
			const date = new Date(value);
			return date.toLocaleDateString('ru-RU', {
				day: 'numeric',
				month: 'long',
			});
		},
	},
});
</script>

<template>
	<li
		:class="[
			$style.item,
			task.priority && $style.itemPriority,
			task.done && $style.itemDone,
		]"
	>
		<input
			:class="$style.checkbox"
			type="checkbox"
			:id="`_${task.id}`"
			v-model="task.done"
		/>

		<label :class="$style.text" :for="`_${task.id}`">
			<span :class="$style.textTitle">
				{{ task.title }}
			</span>

			<p :class="$style.textDescription">
				{{ task.text }}
			</p>

			<footer :class="$style.textFooter">
				<small
					v-if="task.deadline"
					:class="[$style.textInfo, $style.textDeadline]"
				>
					{{ TEXT.deadlineLabel + formatDeadline(task.deadline) }}
				</small>

				<small :class="[$style.textInfo, $style.textDate]">
					{{ TEXT.dateLabel + formatDate(task.date) }}
				</small>
			</footer>
		</label>

		<Icon
			:class="$style.remove"
			@click="handleRemove"
			name="material-symbols:delete-outline"
			size="20"
		/>

		<Icon
			v-if="!task.done"
			:class="$style.edit"
			@click="handleEdit"
			name="material-symbols:ink-pen-outline"
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
	border-width: 2px;
	border-color: var(--red);
}
.itemDone {
	border-color: var(--gray);
}
.checkbox {
	display: none;
}
.checkbox:checked + .text .textTitle {
	text-decoration: line-through;
}
.checkbox:checked + .text .textDescription,
.checkbox:checked + .text .textInfo {
	color: var(--gray);
}
.text {
	flex-grow: 1;
}
.textTitle {
}
.textDescription {
	white-space: pre-wrap;
}
.textFooter {
	display: flex;
	gap: 8px;
}
.textInfo {
}
.textDate {
}
.textDeadline {
}
.remove {
	position: absolute;
	align-self: flex-start;
	top: 8px;
	right: 8px;
	cursor: pointer;
	color: var(--red);
}
.edit {
	position: absolute;
	align-self: flex-start;
	bottom: 8px;
	right: 8px;
	cursor: pointer;
	color: var(--blue);
}
</style>
