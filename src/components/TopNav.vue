<template>
  <nav class="navbar is-transparent" role="navigation" aria-label="main navigation" style="margin-bottom: 5px">
    <div class="navbar-brand">
      <a class="navbar-item" href="/">
        <!--img src="https://bulma.io/images/bulma-logo.png" width="112" height="28"-->
        <p class="title has-text-centered has-text-white">Chat Insights</p>
      </a>

      <a
        role="button"
        class="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
        v-on:click="resptoggle"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">Dashboards</a>

          <div class="navbar-dropdown">
            <router-link to="/summary" class="navbar-item">New Dashboard</router-link>
            <a class="navbar-item">Dashboard 2</a>
            <a class="navbar-item">Dashboard 3</a>
            <hr class="navbar-divider" />
            <a class="navbar-item">Report an issue</a>
            <hr class="navbar-divider" />
            <!--<a class="navbar-item">New Upload</a>-->
            <router-link to="/upload" class="navbar-item">New Upload</router-link>
          </div>
        </div>

        <!--<a class="navbar-item">Upload Chat</a>-->
        <router-link to="/upload" class="navbar-item">Upload Chat</router-link>

        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">More</a>

          <div class="navbar-dropdown">
            <a class="navbar-item">About</a>
            <a class="navbar-item">Jobs</a>
            <a class="navbar-item">Contact</a>
            <hr class="navbar-divider" />
            <a class="navbar-item">Report an issue</a>
          </div>
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a class="button is-primary">
              <strong>Sign up</strong>
            </a>
            <a class="button is-light">Log in</a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>


<script>
export default {
  name: "TopNav",
  // define methods under the `methods` object
  methods: {
    resptoggle: function(event) {
      // `this` inside methods points to the Vue instance
      // `event` is the native DOM event
      if (event) {
        // eslint-disable-next-line no-console
        document
          .getElementsByClassName("navbar-burger")[0]
          .classList.toggle("is-active");
        document
          .getElementsByClassName("navbar-menu")[0]
          .classList.toggle("is-active");
        //alert(event.target.tagName)
      }
    }
  }
};
</script>
<style scoped>
.navbar {
  background-color: #303053;
  color: white;
}
.navbar-link, .navbar-item{
  color: white
}
.navbar-dropdown{
  background: #303053;
}
</style>