<template>
  <div class="task-item" v-bind:class="{ 'is-complete': task.completed }">
    <div v-if="editShown" class="task-edit">
      <button @click="$emit('del-task', task.id)" class="task-edit-1">
        Delete
      </button>
      <button class="task-edit-2">Edit</button>
      <button class="task-edit-3">Complete</button>
      <div class="task-edit-4" @click="toggleEdit">
        <font-awesome-icon class="settings" icon="edit" />
      </div>
    </div>
    <div v-else class="task-content">
      <div class="task-item-1" v-on="eventHandler">
        <font-awesome-icon class="bars" icon="bars" />
      </div>
      <div class="task-item-2">
        <h4>{{ task.title }}</h4>
      </div>
      <div class="task-item-3" @click="toggleEdit">
        <font-awesome-icon class="settings" icon="edit" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Task",
  props: ["task"],
  data() {
    return {
      eventHandler: {
        touchmove: this.touched,
        touchstart: this.touched,
        mousedown: this.touched,
        mouseup: this.touched,
        mousemove: this.touched,
      },
      editShown: false,
      height: 0,
    };
  },
  methods: {
    // Eh, delete needs some work.
    onDelete() {
      this.$emit("del-task", this.task.id);
    },
    touched(event) {
      if (event.type == "mousedown" || event.type == "touchstart") {
        this.task.dragging = true;
        this.$emit("drag", event, this);
      } else if (event.type == "mouseup") {
        this.task.dragging = false;
        this.$emit("drag", event, this);
      }
    },
    toggleEdit() {
      this.editShown = !this.editShown;
    },
  },

  // This is called after the DOM has been generated!
  mounted: function () {
    this.task.$el = this.$el;
    this.task.mounted = true;
    this.$parent.update();
  },
};
</script>

<style scoped>
.draggable {
  transition-property: all;
  transition-duration: 0.25s;
}
.task-item {
  background: #979797;
  padding: 0;
  margin-left: 1%;
  margin-right: 1%;
  border-radius: 15px;
  box-shadow: 0px 2.8px 2.2px rgba(0, 0, 0, 0.3);
  position: absolute;
  width: 98%;
}

.task-edit {
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  width: 96%;
  margin-left: 4%;
}

.task-edit button {
  height: 46px;
  margin: 5px 1%;
  border-radius: 5px;
  border: none;
  box-shadow: 0px 3px 0px rgba(0, 0, 0, 0.4);
  font-size: 1.2em;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.7);
}

.task-edit-1 {
  background: #64b5f6;
  flex: 1;
}
.task-edit-2 {
  background: #fab958;
  flex: 1;
}
.task-edit-3 {
  background: #6ecc6e;
  flex: 2;
}
.task-edit-4 {
  flex-basis: 5%;
  min-width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.task-content {
  display: flex;
  align-items: stretch;
  justify-content: space-between;
}

.task-item-1 {
  flex-basis: 5%;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 50px;
}

.bars {
  color: rgb(109, 109, 109);
  margin: 20px 15px;
  cursor: pointer;

  transition-property: all;
  transition-duration: 0.25s;
}

.task-item-2 {
  flex-basis: 90%;
  color: rgb(39, 39, 39);
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.task-item-2 h4 {
  padding: 10px;
  font-weight: normal;
  font-size: 1.1em;
}

.task-item-3 {
  flex-basis: 5%;
  min-width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.settings {
  color: rgb(109, 109, 109);
  cursor: pointer;

  transition-property: all;
  transition-duration: 0.25s;
}

.is-complete {
  text-decoration: line-through;
  color: rgb(88, 88, 88);
}

input[type="checkbox"] {
  margin-right: 40px;
}
</style>