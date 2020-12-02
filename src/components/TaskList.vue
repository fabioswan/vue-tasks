<template>
  <div class="task-list">
    <Task
      v-for="task in taskList"
      v-bind:key="task.id"
      v-bind:task="task"
      v-on:update="update"
      v-on:drag="dragHandler($event, task)"
      v-on:del-task="deleteTask"
      class="draggable unselectable"
    />
  </div>
</template>

<script>
import Task from "./Task.vue";

export default {
  name: "TaskList",
  components: {
    Task,
  },
  props: ["taskList"],
  methods: {
    update() {
      for (let i = 0; i < this.taskList.length; i++) {
        const task = this.taskList[i];
        if (task.mounted && task != this.draggedTask) {
          const taskHeight = task.$el.getBoundingClientRect().height;
          task.$el.style.top = (taskHeight + 5) * i + "px";
        }
      }
    },
    deleteTask(id) {
      for (let i = 0; i < this.taskList.length; i++) {
        if (id == this.taskList[i].id) {
          this.taskList.splice(i, 1);
        }
      }
      this.update();
    },

    // Ok I'm probably going to need to initiate the drag event from the task item afterall.
    // Some sort of emit on the task-item-1 class
    // task-item-1 on mouse/touchDown -> $emit(dragStart())

    dragHandler(event, task) {
      if (task.dragging) {
        task.$el.classList.remove("draggable");
        this.draggedTask = task;
      } else {
        task.$el.classList.add("draggable");
        task.$el.style.left = 0 + "px";
        this.draggedTask = null;
      }
      this.update();
    },
    moveTask(event, task) {
      const taskListTop = this.$el.getBoundingClientRect().top;
      const taskHeight = task.$el.getBoundingClientRect().height + 5;
      let mouseY = 0;
      if (event.type == "mousemove") {
        mouseY = event.clientY;
      } else {
        mouseY = event.changedTouches[0].clientY;
      }
      let newLoc = mouseY - taskListTop - taskHeight / 2;
      let newOrder = Math.floor((mouseY - taskListTop) / taskHeight);
      if (newLoc <= 0) {
        newLoc = 0;
        newOrder = 0;
      } else if (newOrder >= this.taskList.length) {
        newOrder = this.taskList.length - 1;
      }
      task.$el.style.top = newLoc + "px";
      this.shiftTasks(task, newOrder);
    },

    shiftTasks(task, newIndex) {
      let prevIndex = -1;
      for (let i = 0; i < this.taskList.length; i++) {
        if (this.taskList[i] == task) {
          prevIndex = i;
        }
      }
      if (prevIndex >= 0) {
        // TODO //
        // Alright, after fixing this I realized that I may be able to drop the
        // order property and instead just use the array index.

        // Don't let me forget to look into it, comment.
        this.taskList[prevIndex] = this.taskList[newIndex];
        this.taskList[newIndex] = task;
      }
      this.update();
    },
  },
  mounted: function () {
    this.$el.addEventListener("touchmove", (event) => {
      event.preventDefault();
      if (this.draggedTask) {
        this.moveTask(event, this.draggedTask);
      }
    });
    this.$el.addEventListener("mousemove", (event) => {
      event.preventDefault();
      if (this.draggedTask) {
        this.moveTask(event, this.draggedTask);
      }
    });
    document.addEventListener("mouseup", (event) => {
      if (this.draggedTask) {
        this.draggedTask.dragging = false;
        this.dragHandler(event, this.draggedTask);
      }
    });
    document.addEventListener("touchend", (event) => {
      if (this.draggedTask) {
        this.draggedTask.dragging = false;
        this.dragHandler(event, this.draggedTask);
      }
    });
  },
};
</script>

<style scoped>
.task-list {
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;
}
</style>