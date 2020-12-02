<template>
  <div class="task-manager">
    <Header />
    <TaskList
      v-bind:taskList="taskList"
      v-on:del-task="deleteTask"
      ref="TaskList"
    />
    <AddTask v-on:add-task="addTask" />
  </div>
</template>

<script>
import Header from "../components/layout/Header";
import TaskList from "../components/TaskList";
import AddTask from "../components/AddTask";
//import EditTask from "../components/EditTask";

import { v4 as uuid4 } from "uuid";

export default {
  name: "TaskManager",
  components: {
    Header,
    TaskList,
    AddTask,
  },
  data() {
    return {
      taskList: [
        {
          id: uuid4(),
          title: "A",
          order: 0,
          completed: false,
        },
        {
          id: uuid4(),
          title: "B",
          order: 1,
          completed: false,
        },
        {
          id: uuid4(),
          title: "C",
          order: 2,
          completed: false,
        },
        {
          id: uuid4(),
          title: "D",
          order: 3,
          completed: false,
        },
      ],
    };
  },

  methods: {
    deleteTask(id) {
      this.taskList = this.taskList.filter((task) => task.id != id);
      this.$refs.TaskList.update();
    },
    addTask(newTask) {
      this.taskList.unshift(newTask);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.task-manager {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
</style>
