<script lang="ts">
import { TEXT } from '~/constants/toDo.js'
import ToDoForm from './ToDoForm.vue';

interface Task {
  id: string;
  title: string;
  text: string;
  done: boolean;
  date: number;
};

export default defineComponent ({
  name: 'ToDo',

	components: {
		ToDoForm,
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

    addTask(payload: { title: string; text: string }): void {
			this.tasks.push({
				id: this.generateId(),
				title: payload.title,
				text: payload.text,
				done: false,
				date: Date.now(),
			});
    },

    removeTask(id: string): void {
      this.tasks = this.tasks.filter(task => task.id !== id);
    },

    formatDate(timestamp: number): string {
      const taskDate = new Date(timestamp);

      // Красивый вывод даты создания
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      const taskDay = new Date(taskDate.getFullYear(), taskDate.getMonth(), taskDate.getDate());
      const differenceDays = Math.floor((today.getTime() - taskDay.getTime()) / (1000 * 60 * 60 * 24));
      if (taskDate.toDateString() === today.toDateString()) {
        return "сегодня";
      };
      if((taskDate.toDateString() === yesterday.toDateString())) {
        return "вчера";
      };      
      if (differenceDays < 5) {
        return `${differenceDays} дня назад`;
      };
      if (differenceDays < 8) {
        return `${differenceDays} дней назад`;
      };
      
      return taskDate.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
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
    <h2>
      {{ TEXT.title }}
    </h2>

    <ToDoForm @add="addTask" />

    <ul
      :class="$style.list"
      v-if="tasks.length"
    >
      <li
        :class="$style.item"
        v-for="task in tasks"
        :key="task.id"
      >
        <input
          :class="$style.checkbox"
          type="checkbox"
          :id="`_${task.id}`"
          v-model="task.done"
        >

        <label
          :class="$style.text"
          :for="`_${task.id}`"
        >
          <span :class="$style.textTitle">
            {{ task.title }}
          </span>

          <p :class="$style.textDescription">
            {{ task.text }}
          </p>

          <small :class="$style.textDate">
            {{ TEXT.dateLabel + formatDate(task?.date) }}
          </small>
        </label>

        <div
          :class="$style.remove"
          @click="removeTask(task.id)"
        >
          X
        </div>
      </li>
    </ul>
  </section>
</template>

<style lang="css" module>
.ToDo {}
.list {
	display: flex;
	flex-direction: column;
	gap: 8px;
  border-top: 1px solid #3498db;
  padding-top: 16px;
  padding-left: 0;
}
.item {
  display: flex;
  gap: 16px;
  padding: 4px 8px;
  border: 1px solid #3498db;
  border-radius: 4px;
}
.checkbox {
  display: none;
}
.checkbox:checked + .text .textTitle {
  text-decoration: line-through;
}
.checkbox:checked + .text .textDescription,
.checkbox:checked + .text .textDate {
  color:gray;
}
.text {
  flex-grow: 1;
}
.textTitle {}
.textDescription {
  white-space: pre-wrap;
}
.textDate {}
.remove {
  align-self: center;
  cursor: pointer;
	color: #e74c3c;
}
</style>
