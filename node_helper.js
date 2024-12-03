const NodeHelper = require("node_helper");
const axios = require("axios");

module.exports = NodeHelper.create({
  start: function() {
    console.log("Starting node helper for: " + this.name);
  },

  socketNotificationReceived: function(notification, payload) {
    if (notification === "GET_REDDIT_IMAGES") {
      this.getRedditImages(payload);
    }
  },

  getRedditImages: function(subreddit) {
    axios.get(`https://www.reddit.com/r/${subreddit}/top.json?limit=10`)
      .then(response => {
        const images = response.data.data.children
          .filter(post => post.data.post_hint === "image")
          .map(post => post.data.url);
        this.sendSocketNotification("REDDIT_IMAGES", images);
      })
      .catch(error => {
        console.error("Error fetching Reddit images:", error);
      });
  }
});
