<template>
  <div>
    <div id="success_notif" class="notification is-primary is-light" hidden>
      <button class="delete" v-on:click="exitSuccessNotification"></button>
      Request Sucessfully Submitted
    </div>
    <div id="fail_notif" class="notification is-danger is-light" hidden>
      <button class="delete" v-on:click="exitFailNotification"></button>
      Request Failed
    </div>
  </div>
</template>

<script>
export default {
  name: "NotificationBanner",
  methods: {
    exitSuccessNotification: function(event) {
      console.log(event);
      document.getElementById("success_notif").style.display = "none";
    },
    exitFailNotification: function(event) {
      console.log(event);
      document.getElementById("fail_notif").style.display = "none";
    }
  }
};
</script>

<style scoped>
</style>