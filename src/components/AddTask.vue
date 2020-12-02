<template>
  <div class="add-task">
    <form v-if="inputShown" @submit.prevent>
      <h1>New Task</h1>
      <label>What's the task?</label>
      <input
        type="text"
        v-model="title"
        name="title"
        autocomplete="off"
        v-on:keydown.enter.prevent="addTask"
        v-focus
      />
      <label>When is it due?</label>
      <input :value="this.date" type="date" name="due" autocomplete="off" />
      <label>How important is it?</label>
      <div class="importance unselectable">
        <span>Low</span>
        <span>Medium</span>
        <span>High</span>
      </div>
      <div class="buttons">
        <button v-on:click.prevent="toggleInput">Cancel</button>
        <button v-on:click.prevent="addTask">Add Task</button>
      </div>
    </form>

    <button v-else v-on:click="toggleInput" class="add-button">+</button>
  </div>
</template>

<script>
import { v4 as uuid4 } from "uuid";

let date = new Date();

export default {
  name: "AddTask",
  data() {
    return {
      title: "",
      date:
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
      inputShown: false,
    };
  },
  methods: {
    addTask() {
      const newTask = {
        id: uuid4(),
        title: this.title,
        order: 0,
        completed: false,
      };

      if (this.title) {
        this.$emit("add-task", newTask);
        this.toggleInput();
      }
    },

    toggleInput() {
      this.title = "";
      this.inputShown = !this.inputShown;
    },
  },
};
</script>

<style scoped>
.add-button {
  background: #c0c0c0;
  color: #9b9898;
  border-radius: 50%;
  width: 1em;
  height: 1em;
  position: fixed;
  border: none;
  bottom: 0.4em;
  right: 0.4em;
  font-weight: normal;
  font-size: 3em;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.add-task form {
  background: #424242;
  color: #fff;
  width: 80%;
  max-width: 500px;
  position: fixed;
  top: 10%;
  left: 10%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0px 2.8px 2.2px rgba(0, 0, 0, 0.3);
}

.add-task form h1 {
  font-weight: normal;
  align-self: center;
}

.add-task form label {
  padding: 10px 0;
  font-size: 1.2em;
  color: rgba(255, 255, 255, 0.7);
}

.add-task form input {
  background: #303030;
  color: rgba(255, 255, 255, 0.7);
  border-radius: 5px;
  border: none;
  padding: 10px;
  width: 100%;
  font-size: 1em;
}

.add-task form input:hover {
  background: #272727;
}

.add-task form .buttons {
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.add-task form button {
  background: rgba(255, 255, 255, 0.16);
  border: 2px rgba(0, 0, 0, 0.342) solid;
  color: #fff;
  padding: 10px;
  font-size: 1em;
  border-radius: 5px;
}

.importance {
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-radius: 5px;
  overflow: hidden;
  width: 100%;
  margin-bottom: 10px;
}

.importance span {
  background: #fab958;
  color: #00000065;
  border: 0.1em solid;
  padding: 10px;
  width: 33.3%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-weight: 700;
}

.importance span:hover {
  opacity: 0.5;
}

.importance :first-child {
  border-radius: 5px 0 0 5px;
  background: #64b5f6;
}

.importance :last-child {
  border-radius: 0 5px 5px 0;
  background: #e9574d;
}
</style>