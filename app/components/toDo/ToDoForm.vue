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
		:class="$style.form"
		@submit.prevent="handleSubmit"
		@keydown.esc="cancelEdit"
	>
		<input
			:class="$style.input"
			v-model="localTaskName"
			type="text"
			ref="taskInput"
			:placeholder="TEXT.placeholderInput"
			@keydown.enter.prevent="handleInputEnter"
		/>

		<textarea
			:class="$style.textarea"
			ref="taskTextarea"
			v-model="localTaskText"
			:placeholder="TEXT.placeholderTextarea"
			@keydown.enter="handleTextareaEnter"
		/>

		<div :class="$style.options">
			<label :class="$style.priority">
				<input
					:class="$style.priorityCheckbox"
					type="checkbox"
					v-model="localPriority"
				/>

				<div
					:class="[
						$style.priorityIcon,
						localPriority && $style.priorityIconChecked,
					]"
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

				<span :class="$style.priorityLabel">
					{{ TEXT.priorityLabel }}
				</span>
			</label>

			<label :class="$style.deadline">
				<span :class="$style.deadlineLabel">Срок:</span>
				<input
					:class="$style.deadlineDatetime"
					type="date"
					v-model="localDeadline"
					name=""
					id=""
				/>
			</label>
		</div>

		<input
			type="submit"
			:class="$style.btn"
			:value="isEditing ? TEXT.alterBtn : TEXT.btn"
		/>
	</form>
</template>

<style lang="css" module>
.form {
	display: flex;
	flex-direction: column;
	gap: 16px;
}
.input {
	padding: 4px;
	border: 1px solid var(--blue);
	font-family: sans-serif;
	font-size: 16px;
	border-radius: 4px;
	outline-color: var(--blue);
}
.textarea {
	resize: none;
	height: 100px;
	padding: 4px;
	border: 1px solid var(--blue);
	font-family: sans-serif;
	font-size: 16px;
	border-radius: 4px;
	outline-color: var(--blue);
}
.options {
	display: flex;
	justify-content: space-between;
	gap: 8px;
}
.priority {
	display: flex;
	align-items: flex-end;
	gap: 4px;
	cursor: pointer;
}
.priorityIcon {
	line-height: 0;
	color: var(--blue);
	width: 20px;
	height: 20px;
}
.priorityIconChecked {
	color: var(--red);
}
.priorityCheckbox {
	display: none;
}
.priorityLabel {
	position: relative;
	top: 1px;
	color: var(--gray);
}
.deadline {
	display: flex;
	align-items: flex-end;
	gap: 4px;
}
.deadlineLabel {
	color: var(--gray);
}
.deadlineDatetime {
	border: 1px solid var(--blue);
	border-radius: 4px;
	outline-color: var(--blue);
	color: var(--gray);
}
.btn {
	padding: 8px;
	border: 1px solid var(--green);
	font-family: sans-serif;
	font-size: 16px;
	border-radius: 4px;
	background-color: var(--green);
	color: white;
	cursor: pointer;
	outline-color: var(--blue);
	transition: var(--transition);
}
.btn:hover {
	color: var(--green);
	background-color: white;
}
</style>
