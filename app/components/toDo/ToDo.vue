<script lang="ts" setup>
import type { Task, TaskFormData } from '~/interfaces/task.interfaces.js';
import { TEXT } from '~/constants/toDo.js';
import ToDoForm from './ToDoForm.vue';
import ToDoList from './ToDoList.vue';

const tasks = ref<Task[]>([]);
const editingTask = ref<Task | null>(null);

watch(tasks, () => saveTasks(), { deep: true });

onMounted(() => {
	loadTasks();
});

function loadTasks(): void {
	const saved = localStorage.getItem('tasks');
	if (saved) {
		try {
			tasks.value = JSON.parse(saved);
		} catch (e) {
			console.error('Ошибка загрузки задач:', e);
			tasks.value = [];
		}
	}
}

function saveTasks(): void {
	localStorage.setItem('tasks', JSON.stringify(tasks.value));
}

function addTask(payload: TaskFormData): void {
	tasks.value.push({
		id: generateId(),
		title: payload.title,
		text: payload.text,
		priority: payload.priority,
		deadline: payload.deadline || null,
		done: false,
		date: Date.now(),
	});
}

function removeTask(id: string): void {
	tasks.value = tasks.value.filter((task) => task.id !== id);
}

function generateId(): string {
	return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function editTask(payload: TaskFormData): void {
	if (editingTask.value) {
		tasks.value = tasks.value.map((task) =>
			task.id === editingTask.value!.id
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
	cancelEditing();
}

function startEditing(task: Task): void {
	editingTask.value = { ...task };
}

function cancelEditing(): void {
	editingTask.value = null;
}

function clearCompleted(): void {
	tasks.value = tasks.value.filter((task) => !task.done);
}
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
