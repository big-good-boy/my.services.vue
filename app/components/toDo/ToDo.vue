<script lang="ts">
import type { Task } from "~/interfaces/task.interfaces.js"
import { TEXT } from '~/constants/toDo.js'
import ToDoForm from './ToDoForm.vue';
import ToDoList from './ToDoList.vue';

export default defineComponent ({
  name: 'ToDo',

	components: {
		ToDoForm,
    ToDoList,
	},

  data() {
    return {
      tasks: [] as Task[],
      TEXT,
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
      if(saved) {
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

    addTask(payload: { title: string; text: string; priority: boolean }): void {
			this.tasks.push({
				id: this.generateId(),
				title: payload.title,
				text: payload.text,
        priority: payload.priority,
				done: false,
				date: Date.now(),
			});
    },

    removeTask(id: string): void {
      this.tasks = this.tasks.filter(task => task.id !== id);
    },

    generateId(): string {
      return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    },
  },
});
</script>

<template>
  <section
    :class="[
      $style.ToDo,
      'container'
    ]"
  >
    <h2 :class="$style.title">
      {{ TEXT.title }}
    </h2>

    <ToDoForm @add="addTask" />

    <ToDoList
      :tasks="tasks"
      @remove="removeTask"
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
