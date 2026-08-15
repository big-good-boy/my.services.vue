<script lang="ts" setup>
import type { Task } from '~/interfaces/task.interfaces.js';
import { TEXT } from '~/constants/toDo.js';

const { task } = defineProps<{
	task: Task;
}>();

const emit = defineEmits<{ remove: [id: string]; edit: [task: Task] }>();

const isOverdue = computed((): boolean => {
	if (!task.deadline) return false;
	const deadlineMark = new Date(task.deadline).setHours(0, 0, 0, 0);
	return deadlineMark < Date.now();
});

const handleRemove = (): void => {
	emit('remove', task.id);
};

const handleEdit = (): void => {
	emit('edit', task);
};

const formatDeadline = (value: string): string => {
	const date = new Date(value);
	return date.toLocaleDateString('ru-RU', {
		day: 'numeric',
		month: 'long',
	});
};

const formatDate = (timestamp: number): string => {
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
};
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
					:class="[
						$style.textInfo,
						$style.textDeadline,
						isOverdue && $style.textInfoOverdue,
					]"
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
	border-width: 1px;
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
.textInfoOverdue {
	font-weight: 600;
	color: var(--red);
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
