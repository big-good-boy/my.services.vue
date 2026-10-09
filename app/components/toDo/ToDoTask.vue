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
		:class="
			task.done
				? 'border border-gray-500'
				: task.priority
					? 'border-2 border-red'
					: 'border border-blue '
		"
		class="relative flex gap-4 px-2 py-1 rounded-sm"
	>
		<input
			class="hidden peer"
			type="checkbox"
			:id="`_${task.id}`"
			v-model="task.done"
		/>

		<label class="grow" :for="`_${task.id}`">
			<span :class="task.done && 'line-through'">
				{{ task.title }}
			</span>

			<p
				:class="task.done && 'text-gray-500'"
				class="whitespace-pre-wrap mbs-4 mbe-4"
			>
				{{ task.text }}
			</p>

			<footer class="flex gap-2">
				<small
					v-if="task.deadline"
					:class="[
						task.done
							? '!text-gray-500'
							: isOverdue && 'font-semibold text-red',
					]"
				>
					{{ TEXT.deadlineLabel + formatDeadline(task.deadline) }}
				</small>

				<small :class="task.done && 'text-gray-500'">
					{{ TEXT.dateLabel + formatDate(task.date) }}
				</small>
			</footer>
		</label>

		<Icon
			class="absolute self-start top-2 right-2 cursor-pointer text-red"
			@click="handleRemove"
			name="material-symbols:delete-outline"
			size="20"
		/>

		<Icon
			v-if="!task.done"
			class="absolute self-start bottom-2 right-2 cursor-pointer text-blue"
			@click="handleEdit"
			name="material-symbols:ink-pen-outline"
			size="20"
		/>
	</li>
</template>
