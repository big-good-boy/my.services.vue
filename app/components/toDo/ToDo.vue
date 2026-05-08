<script lang="ts">
import type { Task, TaskFormData } from '~/interfaces/task.interfaces.js';
import { TEXT } from '~/constants/toDo.js';
import ToDoForm from './ToDoForm.vue';
import ToDoList from './ToDoList.vue';

export default defineComponent({
	name: 'ToDo',

	components: {
		ToDoForm,
		ToDoList,
	},

	data() {
		return {
			tasks: [] as Task[],
			TEXT,
			editingTask: null as Task | null,
		};
	},

	mounted() {
		this.loadTasks();
	},

	watch: {
		tasks: {
			handler(this: any) {
				this.saveTasks();
			},
			deep: true,
		},
	},

	methods: {
		loadTasks(): void {
			const saved = localStorage.getItem('tasks');
			if (saved) {
				try {
					this.tasks = JSON.parse(saved);
				} catch (e) {
					console.error('Ошибка загрузки задач:', e);
					this.tasks = [];
				}
			}
		},

		saveTasks(): void {
			localStorage.setItem('tasks', JSON.stringify(this.tasks));
		},

		addTask(payload: TaskFormData): void {
			this.tasks.push({
				id: this.generateId(),
				title: payload.title,
				text: payload.text,
				priority: payload.priority,
				deadline: payload.deadline || null,
				done: false,
				date: Date.now(),
			});
		},

		removeTask(id: string): void {
			this.tasks = this.tasks.filter((task) => task.id !== id);
		},

		generateId(): string {
			return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
		},

		editTask(payload: TaskFormData): void {
			if (this.editingTask) {
				this.tasks = this.tasks.map((task) =>
					task.id === this.editingTask!.id
						? {
								...task,
								title: payload.title,
								text: payload.text,
								priority: payload.priority,
								deadline: payload.deadline || null,
						  }
						: task
				);
			}
			this.cancelEditing();
		},

		startEditing(task: Task): void {
			this.editingTask = { ...task };
		},

		cancelEditing(): void {
			this.editingTask = null;
		},

		clearCompleted(): void {
			this.tasks = this.tasks.filter((task) => !task.done);
		},
	},
});
</script>

<template>
	<section :class="[$style.ToDo, 'container']">
		<h2 :class="$style.title">
			{{ TEXT.title }}
		</h2>

		<ToDoForm
			@add="addTask"
			@edit="editTask"
			:task-to-edit="editingTask"
			@cancel-edit="cancelEditing"
		/>

		<ToDoList
			:tasks="tasks"
			@remove="removeTask"
			@edit="startEditing"
			@clear-completed="clearCompleted"
		/>
	</section>
</template>

<style lang="css" module>
.ToDo {
	font-family: sans-serif;
}
.title {
	margin-top: 0;
}
</style>
