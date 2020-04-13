<template>
  <div>
    <div class="tile sectiongap">
      <div class="tile is-5">
        <div class="tile is-child box">
          <p style="color: white" class="has-text-centered heading">Member Activity</p>
          <iframe
            scrolling="no"
            seamless="seamless"
            src="../../notebook/user_chatbar.html"
            width="100%"
            height="410"
          ></iframe>
        </div>
      </div>
      <div class="tile is-7">
        <div class="tile is-vertical">
          <div style="margin-bottom: 2px !important;" class="tile is-child box">
            <p style="color: white" class="has-text-centered heading">Monthly Active Members</p>
            <iframe
              scrolling="no"
              seamless="seamless"
              src="../../notebook/mau_line.html"
              width="100%"
            ></iframe>
          </div>
          <div style="margin-bottom: 2px !important;" class="tile is-child box">
            <p style="color: white" class="has-text-centered heading">Monthly Chat Activity</p>
            <iframe
              scrolling="no"
              seamless="seamless"
              src="../../notebook/monthly_chat_line.html"
              width="100%"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
    <div class="tile sectiongap">
      <div class="tile is-child box">
        <p class="heading has-text-centered">Hourly Activity Distribution</p>
        <iframe
          scrolling="no"
          seamless="seamless"
          src="../../notebook/hourly_activiy_bar.html"
          width="100%"
          style="min-height: 310px"
        ></iframe>
      </div>
      <div class="tile is-child box">
        <p class="heading has-text-centered">Word Cloud</p>
        <!--<img src="../../notebook/wordcount.png" width="100%" alt="word cloud" />-->
      </div>
    </div>
    <div class="tile sectiongap is-hidden-mobile">
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
            src="../../notebook/index.html"
            height="450"
            width="100%"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GroupBreakdown",
  props: {
    title: String,
    likes: Number,
    isPublished: Boolean,
    commentIds: Array,
    author: Object,
    callback: Function,
    contactsPromise: Promise // or any other constructor
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
  background: #282836;
  color: white;
}
</style>