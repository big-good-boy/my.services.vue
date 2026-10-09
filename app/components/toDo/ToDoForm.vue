<script lang="ts" setup>
import { TEXT } from '~/constants/toDo.js';
import type { Task, TaskFormData } from '~/interfaces/task.interfaces.js';

const { taskToEdit } = defineProps<{
	taskToEdit: Task | null;
}>();

const emit = defineEmits<{
	add: [payload: TaskFormData];
	edit: [payload: TaskFormData];
	'cancel-edit': [];
}>();

const localTaskName = ref<string>('');
const localTaskText = ref<string>('');
const localPriority = ref<boolean>(false);
const localDeadline = ref<string>('');
const taskInput = ref<HTMLInputElement | null>(null);
const taskTextarea = ref<HTMLTextAreaElement | null>(null);

const isEditing = computed((): boolean => {
	return taskToEdit !== null;
});

watch(
	() => taskToEdit,
	(newTask: Task | null) => {
		if (newTask) {
			localTaskName.value = newTask.title;
			localTaskText.value = newTask.text;
			localPriority.value = newTask.priority;
			localDeadline.value = newTask.deadline || '';
		}
	},
	{ immediate: true }
);

onMounted(() => {
	focusInput();
});

function handleSubmit(): void {
	if (localTaskName.value.trim().length) {
		const payload: TaskFormData = {
			title: localTaskName.value,
			text: localTaskText.value,
			priority: localPriority.value,
			deadline: localDeadline.value || null,
		};

		if (isEditing.value) {
			emit('edit', payload);
		} else {
			emit('add', payload);
		}

		resetForm();
	}

	focusInput();
}

function resetForm(): void {
	localTaskName.value = '';
	localTaskText.value = '';
	localPriority.value = false;
	localDeadline.value = '';
}

function cancelEdit(): void {
	emit('cancel-edit');
	resetForm();
	focusInput();
}

function focusInput(): void {
	nextTick(() => {
		taskInput.value?.focus();
	});
}

function handleInputEnter(): void {
	localTaskName.value.trim() ? focusTextarea() : null;
}

function focusTextarea(): void {
	taskTextarea.value?.focus();
}

function handleTextareaEnter(event: KeyboardEvent): void {
	!event.shiftKey && handleSubmit();
}
</script>

<template>
	<form
		class="flex flex-col gap-4"
		@submit.prevent="handleSubmit"
		@keydown.esc="cancelEdit"
	>
		<input
			class="p-1 border border-blue rounded-sm outline-blue"
			v-model="localTaskName"
			type="text"
			ref="taskInput"
			:placeholder="TEXT.placeholderInput"
			@keydown.enter.prevent="handleInputEnter"
		/>

		<textarea
			class="resize-none h-25 p-1 border border-blue rounded-sm outline-blue"
			ref="taskTextarea"
			v-model="localTaskText"
			:placeholder="TEXT.placeholderTextarea"
			@keydown.enter="handleTextareaEnter"
		/>

		<div class="flex justify-between gap-2">
			<label class="flex items-end gap-1 cursor-pointer">
				<input class="hidden" type="checkbox" v-model="localPriority" />

				<div
					:class="localPriority ? 'text-red' : 'text-blue'"
					class="leading-none w-5 h-5"
				>
					<Icon
						:name="
							localPriority
								? 'cuida:checkbox-checked-outlined'
								: 'cuida:checkbox-unchecked-outlined'
						"
						size="20"
					/>
				</div>

				<span class="relative top-[2px] text-gray-500">
					{{ TEXT.priorityLabel }}
				</span>
			</label>

			<label class="flex items-end gap-1">
				<span class="text-gray-500">Срок:</span>
				<input
					class="border border-blue rounded-sm text-gray-500 font-mono"
					type="date"
					v-model="localDeadline"
					name=""
					id=""
				/>
			</label>
		</div>

		<input
			type="submit"
			class="p-2 border border-green font-sans rounded-sm bg-green text-white cursor-pointer outline-blue transition duration-300 hover:text-green hover:bg-white"
			:value="isEditing ? TEXT.alterBtn : TEXT.btn"
		/>
	</form>
</template>
