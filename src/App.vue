<template>
  <section id="app" class="section" >
    <div class="is-fluid">
      <router-view></router-view>
    </div>
  </section>
</template>

<script>
export default {
  name: "app",
  components: {
    
  }
};
</script>

<style>
#app {
  padding-top: 0px;
  min-height: 95vh;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background: rgb(14, 14, 49);
  color: white;
}
#mynetwork {
  width: 600px;
  height: 400px;
  border: 1px solid lightgray;
}
</style>
