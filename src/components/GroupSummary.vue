<template>
  <div>
    <top-nav />
    <div class="tile">
      <div class="has-text-centered tile is-child box is-centered">
        <!--p class="heading">Filters</p-->
        <div class="columns is-centered">
          <div class="column is-2 has-text-left">
            <div class="field">
              <label class="label has-text-white is-small">From</label>
              <div class="control">
                <input
                  class="input is-small"
                  type="date"
                  placeholder="Text input"
                  name="start_date"
                  v-model="start_date"
                />
              </div>
            </div>
          </div>
          <div class="column is-2 has-text-left">
            <div class="field">
              <label class="label has-text-white is-small">To</label>
              <div class="control">
                <input
                  class="input is-small"
                  type="date"
                  placeholder="Text input"
                  name="end_date"
                  v-model="end_date"
                />
              </div>
            </div>
          </div>
          <div class="column is-1 has-text-left">
            <div class="field">
              <label class="label is-small" style="color: #303053">.</label>
              <div class="control">
                <button v-on:click="fetchData" class="button is-link is-small">Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="tile">
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
    <div class="tile">
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
    <div class="tile">
      <div class="has-text-centered tile is-child box" style=" height:50vh; padding:10px;">
        <canvas id="myChart"></canvas>
        <!--width="100" style="min-height:25px"-->
      </div>
      <div class="has-text-centered tile is-child box" style=" height:50vh; padding:10px;">
        <div style="height:23vh;">
          <canvas id="monthly_total"></canvas>
        </div>
        <div style=" height:23vh;">
          <canvas id="monthly_unique"></canvas>
        </div>
      </div>
    </div>
    <div class="tile is-hidden">
      <div class="has-text-centered tile is-child box">
        <p class="heading">TIMELINE</p>
        <div id="chat_timeline"></div>
      </div>
    </div>
    <div class="tile is-hidden-mobile">
      <div class="tile is-child box">
        <p style="color: white" class="has-text-centered heading">Conversations Timeline</p>
        <div style="color: white" class="has-text-centered">
          <p class="is-mobile" style="color: white; font-size: 10px;">
            For the best experience,
            view
            on a fullsize screen
          </p>
          <iframe
            id="igraph"
            scrolling="yes"
            seamless="seamless"
            height="550"
            width="100%"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Chart from "chart.js";
import TopNav from "./TopNav.vue";
import axios from "axios";
import tinycolor from "tinycolor2";
export default {
  name: "GroupSummary",
  components: {
    TopNav
  },
  data: function() {
    return {
      cdata: [],
      monthly_total_data: {},
      ctx: 0,
      total_chats: '',
      has_media: '',
      has_link: '',
      unique_contributors: '',
      exits: '',
      security_code: '',
      icon_change: '',
      new_members: '',
      average_mau: '',
      chartURL: "",
      upload_chat_id: -1,
      start_date: "",
      end_date: "",
      user_activity_chart: undefined,
      user_monthly_activity_chart: undefined,
      user_monthly_unique_chart: undefined
    };
  },

  watch: {
    cdata: function(new_data) {
      if (new_data != null){ this.createChart("myChart", new_data);}
     
    },
    monthly_total_data: function(new_data) {
      if (new_data != null){this.monthlyActivityCharts(new_data);}
    },
    upload_chat_id: function(new_upload_id) {
      this.fetchDefaultDataForUploadID(new_upload_id);
      //this.fetchData();
    },
    $route(to, from) {
      // react to route changes...
      this.upload_chat_id = to.params.upload_id;
      console.log(from.params.upload_id);
    }
  },

  methods: {
    checkToken() {
      var localToken = this.$store.state.authToken;
      var vm = this;
      axios({
        method: "post",
        url: vm.$store.state.backend_server + "/auth/v0.1/check-token",
        headers: {
          "Content-Type": "application/json",
          Authorization: localToken
        }
      })
        .then(function(response) {
          //handle success
          console.log("Summary Token OK: " + response.status);
        })
        .catch(function(response) {
          //handle error
          console.log(response);
          vm.$router.push({ path: "/login/new" });
        });
    },
    setupDefaultUpload() {
      var localToken = this.$store.state.authToken;
      var vm = this;
      axios({
        method: "get",
        url: vm.$store.state.backend_server + "/data-service/v0.1/init",
        headers: {
          "Content-Type": "application/json",
          Authorization: localToken
        }
      })
        .then(function(response) {
          //handle success
          var init_data = response.data;
          vm.upload_chat_id = init_data[0]["upload_id"];
        })
        .catch(function(response) {
          //handle error
          console.log(response);
          vm.$router.push({ path: "/login/new" });
        });
    },
    fetchDefaultDataForUploadID(upload_chat_id) {
      var localToken = this.$store.state.authToken;
      var vm = this;
      axios({
        method: "get",
        url:
          vm.$store.state.backend_server +
          "/data-service/v0.1/chats/" +
          upload_chat_id +
          "/get_default_date",
        headers: {
          "Content-Type": "application/json",
          Authorization: localToken
        }
      })
        .then(function(response) {
          //handle success
          var date_data = response.data[0];
          vm.start_date = date_data["min_date"];
          vm.end_date = date_data["max_date"];
          vm.fetchData();
        })
        .catch(function(response) {
          //handle error
          console.log(response);
          vm.$router.push({ path: "/login/new" });
        });
    },
    fetchData() {
      var localToken = this.$store.state.authToken;
      var vm = this;
      //Fetch Summary Data
      axios({
        method: "get",
        url:
          vm.$store.state.backend_server +
          "/data-service/v0.1/chats/" +
          vm.upload_chat_id +
          "/summary", //?start_date=1-jul-2019&end_date=31-dec-2019
        params: {
          start_date: vm.start_date,
          end_date: vm.end_date
        },
        headers: {
          Authorization: localToken
        }
      })
        .then(function(response) {
          var summary = response.data[0];
          vm.total_chats = summary["all_messages"];
          vm.has_link = summary["has_url"];
          vm.average_mau = summary["monthly_average_users"];
          vm.has_media = summary["has_media"];
          vm.unique_contributors = summary["unique_users"];
          vm.exits = summary["left_group"];
          vm.security_code = summary["changed_code"];
          vm.new_members = summary["was_added"];
        })
        .catch(function(response) {
          console.log(response.status);
        });

      //Fetch User Activity Data
      axios({
        method: "get",
        url:
          vm.$store.state.backend_server +
          "/data-service/v0.1/chats/" +
          vm.upload_chat_id +
          "/members/chat_counts",
        params: {
          start_date: vm.start_date,
          end_date: vm.end_date
        },
        headers: {
          Authorization: localToken
        }
      })
        .then(function(response) {
          vm.cdata = response.data;
          //console.log(vm.cdata.member_phone);
        })
        .catch(function(response) {
          console.log(response.status);
        });

      //Fetch Monthly Activity Data
      axios({
        method: "get",
        url:
          vm.$store.state.backend_server +
          "/data-service/v0.1/chats/" +
          vm.upload_chat_id +
          "/monthly_group_activity",
        params: {
          start_date: vm.start_date,
          end_date: vm.end_date
        },
        headers: {
          Authorization: localToken
        }
      })
        .then(function(response) {
          vm.monthly_total_data = response.data;
          //console.log(vm.cdata.member_phone);
        })
        .catch(function(response) {
          console.log(response.status);
        });

      //Fetch Chat Details
      //vm.chartURL = "";
      document.getElementById("igraph").contentWindow.location.replace("about:blank");
      axios({
        method: "get",
        url:
          vm.$store.state.backend_server +
          "/data-service/v0.1/chats/" +
          vm.upload_chat_id +
          "/details",
        params: {
          start_date: vm.start_date,
          end_date: vm.end_date
        },
        headers: {
          Authorization: localToken
        }
      })
        .then(function(response) {
          //vm.chartURL = response.data["url"];
          document.getElementById("igraph").contentDocument.write(response.data["url"]);
        })
        .catch(function(response) {
          console.log(response.status);
        });
    },
    generate_colors(number_of_colors) {
      var background_color_array = Array(number_of_colors);
      var border_color_array = Array(number_of_colors);
      var n_array = [...background_color_array.keys()];
      var index = 0;
      while (index < n_array.length) {
        //var color_index = Math.round(Math.random() * this.bar_colors.length);
        var r = Math.round(Math.random() * 255);
        var g = 190; //Math.round(Math.random() * 255);
        var b = Math.round(Math.random() * 255);
        var shade_amount = Math.random() * 20;
        //var bar_color = tinycolor(this.bar_colors[color_index]).darken(shade_amount );
        var bar_color = tinycolor({ r: r, g: g, b: b }).darken(shade_amount);
        background_color_array[index] = "rgb(14, 14, 49)"; //bar_color.toRgbString();
        border_color_array[index] = bar_color.toRgbString();

        index++;
      }
      return [background_color_array, border_color_array];
    },
    createChart(chartId, chartData) {
      var canvas = document.getElementById(chartId);
      var ctx = canvas.getContext("2d");
      var v_member_phone = chartData.member_phone;
      var chart_colors = this.generate_colors(v_member_phone.length);
      if (typeof this.user_activity_chart !== "undefined") {
        this.user_activity_chart.destroy();
      }
      this.user_activity_chart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: v_member_phone,
          datasets: [
            {
              label: "Number of Messages",
              data: chartData.messages,
              type: "bar",
              xAxisID: "x_axes",
              yAxisID: "y_message_count",
              backgroundColor: chart_colors[0],
              borderColor: chart_colors[1],
              borderWidth: 1
            },
            {
              label: "% of Messages",
              data: chartData.running_msg_count,
              type: "line",
              xAxisID: "x_axes",
              yAxisID: "y_pareto",
              pointBackgroundColor: "rgb(0,0,200)",
              fill: false,
              showLine: true
            }
          ]
        },
        options: {
          maintainAspectRatio: false,
          legend: {
            display: false
          },
          title: {
            display: true,
            text: "Group Members Activity",
            fontColor: "rgb(255,255,255)"
          },
          scales: {
            xAxes: [
              {
                id: "x_axes",
                ticks: {
                  fontColor: "rgb(255,255,255)"
                }
              }
            ],
            yAxes: [
              {
                id: "y_message_count",
                type: "linear",
                position: "left",
                ticks: {
                  fontColor: "rgb(255,255,255)"
                }
              },
              {
                id: "y_pareto",
                type: "linear",
                position: "right",
                ticks: {
                  fontColor: "rgb(255,255,255)",
                  max: 100,
                  min: 0
                }
              }
            ]
          }
        }
      });
    },
    monthlyActivityCharts(chartData) {
      var total_chats_ctx = document
        .getElementById("monthly_total")
        .getContext("2d");
      var unique_users_ctx = document
        .getElementById("monthly_unique")
        .getContext("2d");
      if (typeof this.user_monthly_activity_chart !== "undefined") {
        this.user_monthly_activity_chart.destroy();
      }
      if (typeof this.user_monthly_unique_chart !== "undefined") {
        this.user_monthly_unique_chart.destroy();
      }
      this.user_monthly_activity_chart = new Chart(total_chats_ctx, {
        type: "line",
        data: {
          labels: chartData.chat_mnth,
          datasets: [
            {
              label: "Total Chats",
              data: chartData.total_chats,
              type: "line",
              xAxesID: "x_axes",
              yAxesID: "y_axes",
              pointBackgroundColor: "rgb(0,0,200)",
              borderColor: "rgb(14, 14, 49)",
              lineTension: 0,
              fill: false
            }
          ]
        },
        options: {
          maintainAspectRatio: false,
          legend: {
            display: false
          },
          scales: {
            xAxes: [
              {
                id: "x_axes",
                ticks: {
                  fontColor: "rgb(255,255,255)"
                }
              }
            ],
            yAxes: [
              {
                id: "y_axes",
                ticks: {
                  fontColor: "rgb(255,255,255)"
                }
              }
            ]
          },
          title: {
            display: true,
            text: "Monthly Total Messages",
            fontColor: "rgb(255,255,255)"
          }
        }
      });

      this.user_monthly_unique_chart = new Chart(unique_users_ctx, {
        type: "line",
        data: {
          labels: chartData.chat_mnth,
          datasets: [
            {
              label: "Unique Members",
              data: chartData.member_count,
              type: "line",
              xAxesID: "x_axes",
              yAxesID: "y_axes",
              pointBackgroundColor: "rgb(0,0,200)",
              borderColor: "rgb(14, 14, 49)",
              lineTension: 0,
              fill: false
            }
          ]
        },
        options: {
          maintainAspectRatio: false,
          legend: {
            display: false
          },
          title: {
            display: true,
            text: "Monthly Unique Users",
            fontColor: "rgb(255,255,255)"
          },
          scales: {
            xAxes: [
              {
                id: "x_axes",
                ticks: {
                  fontColor: "rgb(255,255,255)"
                }
              }
            ],
            yAxes: [
              {
                id: "y_axes",
                ticks: {
                  fontColor: "rgb(255,255,255)"
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
    var upload_id = this.$route.params.upload_id;
    if (upload_id == -1) {
      this.setupDefaultUpload();
    } else {
      console.log(upload_id);
      this.upload_chat_id = upload_id;
    }
    //this.fetchData();
    //this.createChart("myChart", this.cdata);
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