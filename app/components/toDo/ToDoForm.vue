<script lang="ts">
import { TEXT } from '~/constants/toDo.js';
import type { Task } from '~/interfaces/task.interfaces.js';

export default defineComponent({
	name: 'ToDoForm',

	props: {
		taskToEdit: {
			type: Object as () => Task | null,
			default: null,
		},
	},

	emits: ['add', 'edit', 'cancel-edit'],

	data() {
		return {
			localTaskName: '' as string,
			localTaskText: '' as string,
			localPriority: false as boolean,
			localDeadline: '' as string,
			TEXT,
		};
	},

	computed: {
		isEditing(): boolean {
			return this.taskToEdit !== null;
		},
	},

	watch: {
		taskToEdit: {
			handler(newTask: Task | null) {
				if (newTask) {
					this.localTaskName = newTask.title;
					this.localTaskText = newTask.text;
					this.localPriority = newTask.priority;
					this.localDeadline = newTask.deadline || '';
				}
			},
			immediate: true,
		},
	},

	methods: {
		handleSubmit(): void {
			if (this.localTaskName.trim().length) {
				const payload = {
					title: this.localTaskName,
					text: this.localTaskText,
					priority: this.localPriority,
					deadline: this.localDeadline || null,
				};

				if (this.isEditing) {
					this.$emit('edit', payload);
				} else {
					this.$emit('add', payload);
				}

				this.resetForm();
			}

			this.focusInput();
		},

		resetForm(): void {
			this.localTaskName = '';
			this.localTaskText = '';
			this.localPriority = false;
			this.localDeadline = '';
		},

		cancelEdit(): void {
			this.$emit('cancel-edit');
			this.resetForm();
			this.focusInput();
		},

		focusInput(): void {
			this.$nextTick(() => {
				(this.$refs.taskInput as HTMLInputElement)?.focus();
			});
		},

		handleInputEnter(): void {
			this.localTaskName.trim() ? this.focusTextarea() : null;
		},

		focusTextarea(): void {
			(this.$refs?.taskTextarea as HTMLTextAreaElement)?.focus();
		},

		handleTextareaEnter(event: KeyboardEvent): void {
			!event.shiftKey && this.handleSubmit();
		},
	},

	mounted() {
		this.focusInput();
	},
});
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
	transition: var(--transition);
}
.btn:hover {
	color: var(--green);
	background-color: white;
}
</style>
