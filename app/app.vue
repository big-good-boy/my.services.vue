<script>
const TEXT = {
  title: 'Список дел',
  placeholderInput: 'Добавьте задачу',
  placeholderTextarea: "Подробное описание",
  btn: 'Добавить',
}

export default {
  data() {
    return {
      taskName: '',
      taskText: '',
      tasks: [],
      TEXT,
    };
  },

  mounted() {
    this.loadTasks();
    this.focusInput();
  },

  watch: {
    tasks: {
      handler: "saveTasks",
      deep: true,
    },
  },
  
  methods: {
    loadTasks() {
      const saved = localStorage.getItem('tasks');
      if(saved) this.tasks = JSON.parse(saved);
    },

    saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    },

    addTask() {      
      if(this.taskName.trim().length) {
        this.tasks.push({
          id: this.generateId(),
          title: this.taskName,
          text: this.taskText,
          done: false,
          date: Date.now(),
        });
        
        this.taskName = "";
        this.taskText = "";
      };

      this.focusInput();
    },

    removeTask(id) {
      this.tasks = this.tasks.filter(task => task.id !== id);
    },

    focusInput() {
      this.$nextTick(() => {
        this.$refs?.taskInput.focus();
      });
    },

    focusTextarea() {
      this.$refs?.taskTextarea.focus();
    },

    formatDate(timestamp) {
      const taskDate = new Date(timestamp);

      // Красивый вывод даты создания
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      const taskDay = new Date(taskDate.getFullYear(), taskDate.getMonth(), taskDate.getDate());
      const differenceDays = Math.floor((today - taskDay) / (1000 * 60 * 60 *24));
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

    generateId() {
      return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    },
  },
};
</script>

<template>
  <section
    :class="[
      $style.toDo,
      $style.container
    ]"
  >
    <h2>
      {{ TEXT.title }}
    </h2>

    <form
      :class="$style.form"
      @submit.prevent="addTask"
    >
      <input
        :class="$style.input"
        v-model="taskName"
        type="text"
        ref="taskInput"
        :placeholder="TEXT.placeholderInput"
        @keydown.enter.prevent="taskName.trim() ? focusTextarea() : null"
        />
        
        <textarea
          :class="$style.textarea"
          ref="taskTextarea"
          v-model="taskText"
          :placeholder="TEXT.placeholderTextarea"
          @keydown.enter="!$event.shiftKey && addTask()"
        />

      <input
        type="submit"
        :class="$style.btn"
        :value="TEXT.btn"
      />
    </form>

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
            Создана {{ formatDate(task?.date) }}
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
.toDo {}
.container {
  width: 100%;
  max-width: 1200px;
  max-width: 600px;
  margin: auto;
}
.form {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.input {}
.textarea {
  resize: none;
  height: 100px;
}
.btn {}
.list {
  border-top: 1px solid;
  padding-top: 16px;
  padding-left: 0;
}
.item {
  display: flex;
  gap: 16px;
  padding: 4px 8px;
  border: 1px solid gray;
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
.textTitle {
  display: flex;
}
.textDescription {
  display: flex;
}
.textDate {
  display: flex;
}
.remove {
  align-self: center;
  cursor: pointer;
}
</style>
