<template>
  <div>
    <top-nav />
    <NotificationBanner />
    <div class="columns is-centered" style="padding-top:30px;">
      <div class="column is-4" style="text-align: left;">
        <div class="tile is-vertical">
          <p class="title has-text-white">Upload File</p>

          <div class="columns">
            <div class="column is-5">
              <div class="field">
                <label class="label has-text-white">File Title</label>
                <div class="control">
                  <input
                    class="input"
                    type="text"
                    placeholder="Text input"
                    name="file_title"
                    v-model="file_title"
                  />
                </div>
              </div>
            </div>
            <div class="column is-7">
              <div class="field">
                <label class="label has-text-white">File for Upload</label>
                <div class="file has-name is-fullwidth">
                  <label class="file-label">
                    <input
                      v-on:change="updatename"
                      class="file-input"
                      type="file"
                      name="upload_chat_file"
                    />
                    <span class="file-cta">
                      <span class="file-icon">
                        <i class="fas fa-upload"></i>
                      </span>
                      <span class="file-label">Upload Chat…</span>
                    </span>
                    <span class="file-name">{{file_name}}</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="field is-grouped">
            <div class="control">
              <button v-on:click="processForm" class="button is-link" :disabled="state.isSending">
                <span class="icon" v-if="state.isSending">
                  <i class="fas fa-spinner"></i>
                </span>
                <span v-else>
                  Submit
                </span>
                
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import TopNav from "./TopNav.vue";
import NotificationBanner from "./Notification";
export default {
  name: "UploadForm",
  components: {
    TopNav,
    NotificationBanner
  },
  data: function() {
    return {
      upload_chat_file: [],
      file_title: "",
      file_name: "File Name",
      state: {
        isSending: false
      }
    };
  },
  methods: {
    updatename: function(event) {
      if (event.target.files.length > 0) {
        this.file_name = event.target.files[0].name;
        this.upload_chat_file = event.target.files;
      }
    },
    processForm: function() {
      this.state.isSending = true;
      document.getElementById("success_notif").style.display = "none";
      document.getElementById("fail_notif").style.display = "none";
      var formData = new FormData();
      formData.append("file_title", this.file_title);
      formData.append("email_address", this.email_address);
      formData.append("upload_chat_file", this.upload_chat_file[0]);
      var vm = this;
      axios({
        method: "post",
        url: vm.$store.state.backend_server + "/file-submission/submit-form",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: vm.$store.state.authToken
        }
      })
        .then(function(response) {
          //handle success
          vm.state.isSending = false;
          document.getElementById("success_notif").style.display = "block";
          console.log(response);
          vm.file_title = "";
          vm.email_address = "";
          vm.file_name = "";
          vm.upload_chat_file = [];
        })
        .catch(function(response) {
          //handle error
          vm.state.isSending = false;
          document.getElementById("fail_notif").style.display = "block";
          console.log(response);
        });
    }
  }
};
</script>

<style scoped>
</style>