<template>
  <nav
    class="navbar is-transparent"
    role="navigation"
    aria-label="main navigation"
    style="margin-bottom: 5px"
  >
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
        <span aria-hidden="true" style="color: white;"></span>
        <span aria-hidden="true" style="color: white;"></span>
        <span aria-hidden="true" style="color: white;"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">Uploads</a>

          <div class="navbar-dropdown">
            <a
              v-for="upload in uploads"
              :key="upload.upload_id"
              :to="upload.router_link "
              class="navbar-item"
              v-on:click="navigateAndCloseMenu($event,upload.router_link)"
            >{{ upload.upload_title }}</a>
            <hr class="navbar-divider" />
            <router-link to="/upload" class="navbar-item">New Upload</router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>


<script>
import axios from "axios";
export default {
  name: "TopNav",
  data: function() {
    return { uploads: [] };
  },
  // define methods under the `methods` object
  methods: {
    navigateAndCloseMenu(e, router_link) {
      if (e.target.parentElement.classList.contains("navbar-dropdown")) {
        e.target.parentElement.style.display = "none";
      }
      this.resptoggle(e);
      this.$router.push({ path: router_link });
      setTimeout(() => {
        e.target.parentElement.style.display = "";
        e.target.blur();
      }, 100);
    },
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
      }
    },
    getUploads: function() {
      var localToken = this.$store.state.authToken;
      var vm = this;
      axios({
        method: "get",
        url:
          vm.$store.state.backend_server + "/data-service/v0.1/chats/uploads",
        headers: {
          Authorization: localToken
        }
      })
        .then(function(response) {
          vm.uploads = response.data;
        })
        .catch(function(response) {
          console.log(response.status);
        });
    }
  },
  mounted: function() {
    this.getUploads();
  }
};
</script>
<style scoped>
.navbar-menu{
  background-color: #303053;
}
.navbar {
  background-color: #303053;
  color: white;
}
.navbar-link,
.navbar-item {
  color: white;
}
.navbar-dropdown {
  background: #303053;
}
</style>