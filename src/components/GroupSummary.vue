<template>
  <div>
    <top-nav />
    <div class="tile sectiongap">
      <div class="has-text-centered tile is-child box">
        <p class="heading">All Messages</p>
        <p style="color: white" class="title">{{ total_chats }}</p>
      </div>
      <div class="has-text-centered tile is-child box">
        <p class="heading">Media</p>
        <p class="title">{{has_media}}</p>
      </div>
      <div class="has-text-centered tile is-child box">
        <p class="heading">URLS</p>
        <p class="title">{{has_link}}</p>
      </div>
      <div class="has-text-centered tile is-child box">
        <p class="heading">Unique Contributors</p>
        <p class="title">{{unique_contributors}}</p>
      </div>
    </div>
    <div class="tile sectiongap">
      <div class="has-text-centered tile is-child box">
        <p class="heading">Joined</p>
        <p style="color: white" class="title">{{ new_members }}</p>
      </div>
      <div class="has-text-centered tile is-child box">
        <p class="heading">Left</p>
        <p class="title">{{exits}}</p>
      </div>
      <div class="has-text-centered tile is-child box">
        <p class="heading">Average MAU</p>
        <p class="title">{{average_mau}}</p>
      </div>
      <div class="has-text-centered tile is-child box">
        <p class="heading">Security Code</p>
        <p class="title">{{security_code}}</p>
      </div>
    </div>
    <div class="tile sectiongap">
      <div class="has-text-centered tile is-child box">
        <canvas id="myChart" width="100" height="50"></canvas>
      </div>
      <div class="has-text-centered tile is-child box">
        <p class="heading">Left</p>
        <p class="title">{{exits}}</p>
      </div>
    </div>
  </div>
</template>


<script>
import Chart from "chart.js";
import TopNav from "./TopNav.vue";
import axios from "axios";
export default {
  name: "GroupSummary",
  components: {
    TopNav
  },
  data: function() {
    return {
      cdata: [12, 19, 3, 5, 2, 3, 16],
      ctx: 0,
      total_chats: 15255,
      has_media: 1017,
      has_link: 1246,
      unique_contributors: 67,
      exits: 9,
      security_code: 99,
      icon_change: 9,
      new_members: 32,
      average_mau: 45.8
    };
  },
  watch: {
    cdata: function(new_data) {
      this.createChart("myChart", new_data);
    }
  },
  methods: {
    checkToken() {
      var localToken = this.$store.state.authToken;
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
          console.log(response.status);
        })
        .catch(function(response) {
          //handle error
          console.log(response);
          vm.$router.push({ path: "/login/new" });
        });
    },
    fetchData() {
      this.total_chats = 12000;
      this.has_link = 10;
      this.average_mau = 33.7;
    },
    createChart(chartId, chartData) {
      const ctx = document.getElementById(chartId).getContext("2d");
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange", "XVV"],
          datasets: [
            {
              label: "# of Votes",
              data: chartData,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
                "rgba(255, 159, 64, 0.2)"
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
                "rgba(255, 159, 64, 1)"
              ],
              borderWidth: 1
            }
          ]
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          }
        }
      });
    }
  },
  created: function() {
    this.checkToken();
  },
  mounted: function() {
    this.fetchData();
    this.createChart("myChart", this.cdata);
  }
};
</script> 
<style scoped>
.tile.is-child {
  margin-left: 2px !important;
  margin-right: 2px !important;
  margin-top: 0px !important;
  margin-bottom: 2px !important;
}
.title {
  color: white;
}
.is-child {
  background: #303053;
  color: white;
}
</style>