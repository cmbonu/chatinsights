<template>
  <div>
    <top-nav />
    <NotificationBanner/>
    <div class="columns is-centered" style="padding-top:30px;">
      <div class="column is-4" style="text-align: left;">
        <div class="tile is-vertical">
          <p class="title has-text-white">Upload File</p>
          <div class="field">
            <label class="label has-text-white">Email</label>
            <div class="control has-icons-left has-icons-right">
              <input
                class="input is-danger"
                type="email"
                name="email_address"
                placeholder="Email Address"
                v-model="email_address"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-envelope"></i>
              </span>
              <span class="icon is-small is-right">
                <i class="fas fa-exclamation-triangle"></i>
              </span>
            </div>
            <p class="help is-success">Email addresss for the dashboard link</p>
          </div>

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
              <button v-on:click="processForm" class="button is-link">Submit</button>
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
import NotificationBanner from './Notification';
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
      email_address: "",
      file_name: "File Name"
    };
  },
  methods: {
    updatename: function(event) {
      if (event.target.files.length > 0) {
        //const fileName = document.querySelector(".file-name");
        //fileName.textContent = event.target.files[0].name;
        this.file_name = event.target.files[0].name;
        this.upload_chat_file = event.target.files;
      }
    },
    processForm: function() {
      //console.log({ name: this.file_title, email: this.email_address });
      var formData = new FormData();
      formData.append("file_title", this.file_title);
      formData.append("email_address", this.email_address);
      formData.append("upload_chat_file", this.upload_chat_file[0]);
      var vm = this;
      axios({
        method: "post",
        url: "http://localhost:5000/file-submission/submit-form",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" }
      })
        .then(function(response) {
          //handle success
          document.getElementById("success_notif").style.display = "block";
          console.log(response);
          vm.file_title = "";
          vm.email_address = "";
          vm.file_name = "";
          vm.upload_chat_file = [];
        })
        .catch(function(response) {
          //handle error
          document.getElementById("fail_notif").style.display = "block";
          console.log(response);
        });
    }
  }
};
</script>

<style scoped>
</style>