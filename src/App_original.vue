<template>
  <div id="app">
    <TopNav />
    <br/>
    <div class="columns">
      <div class="container is-fluid is-11 column">
        <div class="tile is-vertical is-ancestor">
          <div class="tile is-vertical">
            <router-view>

            </router-view>
            <!--
            <summary-bar />
            <upload-form/>
            -->
            <!--<group-breakdown/>-->
          </div>
        </div>
      </div>
    </div>
    <!--img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" /-->
  </div>
</template>

<script>
//import HelloWorld from "./components/HelloWorld.vue";
import TopNav from "./components/TopNav.vue";
//import SummaryBar from "./components/GroupSummary.vue";
//import UploadForm from "./components/UploadForm.vue"
//import GroupBreakdown from "./components/GroupBreakdown.vue"

export default {
  name: "app",
  components: {
    //HelloWorld,
    TopNav
    //SummaryBar,
    //UploadForm
   // GroupBreakdown
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: white;
}
#mynetwork {
  width: 600px;
  height: 400px;
  border: 1px solid lightgray;
}

.title {
  color: white;
}

.sectiongap {
  margin-bottom: 10px;
}

</style>
