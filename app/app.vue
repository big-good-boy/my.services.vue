<script>
const TEXT = {
  title: 'Список дел',
  placeholder: 'Добавьте задачу',
  btn: 'Добавить',
}

export default {
  data() {
    return {
      taskName: '',
      tasks: [],
      TEXT,
    };
  },

  mounted() {
    this.loadTasks();
    this.focus();
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
          id: Date.now(),
          title: this.taskName,
          done: false,
        })
        
        this.taskName = "";
      };

      this.focus();
    },

    removeTask(id) {
      this.tasks = this.tasks.filter(task => task.id !== id);
    },

    focus() {
      this.$nextTick(() => {
        this.$refs?.taskInput.focus();
      });
    },
  },
};
</script>

<template>
  <section :class="[$style.toDo, $style.container]">
    <h2>{{ TEXT.title }}</h2>

    <form @submit.prevent="addTask">
      <input v-model="taskName" type="text" ref="taskInput" :placeholder="TEXT.placeholder">
      <button>{{ TEXT.btn }}</button>
    </form>

    <ul :class="$style.list" v-if="tasks.length">
      <li :class="$style.item" v-for="task in tasks" :key="task.id">
        <input :class="$style.checkbox" type="checkbox" :id="`_${task.id}`" v-model="task.done">
        <label :class="$style.text" :for="`_${task.id}`">
          <span>{{ task.title }}</span>
        </label>
        <div :class="$style.remove" @click="removeTask(task.id)">X</div>
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
.list {
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
.checkbox:checked + .text {
  color:gray;
  text-decoration: line-through;
}
.text {
  flex-grow: 1;
}
.remove {
  align-self: center;
  cursor: pointer;
}
</style>
