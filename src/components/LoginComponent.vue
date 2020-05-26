<template>
  <div>
    <NotificationBanner />
    <a href="/">
      <!--img src="https://bulma.io/images/bulma-logo.png" width="112" height="28"-->
      <p class="title has-text-left has-text-white">Chat Insights</p>
    </a>
    <div class="tile is-ancestor" style="height:60vh">
      <div class="tile is-4 is-vertical" style="margin:auto">
        <div class="field">
          <label class="label has-text-white">Email</label>
          <p class="control has-icons-left">
            <input class="input" type="email" placeholder="Email" v-model="email_address" />
            <span class="icon is-small is-left">
              <i class="fas fa-envelope"></i>
            </span>
          </p>
          <p class="help">Enter your email to receive a link to your dashboards</p>
        </div>

        <div class="field">
          <p class="control">
            <button v-on:click="doLogin" class="button is-link">Email me a Link</button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import NotificationBanner from "./Notification";
export default {
  name: "LoginComponent",
  components: {
    NotificationBanner
  },
  data: function() {
    return {
      email_address: ""
    };
  },
  methods: {
    checkToken() {
      var localToken = this.$route.params.access_token;
      console.log(localToken);
      if (localToken == null) {
        //localToken = this.$store.state.authToken;
        this.$router.push({ path: "/login/new" });
      } else if ((localToken == "new")) {
        console.log("New Login");
      } else {
        //this.$router.push({ path: "/summary" });
        var vm = this;
        axios({
          method: "post",
          url: "http://localhost:5000/auth/v0.1/check-token",
          headers: {
            "Content-Type": "application/json",
            Authorization: localToken
          }
        })
          .then(function(response) {
            //handle success
            console.log(response);
            vm.$store.commit("setToken", { token: localToken });
            vm.$router.push({ path: "/summary" });
          })
          .catch(function(response) {
            //handle error
            console.log(response);
            vm.$router.push({ path: "/login/new" });
          });
      }
    },
    doLogin() {
      //console.log(x);
      //this.$store.commit("setToken", { token: "neuroticmofo" });
      //this.$router.push({ path: "/summary" });
      var vm = this;
      var json_payload = { email_address: this.email_address };
      axios({
        method: "post",
        url: "http://localhost:5000/auth/v0.1/email-token",
        data: json_payload,
        headers: { "Content-Type": "application/json" }
      })
        .then(function(response) {
          //handle success
          vm.email_address = "";
          document.getElementById("success_notif").style.display = "block";
          console.log(response);
        })
        .catch(function(response) {
          //handle error
          document.getElementById("fail_notif").style.display = "block";
          console.log(response);
        });
    }
  },
  created: function() {
    this.checkToken();
  }
};
</script>