<template>
  <header class="header">
    <h2>tasks.get();</h2>
  </header>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style scoped>
.header {
  background: rgb(26, 43, 54);
  color: #fff;
  text-align: left;
  padding: 10px;
  border-bottom: 2px rgba(137, 160, 173, 0.26) solid;
  margin-bottom: 5px;
}

.header h2 {
  font-weight: normal;
  font-size: 1.22em;
}

.header a {
  color: #fff;
  padding-right: 5px;
  text-decoration: none;
}
</style>