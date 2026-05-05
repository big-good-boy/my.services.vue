<script lang="ts">
import { TEXT } from '~/constants/toDo.js';

export default defineComponent ({
	name: 'ToDoForm',

	emits: ['add'],

	data() {
		return {
			localTaskName: '' as string,
			localTaskText: '' as string,
			TEXT,
		};
	},

	methods: {
		handleSubmit(): void {      
			if(this.localTaskName.trim().length) {
				this.$emit('add', {
					title: this.localTaskName,
					text: this.localTaskText,
				});
				
				this.localTaskName = "";
				this.localTaskText = "";
			};

			this.focusInput();
		},

		focusInput(): void {
			this.$nextTick(() => {
				(this.$refs.taskInput as HTMLInputElement)?.focus();
			});
		},

		handleInputEnter(): void {
			this.localTaskName.trim() ? this.focusTextarea() : null
		},

		focusTextarea(): void {
			(this.$refs?.taskTextarea as HTMLTextAreaElement)?.focus();
		},

		handleTextareaEnter(event: KeyboardEvent): void {
			!event.shiftKey && this.handleSubmit()
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

		<input
			type="submit"
			:class="$style.btn"
			:value="TEXT.btn"
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
.btn {
	padding: 8px;
	border: 1px solid var(--green);
	font-family: sans-serif;
	font-size: 16px;
	border-radius: 4px;
	background-color: var(--green);
	color: white;
}
</style>